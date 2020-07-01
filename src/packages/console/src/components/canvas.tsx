
import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Direction } from '@kibalabs/ui-react';
import { IndexPage, replaceAssetPaths, HeadContent } from '@kibalabs/everypage-core';

import { KibaFrame } from '../components/kibaFrame';
import { JsonEditor } from '../components/jsonEditor';
import { CanvasStack } from '../components/tempCanvasStack';
import { Dropzone, FilePreviewGrid } from '../components/dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  buttonBar: {
    backgroundColor: '#333333',
    width: '100%',
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
  }
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
      <CanvasStack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
        <CanvasStack.Item baseSize={props.isEditorHidden ? '0' : '500px'}>
          <CanvasStack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
            <div className={classes.buttonBar}>
              <CanvasStack direction={Direction.Horizontal} isFullWidth={true}>
                <Button className={getClassName(classes.button, selectedType === 'site' && classes.buttonSelected)} onClick={onSiteClicked}>Site</Button>
                <Button className={getClassName(classes.button, selectedType === 'theme' && classes.buttonSelected)} onClick={onThemeClicked}>Theme</Button>
                <Button className={getClassName(classes.button, selectedType === 'assets' && classes.buttonSelected)} onClick={onAssetsClicked}>Assets</Button>
                <div />
                <Button className={classes.button} onClick={onHideEditorClicked}>Hide</Button>
              </CanvasStack>
            </div>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} isScrollable={false} isHidden={selectedType !== 'site'}>
              <JsonEditor isEditable={props.isEditable} name='site' json={props.siteContent} onJsonUpdated={onSiteJsonUpdated}/>
            </CanvasStack.Item>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} isScrollable={false} isHidden={selectedType !== 'theme'}>
              <JsonEditor isEditable={props.isEditable} name='theme' json={props.siteTheme} onJsonUpdated={onThemeJsonUpdated}/>
            </CanvasStack.Item>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} isScrollable={false} isHidden={selectedType !== 'assets'}>
              {props.isEditable && <Dropzone onFilesChosen={onAssetFilesChosen} />}
              <FilePreviewGrid fileMap={props.assetFileMap}/>
            </CanvasStack.Item>
          </CanvasStack>
        </CanvasStack.Item>
        <div className={classes.verticalLine} />
        <CanvasStack.Item growthFactor={1} shrinkFactor={1}>
          <KibaFrame>
            <React.Fragment>
              <HeadContent theme={props.siteTheme} website={props.siteContent} />
              <IndexPage pageContent={replaceAssetPaths(props.siteContent, props.assetFileMap)} pageTheme={props.siteTheme} shouldIncludeHeadSection={props.isHeadShown} shouldIncludeHead={false} shouldIncludeAttributionSection={true} />
            </React.Fragment>
          </KibaFrame>
        </CanvasStack.Item>
      </CanvasStack>
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
