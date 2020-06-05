import React from 'react';
import styled from 'styled-components';
import { buildTheme, IndexPage, Direction, ThemeProvider, replaceAssetPaths, HeadContent } from '@kibalabs/everypage-core';

import { KibaFrame } from '../components/kibaFrame';
import { JsonEditor } from '../components/jsonEditor';
import { CanvasStack } from '../components/tempCanvasStack';
import { FloatingActionButton } from '../components/floatingActionButton';
import { Dropzone, FilePreviewGrid } from '../components/dropzone';
import { Button, ButtonBar } from '../components/button';

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

const VerticalLine = styled.div`
  background-color: #333333;
  width: 2px;
  height: 100%;
`;

export const Canvas = (props: ICanvasProps): React.ReactElement => {
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
    <ThemeProvider theme={buildTheme()}>
      <CanvasStack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
        <CanvasStack.Item isFullHeight={true} baseSize={props.isEditorHidden ? '0' : '500px'}>
          <CanvasStack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
            <ButtonBar>
              <CanvasStack direction={Direction.Horizontal} isFullWidth={true}>
                <Button className={selectedType === 'site' ? 'selected' : ''} onClick={onSiteClicked}>Site</Button>
                <Button className={selectedType === 'theme' ? 'selected' : ''} onClick={onThemeClicked}>Theme</Button>
                {props.isEditable && <Button className={selectedType === 'assets' ? 'selected' : ''} onClick={onAssetsClicked}>Assets</Button>}
                <div />
                <Button onClick={onHideEditorClicked}>Hide</Button>
              </CanvasStack>
            </ButtonBar>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} isScrollable={false} isHidden={selectedType !== 'site'}>
              <JsonEditor isEditable={props.isEditable} name='site' json={props.siteContent} onJsonUpdated={onSiteJsonUpdated}/>
            </CanvasStack.Item>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} isScrollable={false} isHidden={selectedType !== 'theme'}>
              <JsonEditor isEditable={props.isEditable} name='theme' json={props.siteTheme} onJsonUpdated={onThemeJsonUpdated}/>
            </CanvasStack.Item>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} isScrollable={false} isHidden={selectedType !== 'assets'}>
              <Dropzone onFilesChosen={onAssetFilesChosen} />
              <FilePreviewGrid fileMap={props.assetFileMap}/>
            </CanvasStack.Item>
          </CanvasStack>
        </CanvasStack.Item>
        <VerticalLine />
        <CanvasStack.Item isFullHeight={true} growthFactor={1} shrinkFactor={1}>
          <KibaFrame>
            <React.Fragment>
              <HeadContent theme={props.siteTheme} website={props.siteContent} />
              <IndexPage pageContent={replaceAssetPaths(props.siteContent, props.assetFileMap)} pageTheme={props.siteTheme} shouldIncludeHeadSection={props.isHeadShown} shouldIncludeHead={false} shouldIncludeAttributionSection={true} />
            </React.Fragment>
          </KibaFrame>
        </CanvasStack.Item>
        {props.isEditorHidden && <FloatingActionButton onClicked={onShowEditorClicked}/>}
      </CanvasStack>
    </ThemeProvider>
  )
}

Canvas.defaultProps = {
  isEditable: true,
  isHeadShown: true,
}
