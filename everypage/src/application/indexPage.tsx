import React from 'react';
import * as ReactStatic from '@kibalabs/react-static';

import { resetCss, GlobalCss, GlobalHead, SectionRenderer } from '.';
import { WebsiteProvider } from '../util';
import { ThemeProvider, Stack, IStackItemProps } from '../components';
import { IWebsite } from '../model';
import { Attribution } from '../sections';


export const IndexPage = (): React.ReactElement => {
  const siteData = ReactStatic.useSiteData();
  const stackItems: React.ReactElement<IStackItemProps>[] = siteData.pageContent.sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
    <Stack.Item key={index} growthFactor={1}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
  ));
  stackItems.push(
    <Stack.Item key={siteData.pageContent.sections.length + 1} growthFactor={1}>
      <Attribution />
    </Stack.Item>
  );

  return (
    <WebsiteProvider website={siteData.pageContent as IWebsite}>
      <ThemeProvider theme={siteData.pageTheme}>
        <React.Fragment>
          <GlobalCss
            theme={siteData.pageTheme}
            resetCss={resetCss}
          />
          <GlobalHead
            website={siteData.pageContent as IWebsite}
            fontUrls={[
              'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900',
            ]}
          />
          <Stack>{ stackItems }</Stack>
        </React.Fragment>
      </ThemeProvider>
    </WebsiteProvider>
  )
}

export default IndexPage;
