import React from 'react';

import { KibaException, KibaResponse, Requester } from '@kibalabs/core';
import { useBooleanLocalStorageState, useInterval } from '@kibalabs/core-react';
import { IWebsite } from '@kibalabs/everypage';
import { Direction, ITheme, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';
import Helmet from 'react-helmet';

import { Canvas } from '../components/canvas';
import { NavigationBar } from '../components/navigationBar';
import { AssetFile, PresignedUpload, Site, SiteVersion, SiteVersionEntry } from '../everypageClient';
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
  const [siteContent, setSiteContent] = React.useState<IWebsite | undefined>(undefined);
  const [siteTheme, setSiteTheme] = React.useState<ITheme | undefined>(undefined);
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string> | undefined>(undefined);
  const [isSiteContentChanged, setIsSiteContentChanged] = React.useState<boolean>(false);
  const [isSiteThemeChanged, setIsSiteThemeChanged] = React.useState<boolean>(false);
  const [savingError, setSavingError] = React.useState<KibaException | null>(null);
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [isMetaHidden, setIsMetaHidden] = useBooleanLocalStorageState('isMetaHidden');
  const isEditable = siteVersion && !siteVersion.publishDate && !siteVersion.archiveDate;

  const getSiteUrl = React.useCallback((): string => {
    return `https://${props.slug}.evrpg.com`;
  }, [props.slug]);

  const loadSite = React.useCallback((): void => {
    everypageClient.getSiteBySlug(props.slug).then((receivedSite: Site) => {
      setSite(receivedSite);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSite(null);
    });
  }, [everypageClient, props.slug]);

  const loadSiteVersion = React.useCallback((): void => {
    if (!site.siteId) {
      setSiteVersion(undefined);
      return;
    }
    everypageClient.getSiteVersion(site.siteId, Number(props.siteVersionId)).then((receivedSiteVersion: SiteVersion) => {
      setSiteVersion(receivedSiteVersion);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSiteVersion(null);
    });
  }, [everypageClient, props.siteVersionId, site]);

  const loadSiteVersionEntry = React.useCallback((): void => {
    if (!site.siteId) {
      setSiteVersionEntry(undefined);
      return;
    }
    everypageClient.getSiteVersionEntry(site.siteId, Number(props.siteVersionId)).then((receivedSiteVersionEntry: SiteVersionEntry) => {
      setSiteVersionEntry(receivedSiteVersionEntry);
      setSiteContent(receivedSiteVersionEntry.siteContent as unknown as IWebsite);
      setSiteTheme(receivedSiteVersionEntry.siteTheme as unknown as ITheme);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSiteVersionEntry(null);
    });
  }, [everypageClient, props.siteVersionId, site]);

  const loadSiteVersionAssets = React.useCallback((): void => {
    if (!site.siteId) {
      setAssetFileMap(undefined);
      return;
    }
    everypageClient.listSiteVersionAssets(site.siteId, Number(props.siteVersionId)).then((assetFiles: AssetFile[]) => {
      setAssetFileMap(assetFiles.reduce((currentMap: Record<string, string>, assetFile: AssetFile): Record<string, string> => {
        // eslint-disable-next-line no-param-reassign
        currentMap[assetFile.path] = `${getSiteUrl()}/${siteVersion.buildHash}${assetFile.path}`;
        return currentMap;
      }, {}));
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAssetFileMap(undefined);
    });
  }, [everypageClient, getSiteUrl, props.siteVersionId, site, siteVersion]);

  const onSiteContentUpdated = React.useCallback((newSiteContent: IWebsite): void => {
    setSiteContent(newSiteContent as unknown as IWebsite);
    setIsSiteContentChanged(true);
  }, []);

  const onSiteThemeUpdated = React.useCallback((newSiteTheme: ITheme): void => {
    setSiteTheme(newSiteTheme as unknown as ITheme);
    setIsSiteThemeChanged(true);
  }, []);

  const addAssetFiles = (files: File[]): Promise<void> => {
    return everypageClient.generateAssetUploadForSiteVersion(site.siteId, siteVersion.siteVersionId).then((presignedUpload: PresignedUpload): void => {
      const requester = new Requester();
      const promises = files.map((file: File): Promise<KibaResponse> => {
        const fileName = file.path.replace(/^\//g, '');
        const formData = new FormData();
        Object.keys(presignedUpload.params).forEach((key: string): void => {
          formData.set(key, presignedUpload.params[key]);
        });
        // eslint-disable-next-line no-template-curly-in-string
        formData.set('key', presignedUpload.params.key.replace('${filename}', fileName));
        formData.set('content-type', file.type);
        formData.append('file', file, file.name);
        return requester.makeFormRequest(presignedUpload.url, formData);
      });
      Promise.all(promises).then((): void => {
        setAssetFileMap((currentAssetFileMap: Record<string, string>): Record<string, string> => {
          const newAssetFileMap = { ...currentAssetFileMap };
          files.forEach((file: File): void => {
            newAssetFileMap[`/assets/${file.path}`] = `${getSiteUrl()}/${siteVersion.buildHash}/assets/${file.path}`;
          });
          return newAssetFileMap;
        });
      });
    }).catch((error: KibaException): void => {
      console.error('error', error);
    });
  };

  const deleteAssetFile = (fileKey: string): Promise<void> => {
    return everypageClient.deleteSiteVersionAsset(siteVersion.siteId, siteVersion.siteVersionId, fileKey.replace('/assets/', '')).then((): void => {
      loadSiteVersionAssets();
    });
  };

  React.useEffect((): void => {
    loadSite();
  }, [loadSite, props.slug]);

  React.useEffect((): void => {
    if (site) {
      loadSiteVersion();
    } else {
      setSiteVersion(null);
    }
  }, [loadSiteVersion, site]);

  React.useEffect((): void => {
    if (siteVersion) {
      loadSiteVersionEntry();
      loadSiteVersionAssets();
    } else {
      setSiteVersionEntry(undefined);
      setAssetFileMap(undefined);
    }
  }, [loadSiteVersionEntry, loadSiteVersionAssets, siteVersion]);

  // TODO(krishan711): im sure this can be done better than just every 5 seconds
  useInterval(5, (): void => {
    if (!site || !siteVersion || !siteVersionEntry) {
      return;
    }
    if (isEditable && (isSiteContentChanged || isSiteThemeChanged)) {
      everypageClient.updateSiteVersionEntry(site.siteId, siteVersion.siteVersionId, isSiteContentChanged ? siteContent as unknown as Record<string, unknown> : null, isSiteThemeChanged ? siteTheme : null).then((): void => {
        setIsSiteContentChanged(false);
        setIsSiteThemeChanged(false);
        setSavingError(null);
      }).catch((exception: KibaException): void => {
        console.error(`Error saving: ${exception}`);
        setSavingError(exception);
      });
    }
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>{`${site ? site.name : 'Site page'} | Preview ${siteVersion ? siteVersion.name : ''} | Everypage Console`}</title>
      </Helmet>
      <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
        <NavigationBar />
        <Spacing variant={PaddingSize.Narrow} />
        <Spacing variant={PaddingSize.Wide1} />
        <Spacing variant={PaddingSize.Wide3} />
        {site === null || siteVersion === null || siteVersionEntry === null ? (
          <Text>Error loading site version. Please go back and try again...</Text>
        ) : siteContent === undefined || siteTheme === undefined || assetFileMap === undefined ? (
          <Text>Loading...</Text>
        ) : (
          <React.Fragment>
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Canvas
                isEditable={isEditable}
                isSaveRequired={true}
                siteVersionName={SiteVersion.name}
                siteSlug={site.slug}
                savingError={savingError}
                isSiteContentChanged={isSiteContentChanged}
                isSiteThemeChanged={isSiteThemeChanged}
                isEditorHidden={isEditorHidden}
                isMetaHidden={isMetaHidden}
                onIsEditorShownClicked={setIsEditorHidden}
                onIsMetaShownClicked={setIsMetaHidden}
                siteContent={siteContent}
                onSiteContentUpdated={onSiteContentUpdated}
                siteTheme={siteTheme}
                onSiteThemeUpdated={onSiteThemeUpdated}
                assetFileMap={assetFileMap}
                addAssetFiles={addAssetFiles}
                deleteAssetFile={deleteAssetFile}
              />
            </Stack.Item>
          </React.Fragment>
        )}
      </Stack>
    </React.Fragment>
  );
};
