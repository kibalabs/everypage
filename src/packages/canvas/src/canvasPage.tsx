import React from 'react';
import { IWebsite, WebsiteProvider, Direction, SectionRenderer, ThemeProvider, Stack, IStackItemProps, ITheme } from '@kibalabs/everypage-core';

import { JsonEditor } from './jsonEditor';
import ErrorBoundary from './errorBoundary';


export const CanvasPage = (): React.ReactElement => {
  const [pageContent, setPageContent] = React.useState<{ sections: Record<string, any> } & IWebsite>(require('./site.json'));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageTheme, setPageTheme] = React.useState<ITheme>(require('./theme.json'));

  const stackItems: React.ReactElement<IStackItemProps>[] = pageContent.sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
    <Stack.Item key={index} growthFactor={1}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
  ));

  const onJsonUpdated = (parsedJson: object): void => {
    // TODO(krish): verify this is correct (json schema or typing?)
    try {
      setPageContent(parsedJson as { sections: Record<string, any> } & IWebsite);
    } catch {
    }
  }

  return (
    <WebsiteProvider website={pageContent as IWebsite}>
      <ThemeProvider theme={pageTheme}>
        <Stack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
          <JsonEditor json={pageContent} onJsonUpdated={onJsonUpdated}/>
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
