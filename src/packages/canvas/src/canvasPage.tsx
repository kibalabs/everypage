import React from 'react';
import styled from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { buildTheme, IndexPage, Direction, ThemeProvider, updateAssetPaths } from '@kibalabs/everypage-core';

import { JsonEditor } from './jsonEditor';
import { ErrorBoundary } from './reactCore/errorBoundary';
import { useObjectLocalStorageState, useBooleanLocalStorageState } from './reactCore/useLocalStorageState';
import { StyleSheetManager } from 'styled-components';
import { CanvasStack } from './tempCanvasStack';
import { FloatingActionButton } from './floatingActionButton';
import { downloadFile } from './core/util/downloadIUtil';

const defaultSiteContent = require('./site.json');

const VerticalLine = styled.div`
  background-color: #777777;
  width: 2px;
  height: 100%;
`;

export const CanvasPage = (): React.ReactElement => {
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');

  const resolvedSiteContent = (siteContent || defaultSiteContent);

  const onJsonUpdated = (parsedJson: object): void => {
    setSiteContent(parsedJson);
  }

  const onDownloadClicked = async (): Promise<void> => {
    downloadFile('site.json', JSON.stringify(siteContent));
  }

  const onHideEditorClicked = (): void => {
    setIsEditorHidden(true);
  }

  const onShowEditorClicked = (): void => {
    setIsEditorHidden(false);
  }

  // TODO(krish): use core components here again when the bug below is resolved
  // NOTE(krish): both styled components and react-helmet don't work great with iframes
  // https://github.com/styled-components/styled-components/issues/2973
  // https://github.com/nfl/react-helmet/issues/277
  return (
    <ThemeProvider theme={buildTheme()}>
      <CanvasStack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
        <CanvasStack.Item isFullHeight={true} baseSize={isEditorHidden ? 0 : '500px'}>
          <CanvasStack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
            <CanvasStack direction={Direction.Horizontal} isFullWidth={true}>
              <button onClick={onDownloadClicked}>Download</button>
              <button onClick={onHideEditorClicked}>Hide</button>
            </CanvasStack>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} shouldAllowScrolling={false}>
              <JsonEditor json={resolvedSiteContent} onJsonUpdated={onJsonUpdated}/>
            </CanvasStack.Item>
            <CanvasStack direction={Direction.Horizontal} isFullWidth={true}>
              <div />
              <span>everypage canvas v{APP_VERSION}</span>
            </CanvasStack>
          </CanvasStack>
        </CanvasStack.Item>
        <VerticalLine />
        <CanvasStack.Item isFullHeight={true} growthFactor={1} shrinkFactor={1}>
          <Frame style={{height: '100%', width: '100%'}}>
            <FrameContextConsumer>{ frameContext => (
              <StyleSheetManager target={frameContext.document.head}>
                <ErrorBoundary>
                  <IndexPage pageContent={updateAssetPaths(resolvedSiteContent, 'TODO-KRISH-REPLACE')} pageTheme={siteTheme}/>
                </ErrorBoundary>
              </StyleSheetManager>
            )}</FrameContextConsumer>
          </Frame>
        </CanvasStack.Item>
        {isEditorHidden && <FloatingActionButton onClicked={onShowEditorClicked}/>}
      </CanvasStack>
    </ThemeProvider>
  )
}
