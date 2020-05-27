import React from 'react';
import styled from 'styled-components';
import { Link, useInitialization } from '@kibalabs/core-react';
import { Requester, Response, KibaException, dateToString } from '@kibalabs/core';

import { Site, SiteVersion, CreatedSiteVersion, PresignedUpload } from '../everypageClient/resources';
import { Dropzone } from '../components/dropzone';
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
  const [siteContent, setSiteContent] = React.useState<Record<string, any> | undefined>(undefined);
  const [siteTheme, setSiteTheme] = React.useState<Record<string, any> | undefined>(undefined);
  const [assetFiles, setAssetFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
      loadVersions(site.siteId);
      loadPrimaryVersion(site.siteId);
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

  const onSiteFileChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.onload = async (filePath) => {
      setSiteContent(JSON.parse(String(filePath.target.result)));
    };
    reader.readAsText(event.target.files[0]);
  }

  const onThemeFileChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.onload = async (filePath) => {
      setSiteTheme(JSON.parse(String(filePath.target.result)));
    };
    reader.readAsText(event.target.files[0]);
  }

  const onAssetFilesChanged = (files: File[]): void => {
    // TODO(krish): why does this remove the existing files??
    setAssetFiles(assetFiles.concat(files));
  }

  const uploadAssets = (presignedUpload: PresignedUpload): void => {
    const promises = assetFiles.map((file: File): Promise<Response> => {
      const fileName = file.path.replace(/^\//g, '');
      const formData = new FormData();
      Object.keys(presignedUpload.params).forEach((key: string): void => {
        formData.set(key, presignedUpload.params[key]);
      });
      formData.set('key', presignedUpload.params['key'].replace('${filename}', fileName));
      formData.set('content-type', file.type);
      formData.append('file', file, file.name);
      return new Requester().makeFormRequest(presignedUpload.url, formData);
    });
    Promise.all(promises).then((results: any[]): void => {
      setSiteContent(undefined);
      setSiteTheme(undefined);
      setAssetFiles([]);
      setIsLoading(false);
    });
  }

  const onFormSubmitted = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!siteContent) {
      alert('Please upload siteContent!');
      return;
    }
    if (!siteTheme) {
      alert('Please upload siteTheme!');
      return;
    }
    setIsLoading(true);
    everypageClient.create_site_version(site.siteId, siteContent, siteTheme).then((createdSiteVersion: CreatedSiteVersion): void => {
      loadVersions(site.siteId);
      loadPrimaryVersion(site.siteId);
      uploadAssets(createdSiteVersion.presignedUpload);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setIsLoading(false);
    });
  }

  useInitialization((): void => {
    loadSite();
  });

  const humanFileSize = (size: number): string => {
    if (size < 1024) {
      return size + ' B';
    }
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const num = (size / Math.pow(1024, i));
    const round = Math.round(num);
    const value = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round;
    return `${value} ${'KMGTPEZY'[i-1]}B`;
  }

  const getSiteUrl = (): string => {
    if (site.customDomain) {
      return `https://${site.customDomain}`;
    }
    return `https://${site.slug}.evrpg.com`;
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
              {dateToString(version.creationDate, 'YYYY-MM-DD')}
              {version.siteVersionId === primaryVersionId ? '(*)' : <StyledButton onClick={() => onSetPrimaryClicked(version)}>Set primary</StyledButton>}
              <Link target={`/sites/${props.slug}/preview/${version.siteVersionId}`} text='View' />
            </div>
          );
        })}
        <br />
        <br />
        <br />
        <form onSubmit={onFormSubmitted}>
          <h1>Create new version</h1>
          <br/>
          Site file: <input type='file' onChange={onSiteFileChanged} />
          <br/>
          Theme file: <input type='file' onChange={onThemeFileChanged} />
          <br/>
          <Dropzone onFilesChosen={onAssetFilesChanged} />
          <br/>
          <div>
          { assetFiles.map((file: File): React.ReactElement => (
            <li key={file.path}>
              {file.path} - {humanFileSize(file.size)}
            </li>
          ))}
          </div>
          <StyledButton type='submit'>Create</StyledButton>
        </form>
      </div>
    );
  }
}
