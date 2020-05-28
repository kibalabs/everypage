import React from 'react';
import { KibaException, dateToString, Requester } from '@kibalabs/core';
import { useInitialization, useInterval, useBooleanLocalStorageState } from '@kibalabs/core-react';

import { Site, SiteVersion, SiteVersionEntry, AssetFile, PresignedUpload } from '../everypageClient';
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

  const [siteContent, setSiteContent] = React.useState<object | undefined>(siteVersionEntry ? siteVersionEntry.siteContent : undefined);
  const [siteTheme, setSiteTheme] = React.useState<object | undefined>(siteVersionEntry ? siteVersionEntry.siteTheme : undefined);
  const [isSiteContentChanged, setIsSiteContentChanged] = React.useState<boolean>(false);
  const [isSiteThemeChanged, setIsSiteThemeChanged] = React.useState<boolean>(false);
  const [savingError, setSavingError] = React.useState<KibaException | null>(null);
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string>>({});

  useInitialization((): void => {
    loadSite();
  });

  React.useEffect((): void => {
    if (site) {
      loadSiteVersion();
    }
  }, [site]);

  React.useEffect((): void => {
    if (siteVersion) {
      loadSiteVersionEntry();
      loadSiteVersionAssets();
    }
  }, [siteVersion]);

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
      setSiteContent(siteVersionEntry.siteContent);
      setSiteTheme(siteVersionEntry.siteTheme);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setSiteVersionEntry(null);
    });
  }

  const loadSiteVersionAssets = (): void => {
    everypageClient.list_site_version_assets(site.siteId, Number(props.siteVersionId)).then((assetFiles: AssetFile[]) => {
      setAssetFileMap(assetFiles.reduce((currentMap: Record<string, string>, assetFile: AssetFile): Record<string, string> => {
        currentMap[assetFile.path] = `${getSiteUrl()}/${siteVersion.buildHash}${assetFile.path}`;
        return currentMap;
      }, {}));
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setSiteVersionEntry(null);
    });
  }

  const getSiteUrl = (): string => {
    return site.customDomain ? `https://${site.customDomain}` : `https://${site.slug}.evrpg.com`;
  }

  const onSiteContentUpdated = (siteContent: Record<string, any>): void => {
    setSiteContent(siteContent);
    setIsSiteContentChanged(true);
  }

  const onSiteThemeUpdated = (siteTheme: Record<string, any>): void => {
    setSiteTheme(siteTheme);
    setIsSiteThemeChanged(true);
  }

  // TODO(krish): im sure this can be done better than just every 3 seconds
  useInterval(3, (): void => {
    if (isSiteContentChanged || isSiteThemeChanged) {
      everypageClient.update_site_version_entry(site.siteId, siteVersion.siteVersionId, isSiteContentChanged ? siteContent : null, isSiteThemeChanged ? siteTheme : null).then((): void => {
        console.log('saving...');
        setIsSiteContentChanged(false);
        setIsSiteThemeChanged(false);
        setSavingError(null);
      }).catch((exception: KibaException): void => {
        console.log(`Error saving: ${exception}`)
        setSavingError(exception);
      });
    }
  });

  const addAssetFiles = (files: File[]): Promise<void> => {
    return everypageClient.generate_asset_upload_for_site_version(site.siteId, siteVersion.siteVersionId).then((presignedUpload: PresignedUpload): void => {
      const promises = files.map((file: File): Promise<Response> => {
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
      Promise.all(promises).then((): void => {
        setAssetFileMap((assetFileMap: Record<string, string>): Record<string, string> => {
          const newAssetFileMap = {...assetFileMap};
          files.forEach((file: File): void => {
            newAssetFileMap[file.path] = `${getSiteUrl()}/${siteVersion.buildHash}/assets/${file.path}`;
          });
          return newAssetFileMap
        });
      });
    }).catch((error: KibaException): void => {
      console.log('error', error);
    });
  };

  if (site === null || siteVersion === null || siteVersionEntry === null) {
    return (
      <div>Error loading site version. Please go back and try again.</div>
    );
  }

  if (!siteContent || !siteTheme) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <React.Fragment>
      <br />
      <div>Viewing site version {site.slug} {siteVersion.name} {dateToString(siteVersion.creationDate)}</div>
      <div>{savingError ? 'error saving!' : isSiteContentChanged || isSiteThemeChanged ? '...' : 'saved'}</div>
      <br />
      <Canvas
        siteContent={siteContent}
        onSiteContentUpdated={onSiteContentUpdated}
        siteTheme={siteTheme}
        onSiteThemeUpdated={onSiteThemeUpdated}
        assetFileMap={assetFileMap}
        addAssetFiles={addAssetFiles}
        isEditorHidden={isEditorHidden}
        onIsEditorHiddenUpdated={setIsEditorHidden}
      />
    </React.Fragment>
  );
}
