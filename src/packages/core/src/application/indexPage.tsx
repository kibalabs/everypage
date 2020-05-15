import React from 'react';

import { resetCss, GlobalCss, GlobalHead, SectionRenderer } from '.';
import { WebsiteProvider } from '../util';
import { ThemeProvider, Stack, IStackItemProps, ITheme, buildTheme } from '../components';
import { IWebsite } from '../model';
import { Attribution } from '../sections';

export interface IIndexPageProps {
  pageContent: { sections: Record<string, any> } & IWebsite;
  pageTheme: ITheme;
}

export const IndexPage = (props: IIndexPageProps): React.ReactElement => {
  const stackItems: React.ReactElement<IStackItemProps>[] = props.pageContent.sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
    <Stack.Item key={index} growthFactor={1}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
  ));
  stackItems.push(
    // Push empty stack item the fills any remaining space
    <Stack.Item key={props.pageContent.sections.length + 1} growthFactor={1}>
      <div />
    </Stack.Item>
  );
  stackItems.push(
    <Stack.Item key={props.pageContent.sections.length + 2}>
      <Attribution />
    </Stack.Item>
  );
  const resolvedPageTheme = buildTheme(props.pageTheme);

  return (
    <WebsiteProvider website={props.pageContent as IWebsite}>
      <ThemeProvider theme={resolvedPageTheme}>
        <React.Fragment>
          <GlobalCss
            theme={resolvedPageTheme}
            resetCss={resetCss}
          />
          <GlobalHead />
          <Stack isFullHeight={true}>{ stackItems }</Stack>
        </React.Fragment>
      </ThemeProvider>
    </WebsiteProvider>
  )
}

export default IndexPage;
