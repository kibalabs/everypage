import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { buildTheme, IndexPage, Direction, ThemeProvider, updateAssetPaths } from '@kibalabs/everypage-core';

import { JsonEditor } from './jsonEditor';
import { ErrorBoundary } from './reactCore/errorBoundary';
import { useObjectLocalStorageState } from './reactCore/useLocalStorageState';
import { StyleSheetManager } from 'styled-components';
import { CanvasStack } from './tempCanvasStack';

const defaultSiteContent = require('./site.json');

export const CanvasPage = (): React.ReactElement => {
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');

  const resolvedSiteContent = (siteContent || defaultSiteContent);

  const onJsonUpdated = (parsedJson: object): void => {
    setSiteContent(parsedJson);
  }

  // TODO(krish): use core components here again when the bug below is resolved
  // NOTE(krish): both styled components and react-helmet don't work great with iframes
  // https://github.com/styled-components/styled-components/issues/2973
  // https://github.com/nfl/react-helmet/issues/277
  return (
    <ThemeProvider theme={buildTheme()}>
      <CanvasStack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
        <CanvasStack.Item isFullHeight={true}>
          <CanvasStack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
            <span>everypage canvas v{APP_VERSION}</span>
            <CanvasStack.Item growthFactor={1} shrinkFactor={1} shouldAllowScrolling={false}>
              <JsonEditor json={resolvedSiteContent} onJsonUpdated={onJsonUpdated}/>
            </CanvasStack.Item>
          </CanvasStack>
        </CanvasStack.Item>
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
      </CanvasStack>
    </ThemeProvider>
  )
}
