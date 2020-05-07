import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { buildTheme, IndexPage, IWebsite, Direction, ThemeProvider, Stack, Text } from '@kibalabs/everypage-core';

import { JsonEditor } from './jsonEditor';
import { ErrorBoundary } from './reactCore/errorBoundary';
import { useObjectLocalStorageState } from './reactCore/useLocalStorageState';
import { StyleSheetManager } from 'styled-components';

const defaultSiteContent = require('./site.json');

export const CanvasPage = (): React.ReactElement => {
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');

  const resolvedSiteContent = (siteContent || defaultSiteContent);

  const onJsonUpdated = (parsedJson: object): void => {
    // TODO(krish): verify this is correct (json schema or typing?)
    try {
      setSiteContent(parsedJson as { sections: Record<string, any> } & IWebsite);
    } catch {
    }
  }

  // NOTE(krish): both styled components and react-helmet don't work great with iframes
  // https://github.com/styled-components/styled-components/issues/2973
  // https://github.com/nfl/react-helmet/issues/277
  return (
    <ThemeProvider theme={buildTheme()}>
      <Stack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
        <Stack.Item isFullHeight={true}>
          <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
            <Text>everypage canvas v{APP_VERSION}</Text>
            <Stack.Item growthFactor={1} shrinkFactor={1} shouldAllowScrolling={false}>
              <JsonEditor json={resolvedSiteContent} onJsonUpdated={onJsonUpdated}/>
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item isFullHeight={true} growthFactor={1} shrinkFactor={1}>
          <Frame style={{height: '100%', width: '100%'}}>
            <FrameContextConsumer>{ frameContext => (
              <StyleSheetManager target={frameContext.document.head}>
                <ErrorBoundary>
                  <IndexPage pageContent={resolvedSiteContent} pageTheme={siteTheme}/>
                </ErrorBoundary>
              </StyleSheetManager>
            )}</FrameContextConsumer>
          </Frame>
        </Stack.Item>
      </Stack>
    </ThemeProvider>
  )
}
