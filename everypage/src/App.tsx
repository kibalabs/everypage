import React from 'react';

import { Root } from 'react-static';

import siteContent from './site';
import theme from './theme';

import { ThemeProvider } from './theming'
import { resetCss, GlobalCss, GlobalHead } from './util';
import { Attribution } from './sections/attribution';
import { SectionRenderer } from './sectionRenderer';
import { Stack, IStackItemProps } from './components/layouts';
import { IWebsite, WebsiteProvider } from './util';


const App = (): React.ReactElement => {
  const stackItems: React.ReactElement<IStackItemProps>[] = siteContent.sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
    <Stack.Item key={index} growthFactor={1}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
  ));
  stackItems.push(
    <Stack.Item key={siteContent.sections.length + 1} growthFactor={1}>
      <Attribution />
    </Stack.Item>
  );
  return (
    <Root>
      <WebsiteProvider website={siteContent as IWebsite}>
        <React.Fragment>
          <GlobalCss
            theme={theme}
            resetCss={resetCss}
          />
          <GlobalHead
            fontUrls={[
              'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900',
            ]}
          />
          <ThemeProvider theme={theme}>
            <Stack>{ stackItems }</Stack>
          </ThemeProvider>
        </React.Fragment>
      </WebsiteProvider>
    </Root>
  )
}

export default App;
