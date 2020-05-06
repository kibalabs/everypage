import React from 'react';
import { IWebsite, WebsiteProvider, Direction, SectionRenderer, ThemeProvider, Stack, IStackItemProps, ITheme } from '@kibalabs/everypage-core';

import { JsonEditor } from './jsonEditor';
import { ErrorBoundary } from './reactCore/errorBoundary';
import { useObjectLocalStorageState } from './reactCore/useLocalStorageState';
import { buildTheme } from '@kibalabs/everypage-core/src/components';

const defaultSiteContent = require('./site.json');

export const CanvasPage = (): React.ReactElement => {
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');

  const resolvedSiteContent = (siteContent || defaultSiteContent);
  const resolvedSiteTheme = buildTheme(siteTheme);
  
  const stackItems: React.ReactElement<IStackItemProps>[] = siteContent.sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
    <Stack.Item key={index} growthFactor={1}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
  ));

  const onJsonUpdated = (parsedJson: object): void => {
    // TODO(krish): verify this is correct (json schema or typing?)
    try {
      setSiteContent(parsedJson as { sections: Record<string, any> } & IWebsite);
    } catch {
    }
  }

  return (
    <WebsiteProvider website={resolvedSiteContent as IWebsite}>
      <ThemeProvider theme={resolvedSiteTheme}>
        <Stack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
          <JsonEditor json={resolvedSiteContent} onJsonUpdated={onJsonUpdated}/>
          <Stack.Item growthFactor={1}>
            <ErrorBoundary>
              <Stack direction={Direction.Vertical} isFullHeight={true}>
                { stackItems }
              </Stack>
            </ErrorBoundary>
          </Stack.Item>
        </Stack>
      </ThemeProvider>
    </WebsiteProvider>
  )
}
