import React from 'react';

import { KibaException, KibaResponse, Requester } from '@kibalabs/core';
import { useBooleanLocalStorageState, useInterval } from '@kibalabs/core-react';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { MemoCanvas } from '../components/canvas';
import { NavigationBar } from '../components/navigationBar';
import { AssetFile, PresignedUpload, Site, SiteVersion, SiteVersionEntry } from '../everypageClient';
import { useGlobals } from '../globalsContext';

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
  const [siteContent, setSiteContent] = React.useState<Record<string, unknown> | undefined>(siteVersionEntry ? siteVersionEntry.siteContent : undefined);
  const [siteTheme, setSiteTheme] = React.useState<Record<string, unknown> | undefined>(siteVersionEntry ? siteVersionEntry.siteTheme : undefined);
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string> | undefined>(undefined);
  const [isSiteContentChanged, setIsSiteContentChanged] = React.useState<boolean>(false);
  const [isSiteThemeChanged, setIsSiteThemeChanged] = React.useState<boolean>(false);
  const [savingError, setSavingError] = React.useState<KibaException | null>(null);
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [isMetaHidden, setIsMetaHidden] = useBooleanLocalStorageState('isMetaHidden');
  const isEditable = siteVersion && !siteVersion.publishDate && !siteVersion.archiveDate;

  React.useEffect((): void => {
    loadSite();
  }, [props.slug]);

  React.useEffect((): void => {
    if (site) {
      loadSiteVersion();
    } else {
      setSiteVersion(null);
    }
  }, [site]);

  React.useEffect((): void => {
    if (siteVersion) {
      loadSiteVersionEntry();
      loadSiteVersionAssets();
    } else {
      setSiteVersionEntry(null);
      setAssetFileMap(undefined);
    }
  }, [siteVersion]);

  const loadSite = (): void => {
    everypageClient.getSiteBySlug(props.slug).then((receivedSite: Site) => {
      setSite(receivedSite);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSite(null);
    });
  };

  const loadSiteVersion = (): void => {
    everypageClient.getSiteVersion(site.siteId, Number(props.siteVersionId)).then((receivedSiteVersion: SiteVersion) => {
      setSiteVersion(receivedSiteVersion);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSiteVersion(null);
    });
  };

  const loadSiteVersionEntry = (): void => {
    everypageClient.getSiteVersionEntry(site.siteId, Number(props.siteVersionId)).then((receivedSiteVersionEntry: SiteVersionEntry) => {
      setSiteVersionEntry(receivedSiteVersionEntry);
      setSiteContent(receivedSiteVersionEntry.siteContent);
      setSiteTheme(receivedSiteVersionEntry.siteTheme);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSiteVersionEntry(null);
    });
  };

  const loadSiteVersionAssets = (): void => {
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
  };

  const getSiteUrl = (): string => {
    return `https://${site.slug}.evrpg.com`;
  };

  const onSiteContentUpdated = (newSiteContent: Record<string, unknown>): void => {
    setSiteContent(newSiteContent);
    setIsSiteContentChanged(true);
  };

  const onSiteThemeUpdated = (newSiteTheme: Record<string, unknown>): void => {
    setSiteTheme(newSiteTheme);
    setIsSiteThemeChanged(true);
  };

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
        console.error(`Error saving: ${exception}`);
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
        // eslint-disable-next-line no-template-curly-in-string
        formData.set('key', presignedUpload.params.key.replace('${filename}', fileName));
        formData.set('content-type', file.type);
        formData.append('file', file, file.name);
        return requester.makeFormRequest(presignedUpload.url, formData);
      });
      Promise.all(promises).then((): void => {
        setAssetFileMap((assetFileMap: Record<string, string>): Record<string, string> => {
          const newAssetFileMap = { ...assetFileMap };
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

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        {site === null || siteVersion === null || siteVersionEntry === null ? (
          <div>Error loading site version. Please go back and try again...</div>
        ) : siteContent === undefined || siteTheme === undefined || assetFileMap === undefined ? (
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
      </main>
    </div>
  );
};
