import React from 'react';
import { KibaException, Requester, KibaResponse } from '@kibalabs/core';
import { useInitialization, useInterval, useBooleanLocalStorageState } from '@kibalabs/core-react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Site, SiteVersion, SiteVersionEntry, AssetFile, PresignedUpload } from '../everypageClient';
import { MemoCanvas } from '../components/canvas';
import { useGlobals } from '../globalsContext';
import { NavigationBar } from '../components/navigationBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  metaBox: {
    backgroundColor: 'white',
    borderBottom: '1px solid #777',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'baseline',
  },
  metaBoxSpacer: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
  saveStatusText: {
    marginLeft: theme.spacing(2),
    fontSize: '1.1em',
  },
}));

export interface ISiteVersionPreviewPageProps {
  slug: string;
  siteVersionId: string;
}

export const SiteVersionPreviewPage = (props: ISiteVersionPreviewPageProps): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient } = useGlobals();
  const [site, setSite] = React.useState<Site | null | undefined>(undefined);
  const [siteVersion, setSiteVersion] = React.useState<SiteVersion | null | undefined>(undefined);
  const [siteVersionEntry, setSiteVersionEntry] = React.useState<SiteVersionEntry | null | undefined>(undefined);
  const [siteContent, setSiteContent] = React.useState<object | undefined>(siteVersionEntry ? siteVersionEntry.siteContent : undefined);
  const [siteTheme, setSiteTheme] = React.useState<object | undefined>(siteVersionEntry ? siteVersionEntry.siteTheme : undefined);
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string> | undefined>(undefined);
  const [isSiteContentChanged, setIsSiteContentChanged] = React.useState<boolean>(false);
  const [isSiteThemeChanged, setIsSiteThemeChanged] = React.useState<boolean>(false);
  const [savingError, setSavingError] = React.useState<KibaException | null>(null);
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [isMetaHidden, setIsMetaHidden] = useBooleanLocalStorageState('isMetaHidden');
  const isEditable = siteVersion && !siteVersion.publishDate && !siteVersion.archiveDate;

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
    everypageClient.getSiteBySlug(props.slug).then((site: Site) => {
      setSite(site);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSite(null);
    });
  }

  const loadSiteVersion = (): void => {
    everypageClient.getSiteVersion(site.siteId, Number(props.siteVersionId)).then((siteVersion: SiteVersion) => {
      setSiteVersion(siteVersion);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSiteVersion(null);
    });
  }

  const loadSiteVersionEntry = (): void => {
    everypageClient.getSiteVersionEntry(site.siteId, Number(props.siteVersionId)).then((siteVersionEntry: SiteVersionEntry) => {
      setSiteVersionEntry(siteVersionEntry);
      setSiteContent(siteVersionEntry.siteContent);
      setSiteTheme(siteVersionEntry.siteTheme);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSiteVersionEntry(null);
    });
  }

  const loadSiteVersionAssets = (): void => {
    everypageClient.listSiteVersionAssets(site.siteId, Number(props.siteVersionId)).then((assetFiles: AssetFile[]) => {
      setAssetFileMap(assetFiles.reduce((currentMap: Record<string, string>, assetFile: AssetFile): Record<string, string> => {
        currentMap[assetFile.path] = `${getSiteUrl()}/${siteVersion.buildHash}${assetFile.path}`;
        return currentMap;
      }, {}));
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSiteVersionEntry(null);
    });
  }

  const getSiteUrl = (): string => {
    return `https://${site.slug}.evrpg.com`;
  }

  const onSiteContentUpdated = (siteContent: Record<string, any>): void => {
    setSiteContent(siteContent);
    setIsSiteContentChanged(true);
  }

  const onSiteThemeUpdated = (siteTheme: Record<string, any>): void => {
    setSiteTheme(siteTheme);
    setIsSiteThemeChanged(true);
  }

  // TODO(krishan711): im sure this can be done better than just every 3 seconds
  useInterval(3, (): void => {
    if (!site || !siteVersion || !siteVersionEntry) {
      return;
    }
    if (!siteVersion.publishDate && (isSiteContentChanged || isSiteThemeChanged)) {
      everypageClient.updateSiteVersionEntry(site.siteId, siteVersion.siteVersionId, isSiteContentChanged ? siteContent : null, isSiteThemeChanged ? siteTheme : null).then((): void => {
        setIsSiteContentChanged(false);
        setIsSiteThemeChanged(false);
        setSavingError(null);
      }).catch((exception: KibaException): void => {
        console.error(`Error saving: ${exception}`)
        setSavingError(exception);
      });
    }
  });

  const addAssetFiles = (files: File[]): Promise<void> => {
    return everypageClient.generateAssetUploadForSiteVersion(site.siteId, siteVersion.siteVersionId).then((presignedUpload: PresignedUpload): void => {
      const requester = new Requester();
      const promises = files.map((file: File): Promise<KibaResponse> => {
        const fileName = file.path.replace(/^\//g, '');
        const formData = new FormData();
        Object.keys(presignedUpload.params).forEach((key: string): void => {
          formData.set(key, presignedUpload.params[key]);
        });
        formData.set('key', presignedUpload.params['key'].replace('${filename}', fileName));
        formData.set('content-type', file.type);
        formData.append('file', file, file.name);
        return requester.makeFormRequest(presignedUpload.url, formData);
      });
      Promise.all(promises).then((): void => {
        setAssetFileMap((assetFileMap: Record<string, string>): Record<string, string> => {
          const newAssetFileMap = {...assetFileMap};
          files.forEach((file: File): void => {
            newAssetFileMap[`/assets/${file.path}`] = `${getSiteUrl()}/${siteVersion.buildHash}/assets/${file.path}`;
          });
          return newAssetFileMap
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
  }

  const onIsMetaShownToggled = (): void => {
    setIsMetaHidden(!isMetaHidden);
  }

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        {site === null || siteVersion === null || siteVersionEntry === null ? (
          <div>Error loading site version. Please go back and try again...</div>
        ) : siteContent === undefined || siteTheme === undefined || assetFileMap == undefined ? (
          <div>Loading...</div>
        ) : (
          <React.Fragment>
            <Box paddingX={2} paddingY={1} className={classes.metaBox}>
              <Typography variant='subtitle1'><b>{site.slug}</b> {siteVersion.name || 'Unnamed'}</Typography>
              {isEditable && <Typography color='textSecondary' className={classes.saveStatusText}>{savingError ? 'error saving!' : isSiteContentChanged || isSiteThemeChanged ? 'saving...' : 'saved'}</Typography>}
              {!isEditable && <Typography color='textSecondary' className={classes.saveStatusText}>{'view-only mode'}</Typography>}
              <Box className={classes.metaBoxSpacer}/>
              <FormControlLabel
                label='Hide metadata'
                control={
                  <Switch
                    checked={isMetaHidden}
                    onChange={onIsMetaShownToggled}
                    name='Hide metadata'
                  />
                }
              />
            </Box>
            <MemoCanvas
              isEditable={isEditable}
              isHeadShown={!isMetaHidden}
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
      </main>
    </div>
  );
}
