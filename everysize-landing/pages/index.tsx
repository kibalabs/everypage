import fs from 'fs'
import path from 'path'
import React from 'react';
import { GetStaticProps } from 'next'

import theme from '../theme';

import { ThemeProvider } from '@kibalabs/everypage/src/theming'
import { resetCss, GlobalCss, GlobalHead, WebsiteProvider } from '@kibalabs/everypage/src/util';
import { Attribution } from '@kibalabs/everypage/src/sections/attribution';
import { SectionRenderer } from '@kibalabs/everypage/src/sectionRenderer';
import { Stack, IStackItemProps } from '@kibalabs/everypage/src/components';
import { IWebsite } from '@kibalabs/everypage/src/model';
import { ISectionProps } from '@kibalabs/everypage/src/sections';

interface IIndexPageProps {
  pageContent: IWebsite & {
    sections: ISectionProps[]
  }
}

const Index = (props: IIndexPageProps): React.ReactElement => {
  const stackItems: React.ReactElement<IStackItemProps>[] = props.pageContent.sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
    <Stack.Item key={index} growthFactor={1}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
  ));
  stackItems.push(
    <Stack.Item key={props.pageContent.sections.length + 1} growthFactor={1}>
      <Attribution />
    </Stack.Item>
  );
  return (
    <WebsiteProvider website={props.pageContent as IWebsite}>
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
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<{props: IIndexPageProps}> => {
  const filePath = path.join(process.cwd(), process.env.NEXT_APP_SITE_FILE);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return {
    props: {
      pageContent: JSON.parse(fileContents),
    },
  };
};

export default Index;
