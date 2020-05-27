import React from 'react';
import { IWebsite, WebsiteProvider, Direction, SectionRenderer, ThemeProvider, Stack, IStackItemProps, buildTheme } from '@kibalabs/everypage-core';
import { KibaException, dateToString } from '@kibalabs/core';
import { useInitialization } from '@kibalabs/core-react';

import { Site, SiteVersion, SiteVersionEntry } from './everypageClient';
import { useGlobals } from './globalsContext';

export interface ISiteVersionPreviewPageProps {
  slug: string;
  siteVersionId: string;
}

export const SiteVersionPreviewPage = (props: ISiteVersionPreviewPageProps): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const [site, setSite] = React.useState<Site | null | undefined>(undefined);
  const [siteVersion, setSiteVersion] = React.useState<SiteVersion | null | undefined>(undefined);
  const [siteVersionEntry, setSiteVersionEntry] = React.useState<SiteVersionEntry | null | undefined>(undefined);

  useInitialization((): void => {
    loadSite();
  });

  React.useEffect((): void => {
    if (site) {
      loadSiteVersion();
      loadSiteVersionEntry();
    } else {
      setSiteVersion(undefined);
      setSiteVersionEntry(undefined);
    }
  }, [site]);

  const loadSite = (): void => {
    everypageClient.get_site_by_slug(props.slug).then((site: Site) => {
      setSite(site);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setSite(null);
    });
  }

  const loadSiteVersion = (): void => {
    everypageClient.get_site_version(site.siteId, Number(props.siteVersionId)).then((siteVersion: SiteVersion) => {
      setSiteVersion(siteVersion);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setSiteVersion(null);
    });
  }

  const loadSiteVersionEntry = (): void => {
    everypageClient.get_site_version_entry(site.siteId, Number(props.siteVersionId)).then((siteVersionEntry: SiteVersionEntry) => {
      setSiteVersionEntry(siteVersionEntry);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setSiteVersionEntry(null);
    });
  }

  const getSiteUrl = (): string => {
    if (site.customDomain) {
      return `https://${site.customDomain}`;
    }
    return `https://${site.slug}.evrpg.com`;
  }

  const updateAssetPaths = (siteConfig, buildHash) => {
    if (!buildHash) {
      return siteConfig;
    }
    return Object.keys(siteConfig).reduce((result, key) => {
      let value = siteConfig[key];
      if (!value) {
        value = value;
      } else if (typeof value == 'string') {
        value = value.startsWith('/assets/') ? value.replace(/^/, `${getSiteUrl()}/${buildHash}`) : value;
      } else if (Array.isArray(value)) {
        value = value.map(entry => updateAssetPaths(entry, buildHash));
      } else if (typeof value == 'object') {
        value = updateAssetPaths(value, buildHash);
      }
      result[key] = value;
      return result
    }, {});
  };

  if (site === null || siteVersion === null || siteVersionEntry === null) {
    return (
      <div>Error loading site version. Please go back and try again.</div>
    );
  }

  if (site === undefined || siteVersion === undefined || siteVersionEntry === undefined) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <React.Fragment>
      <div>Viewing site version {site.slug} {dateToString(siteVersion.creationDate)}</div>
      <WebsiteProvider website={updateAssetPaths(siteVersionEntry.siteContent, siteVersion.buildHash) as IWebsite}>
        <ThemeProvider theme={buildTheme(siteVersionEntry.siteTheme)}>
          <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
            <Stack.Item growthFactor={1}>
              <Stack direction={Direction.Vertical} isFullHeight={true}>
                { updateAssetPaths(siteVersionEntry.siteContent, siteVersion.buildHash).sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
                  <Stack.Item key={index} growthFactor={1}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
                ))}
              </Stack>
            </Stack.Item>
          </Stack>
        </ThemeProvider>
      </WebsiteProvider>
    </React.Fragment>
  )
}
