import React from 'react';

import { useBooleanLocalStorageState, useObjectLocalStorageState } from '@kibalabs/core-react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';

import { Canvas } from '../components/canvas';
import { MessageDialog } from '../components/messageDialog';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { SiteVersionEntry, Template } from '../everypageClient';
import { useGlobals } from '../globalsContext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: theme.spacing(1, 2),
    borderBottom: '1px #333 solid',
    alignItems: 'center',
  },
  spacer: {
    flexGrow: 1,
  },
  promptText: {
    margin: theme.spacing(0, 2),
  },
  topBarSignInBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
  },
}));

const startOverTitle = 'Are you sure?';
const startOverMessage = 'Starting over will clear all your current work. If you want to create more than one site at a time, please sign up - the core package is totally free and requires no credit card!';

export const CanvasPage = (): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient } = useGlobals();
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string>>({});
  const [isShowingStartOverAlert, setIsShowingStartOverAlert] = React.useState<boolean>(false);
  // const [isSiteContentChanged, setIsSiteContentChanged] = React.useState<boolean>(false);

  const addAssetFiles = (files: File[]): Promise<void> => {
    const newAssetFileMap = { ...assetFileMap };
    files.forEach((file: File): void => {
      newAssetFileMap[`/assets/${file.path}`] = URL.createObjectURL(file);
    });
    setAssetFileMap(newAssetFileMap);
    return new Promise((resolve: () => void) => {
      resolve();
    });
  };

  const onChooseTemplateClicked = (template: Template) => {
    everypageClient.getSiteVersionEntryForTemplate(template.templateId).then((siteVersionEntry: SiteVersionEntry) => {
      setSiteContent(siteVersionEntry.siteContent);
      setSiteTheme(siteVersionEntry.siteTheme);
    }).catch((error: Error): void => {
      console.error('error', error);
    });
  };

  const onStartOverClicked = (): void => {
    setIsShowingStartOverAlert(true);
  };

  const onStartOverAlertCloseClicked = (): void => {
    setIsShowingStartOverAlert(false);
  };

  const onStartOverAlertConfirmClicked = (): void => {
    setIsShowingStartOverAlert(false);
    setSiteContent(null);
    setSiteTheme(null);
  };

  const onSiteContentUpdated = (newSiteContent: Record<string, unknown>): void => {
    setSiteContent(newSiteContent);
    // NOTE(krishan711): why does this have to be here?! without it if a value is replaced in the json the cursor moves to the top of the editor!
    // setIsSiteContentChanged(true);
  };

  const onSiteThemeUpdated = (newSiteTheme: Record<string, unknown>): void => {
    setSiteTheme(newSiteTheme);
    // NOTE(krishan711): why does this have to be here?! without it if a value is replaced in the json the cursor moves to the top of the editor!
    // setIsSiteContentChanged(true);
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Canvas | Everypage Console</title>
      </Helmet>
      <div className={classes.topBar}>
        <Button
          variant='outlined'
          onClick={onStartOverClicked}
        >
          Start again
        </Button>
        <div className={classes.spacer} />
        <div className={classes.topBarSignInBox}>
          <Button
            variant='contained'
            color='primary'
            href='/register'
          >
            Sign in to publish
          </Button>
          <Typography variant='caption' className={classes.promptText}>Our core package is totally free 🙌</Typography>
        </div>
      </div>
      {siteContent && (
        <Canvas
          siteContent={siteContent}
          onSiteContentUpdated={onSiteContentUpdated}
          siteTheme={siteTheme}
          onSiteThemeUpdated={onSiteThemeUpdated}
          isEditorHidden={isEditorHidden}
          onIsEditorHiddenUpdated={setIsEditorHidden}
          assetFileMap={assetFileMap}
          addAssetFiles={addAssetFiles}
        />
      )}
      <TemplateChooserModal
        isOpen={!siteContent}
        onChooseTemplateClicked={onChooseTemplateClicked}
      />
      <MessageDialog
        isOpen={isShowingStartOverAlert}
        title={startOverTitle}
        message={startOverMessage}
        btnText='Start over anyway'
        onCloseClicked={onStartOverAlertCloseClicked}
        onConfirmClicked={onStartOverAlertConfirmClicked}
      />
    </div>
  );
};
