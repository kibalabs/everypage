import React from 'react';

import { KibaException, KibaResponse, Requester } from '@kibalabs/core';
import { useBooleanLocalStorageState, useInterval } from '@kibalabs/core-react';
import { IWebsite } from '@kibalabs/everypage/src/model/website';
import { Alignment, Checkbox, ContainingView, Direction, ITheme, PaddingSize, Stack, Text } from '@kibalabs/ui-react';
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

  const onIsMetaShownToggled = (): void => {
    setIsMetaHidden(!isMetaHidden);
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
  useInterval(30, (): void => {
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
      <NavigationBar />
      {/* TODO: Still need to position the container, find a way to display the containing view just below the  navbar */}
      <ContainingView>
        {site === null || siteVersion === null || siteVersionEntry === null ? (
          <Text>Error loading site version. Please go back and try again...</Text>
        ) : siteContent === undefined || siteTheme === undefined || assetFileMap === undefined ? (
          <Text>Loading...</Text>
        ) : (
          <React.Fragment>
            <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} paddingLeft={PaddingSize.Wide} paddingVertical={PaddingSize.Default}>
              <Text variant='header5' tag='h4'>{site.slug}</Text>
              <Text>{` ${siteVersion.name || 'Unnamed'}`}</Text>
              {isEditable && <Text variant='light'>{savingError ? 'error saving!' : isSiteContentChanged || isSiteThemeChanged ? 'saving...' : 'saved'}</Text>}
              {!isEditable && <Text variant='light'>{'view-only mode'}</Text>}
              <Stack.Item growthFactor={1} shrinkFactor={1} />
              {/* TODO: Need to create a switch component in ui-react */}
              <Checkbox text='Hide metadata' isChecked={isMetaHidden} onToggled={onIsMetaShownToggled} />
            </Stack>
            <Canvas
              isEditable={isEditable}
              isMetaShown={!isMetaHidden}
              siteContent={siteContent}
              onSiteContentUpdated={onSiteContentUpdated}
              siteTheme={siteTheme}
              onSiteThemeUpdated={onSiteThemeUpdated}
              assetFileMap={assetFileMap}
              addAssetFiles={addAssetFiles}
              deleteAssetFile={deleteAssetFile}
              isEditorHidden={isEditorHidden}
              onIsEditorHiddenUpdated={setIsEditorHidden}
            />
          </React.Fragment>
        )}
      </ContainingView>
    </React.Fragment>
  );
};
