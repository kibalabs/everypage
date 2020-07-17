
import React from 'react';
import { getClassName } from '@kibalabs/core';
import { IndexPage, replaceAssetPaths } from '@kibalabs/everypage-core';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { KibaFrame } from '../components/kibaFrame';
import { JsonEditor } from '../components/jsonEditor';
import { Dropzone, FilePreviewGrid } from '../components/dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  frameWrapper: {
    flexGrow: 1,
    flexShrink: 1,
  },
  editorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '500px',
  },
  editor: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    // for safari flex fix (https://github.com/philipwalton/flexbugs/issues/197)
    height: 0,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  buttonBar: {
    backgroundColor: '#333333',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  buttonSelected: {
    backgroundColor: '#111111',
  },
  verticalLine: {
    backgroundColor: '#333333',
    width: '2px',
    height: '100%',
  },
}));

interface ICanvasProps {
  isEditable: boolean;
  isHeadShown: boolean;
  siteContent: Record<string, any>;
  onSiteContentUpdated: (siteContent: Record<string, any>) => void;
  siteTheme: Record<string, any>;
  onSiteThemeUpdated: (siteTheme: Record<string, any>) => void;
  assetFileMap: Record<string, string>;
  addAssetFiles: (files: File[]) => Promise<void>;
  isEditorHidden: boolean;
  onIsEditorHiddenUpdated: (isEditorHidden: boolean) => void;
}

export const Canvas = (props: ICanvasProps): React.ReactElement => {
  const classes = useStyles();
  const [selectedType, setSelectedType] = React.useState<'site' | 'theme' | 'assets'>('site');

  const onSiteJsonUpdated = (parsedJson: object): void => {
    props.onSiteContentUpdated(parsedJson);
  }

  const onThemeJsonUpdated = (parsedJson: object): void => {
    props.onSiteThemeUpdated(parsedJson);
  }

  const onAssetFilesChosen = (files: File[]): void => {
    props.addAssetFiles(files);
  }

  const onHideEditorClicked = (): void => {
    props.onIsEditorHiddenUpdated(true);
  }

  const onShowEditorClicked = (): void => {
    props.onIsEditorHiddenUpdated(false);
  }

  const onSiteClicked = (): void => {
    setSelectedType('site');
  }

  const onThemeClicked = (): void => {
    setSelectedType('theme');
  }

  const onAssetsClicked = (): void => {
    setSelectedType('assets');
  }

  // TODO(krish): use core components here again when the bug below is resolved
  // NOTE(krish): both styled components and react-helmet don't work great with iframes
  // https://github.com/styled-components/styled-components/issues/2973
  // https://github.com/nfl/react-helmet/issues/277
  return (
    <React.Fragment>
      <div className={classes.root}>
        {!props.isEditorHidden && (
          <div className={classes.editorWrapper}>
            <div className={classes.buttonBar}>
              <Button className={getClassName(classes.button, selectedType === 'site' && classes.buttonSelected)} onClick={onSiteClicked}>Site</Button>
              <Button className={getClassName(classes.button, selectedType === 'theme' && classes.buttonSelected)} onClick={onThemeClicked}>Theme</Button>
              <Button className={getClassName(classes.button, selectedType === 'assets' && classes.buttonSelected)} onClick={onAssetsClicked}>Assets</Button>
              <div />
              <Button className={classes.button} onClick={onHideEditorClicked}>Hide</Button>
            </div>
            <Box className={classes.editor} display={selectedType === 'site' ? 'flex' : 'none'}>
              <JsonEditor isEditable={props.isEditable} name='site' json={props.siteContent} onJsonUpdated={onSiteJsonUpdated}/>
            </Box>
            <Box className={classes.editor} display={selectedType === 'theme' ? 'flex' : 'none'}>
              <JsonEditor isEditable={props.isEditable} name='theme' json={props.siteTheme} onJsonUpdated={onThemeJsonUpdated}/>
            </Box>
            <Box className={classes.editor} display={selectedType === 'assets' ? 'flex' : 'none'}>
              {props.isEditable && <Dropzone onFilesChosen={onAssetFilesChosen} />}
              <FilePreviewGrid fileMap={props.assetFileMap}/>
            </Box>
          </div>
        )}
        {!props.isEditorHidden && <div className={classes.verticalLine} />}
        <div className={classes.frameWrapper}>
          <KibaFrame>
            <IndexPage pageContent={replaceAssetPaths(props.siteContent, props.assetFileMap)} pageTheme={props.siteTheme} shouldIncludeHeadSection={props.isHeadShown} shouldIncludeHead={false} shouldIncludeAttributionSection={true} />
          </KibaFrame>
        </div>
      </div>
      {props.isEditorHidden && (
        <Fab color='primary' onClick={onShowEditorClicked} className={classes.fab}>
          <EditIcon />
        </Fab>
      )}
    </React.Fragment>
  )
}

Canvas.defaultProps = {
  isEditable: true,
  isHeadShown: true,
}
