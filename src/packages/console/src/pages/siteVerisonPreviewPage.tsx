import React from 'react';
import { KibaException, dateToString } from '@kibalabs/core';
import { useInitialization, useObjectLocalStorageState, useBooleanLocalStorageState } from '@kibalabs/core-react';

import { Site, SiteVersion, SiteVersionEntry } from '../everypageClient';
import { Canvas } from '../components/canvas';
import { useGlobals } from '../globalsContext';

export interface ISiteVersionPreviewPageProps {
  slug: string;
  siteVersionId: string;
}

export const SiteVersionPreviewPage = (props: ISiteVersionPreviewPageProps): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const [site, setSite] = React.useState<Site | null | undefined>(undefined);
  const [siteVersion, setSiteVersion] = React.useState<SiteVersion | null | undefined>(undefined);
  const [siteVersionEntry, setSiteVersionEntry] = React.useState<SiteVersionEntry | null | undefined>(undefined);

  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string>>({});

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
    return site.customDomain ? `https://${site.customDomain}` : `https://${site.slug}.evrpg.com`;
  }

  const addAssetFile = (filePath: string, targetPath: string): void => {

  };

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
      <div>Viewing site version {site.slug} {siteVersion.name} {dateToString(siteVersion.creationDate)}</div>
      <br />
      <br />
      <Canvas
        siteContent={siteContent}
        onSiteContentUpdated={setSiteContent}
        siteTheme={siteTheme}
        onSiteThemeUpdated={setSiteTheme}
        isEditorHidden={isEditorHidden}
        onIsEditorHiddenUpdated={setIsEditorHidden}
        assetFileMap={assetFileMap}
        addAssetFile={addAssetFile}
      />
    </React.Fragment>
  )
}
