import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { downloadFileFromBrowser } from '@kibalabs/core';
import { ErrorBoundary, useObjectLocalStorageState, useBooleanLocalStorageState, ISingleAnyChildProps } from '@kibalabs/core-react';
import { buildTheme, IndexPage, Direction, ThemeProvider, replaceAssetPaths } from '@kibalabs/everypage-core';

import { JsonEditor } from './jsonEditor';
import { CanvasStack } from './tempCanvasStack';
import { FloatingActionButton } from './floatingActionButton';
import { Dropzone, FilePreviewGrid } from './dropzone';
import { siteSchema } from './siteSchema';
import { defaultSite } from './defaultSite';

interface IKibaFrameProps extends ISingleAnyChildProps {
}

interface IKibaFrameInnerProps extends ISingleAnyChildProps {
  target: HTMLDocument;
}

const KibaFrameInner = (props: IKibaFrameInnerProps): React.ReactElement => {
  React.useEffect(() => {
    const css = '.frame-root, .frame-content { height:100%; width: 100%; }';
    const style = props.target.createElement('style');
    style.type = 'text/css';
    style.appendChild(props.target.createTextNode(css));
    props.target.head.appendChild(style);
  }, [props.target]);

  return (
    <React.Fragment>{ props.children }</React.Fragment>
  );
}

const KibaFrame = (props: IKibaFrameProps): React.ReactElement => {
  return (
    <Frame style={{height: '100%', width: '100%'}}>
      <FrameContextConsumer>{ frameContext => (
        <KibaFrameInner target={frameContext.document}>
          <StyleSheetManager target={frameContext.document.head}>
            <ErrorBoundary>
              { props.children }
            </ErrorBoundary>
          </StyleSheetManager>
        </KibaFrameInner>
      )}</FrameContextConsumer>
    </Frame>
  );
}

const VerticalLine = styled.div`
  background-color: #333333;
  width: 2px;
  height: 100%;
`;

const StyledButton = styled.div`
  background-color: #333333;
  padding: 8px 12px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #292929;
  }

  &:active {
    background-color: #222222;
  }

  &.selected {
    background-color: #111111;
  }
`;

const ButtonBar = styled.div`
  background-color: #333333;
  width: 100%;
`;

export const CanvasPage = (): React.ReactElement => {
  const [selectedType, setSelectedType] = React.useState<'site' | 'theme' | 'assets'>('site');
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');
  const [assetFiles, setAssetFiles] = React.useState<File[]>([]);

  const resolvedSiteContent = (siteContent || defaultSite);

  const onSiteJsonUpdated = (parsedJson: object): void => {
    setSiteContent(parsedJson);
  }

  const onThemeJsonUpdated = (parsedJson: object): void => {
    setSiteTheme(parsedJson);
  }

  const onAssetFilesChosen = (files: File[]): void => {
    files.forEach((file: File): void => {
      file.preview = URL.createObjectURL(file);
    });
    // NOTE(krish): not totally sure why this form is needed but its from https://github.com/facebook/react/issues/15041
    setAssetFiles((currentAssetFiles: File[]): File[] => {
      const filePaths = files.map((file: File): string => file.path);
      return [...currentAssetFiles.filter((file: File): boolean => !filePaths.includes(file.path)), ...files];
    });
  }

  const onDownloadClicked = async (): Promise<void> => {
    if (selectedType === 'site') {
      downloadFileFromBrowser('site.json', JSON.stringify(siteContent));
    } else if (selectedType === 'theme') {
      downloadFileFromBrowser('theme.json', JSON.stringify(siteTheme));
    }
  }

  const onHideEditorClicked = (): void => {
    setIsEditorHidden(true);
  }

  const onShowEditorClicked = (): void => {
    setIsEditorHidden(false);
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

  const getFileReplacements = (): Record<string, string> => {
    return assetFiles.reduce((replacements: Record<string, string>, file: File): Record<string, string> => {
      replacements[file.path] = file.preview;
      return replacements;
    }, {});
  }

  // TODO(krish): use core components here again when the bug below is resolved
  // NOTE(krish): both styled components and react-helmet don't work great with iframes
  // https://github.com/styled-components/styled-components/issues/2973
  // https://github.com/nfl/react-helmet/issues/277
  return (
    <ThemeProvider theme={buildTheme()}>
      <CanvasStack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
        <CanvasStack.Item isFullHeight={true} baseSize={isEditorHidden ? '0' : '500px'}>
          <CanvasStack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
            <ButtonBar>
              <CanvasStack direction={Direction.Horizontal} isFullWidth={true}>
                <StyledButton className={selectedType === 'site' ? 'selected' : ''} onClick={onSiteClicked}>Site</StyledButton>
                <StyledButton className={selectedType === 'theme' ? 'selected' : ''} onClick={onThemeClicked}>Theme</StyledButton>
                <StyledButton className={selectedType === 'assets' ? 'selected' : ''} onClick={onAssetsClicked}>Assets</StyledButton>
                <div />
                <StyledButton onClick={onHideEditorClicked}>Hide</StyledButton>
              </CanvasStack>
            </ButtonBar>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} shouldAllowScrolling={false} isHidden={selectedType !== 'site'}>
              <JsonEditor name='site' schema={siteSchema} json={resolvedSiteContent} onJsonUpdated={onSiteJsonUpdated}/>
            </CanvasStack.Item>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} shouldAllowScrolling={false} isHidden={selectedType !== 'theme'}>
              <JsonEditor name='theme' json={siteTheme} onJsonUpdated={onThemeJsonUpdated}/>
            </CanvasStack.Item>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} shouldAllowScrolling={false} isHidden={selectedType !== 'assets'}>
              <Dropzone onFilesChosen={onAssetFilesChosen} />
              <FilePreviewGrid files={assetFiles}/>
            </CanvasStack.Item>
            <CanvasStack direction={Direction.Horizontal} isFullWidth={true}>
              <button onClick={onDownloadClicked}>Download</button>
              <span>everypage canvas v{APP_VERSION}</span>
            </CanvasStack>
          </CanvasStack>
        </CanvasStack.Item>
        <VerticalLine />
        <CanvasStack.Item isFullHeight={true} growthFactor={1} shrinkFactor={1}>
          <KibaFrame>
            <IndexPage pageContent={replaceAssetPaths(resolvedSiteContent, getFileReplacements())} pageTheme={siteTheme} shouldIncludeHead={false}/>
          </KibaFrame>
        </CanvasStack.Item>
        {isEditorHidden && <FloatingActionButton onClicked={onShowEditorClicked}/>}
      </CanvasStack>
    </ThemeProvider>
  )
}
