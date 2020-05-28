import React from 'react';
import styled from 'styled-components';
import { Link, useInitialization } from '@kibalabs/core-react';
import { KibaException, dateToString } from '@kibalabs/core';

import { Site, SiteVersion } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

export interface ISitePageProps {
  slug: string;
}

const StyledButton = styled.button`
  border: 1px solid currentColor;
  padding: 4px 8px;
  border-radius: 2px;
  cursor: pointer;

  :hover {
    background-color: #efefef;
  }
  :active {
    background-color: #dfdfdf;
  }
`;

export const SitePage = (props: ISitePageProps): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const [site, setSite] = React.useState<Site | null | undefined>(undefined);
  const [versions, setVersions] = React.useState<SiteVersion[] | undefined>(undefined);
  const [primaryVersionId, setPrimaryVersionId] = React.useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useInitialization((): void => {
    loadSite();
  });

  React.useEffect((): void => {
    if (site) {
      loadVersions(site.siteId);
      loadPrimaryVersion(site.siteId);
    }
  }, [site]);

  const onSetPrimaryClicked = (version: SiteVersion): void => {
    everypageClient.promote_site_version(site.siteId, version.siteVersionId).then((): void => {
      loadVersions(site.siteId);
      loadPrimaryVersion(site.siteId);
    }).catch((error: KibaException): void => {
      console.log('error', error);
    });
  }

  const loadSite = (): void => {
    everypageClient.get_site_by_slug(props.slug).then((site: Site) => {
      setSite(site);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setSite(null);
    });
  }

  const loadVersions = (siteId: number): void => {
    everypageClient.list_site_versions(siteId).then((siteVersions: SiteVersion[]) => {
      setVersions(siteVersions);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setVersions([]);
    });
  }

  const loadPrimaryVersion = (siteId: number): void => {
    everypageClient.get_site_primary_version(siteId).then((siteVersion: SiteVersion) => {
      setPrimaryVersionId(siteVersion.siteVersionId);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setPrimaryVersionId(undefined);
    });
  }

  const getSiteUrl = (): string => {
    return site.customDomain ? `https://${site.customDomain}` : `https://${site.slug}.evrpg.com`;
  }

  const onCreateNewVersionClicked = (): void => {
    setIsLoading(true);
    everypageClient.clone_site_version(site.siteId, primaryVersionId).then((): void => {
      loadVersions(site.siteId);
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setIsLoading(false);
    });
  }

  if (site === undefined) {
    return (
      <div>Loading...</div>
    );
  } else if (site === null) {
    return (
      <div>Site not found</div>
    );
  } else if (isLoading) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <div>
        <p>Site: <b>{site.name} ({site.siteId})</b></p>
        <p>Url: <a href={getSiteUrl()}><b>{getSiteUrl()}</b></a></p>
        <p>Account id: <b>{site.accountId}</b></p>
        <br/>
        { versions && versions.map((version: SiteVersion, index: number): React.ReactElement => {
          return (
            <div key={index}>
              {version.name || 'Unnamed'} ({dateToString(version.creationDate, 'YYYY-MM-DD HH:mm')})
              {version.siteVersionId === primaryVersionId ? '(*)' : (!version.isArchived && !version.isPublished) ? <StyledButton onClick={() => onSetPrimaryClicked(version)}>Set primary</StyledButton> : null}
              {!version.isArchived && !version.isPublished && <Link target={`/sites/${props.slug}/preview/${version.siteVersionId}`} text='Edit' />}
            </div>
          );
        })}
        <br />
        <br />
        <StyledButton onClick={onCreateNewVersionClicked}>Create new version</StyledButton>
      </div>
    );
  }
}
