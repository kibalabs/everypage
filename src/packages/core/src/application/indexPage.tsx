import React from 'react';

import { resetCss, GlobalCss, GlobalHead, SectionRenderer } from '.';
import { WebsiteProvider } from '../util';
import { ThemeProvider, ITheme, buildTheme } from '../components';
import { IWebsite } from '../model';
import { SectionHolder, ISectionProps } from '../sections';

export interface IIndexPageProps {
  pageContent: { sections: Record<string, any> } & IWebsite;
  pageTheme: ITheme;
  shouldIncludeHead: boolean;
}

export const IndexPage = (props: IIndexPageProps): React.ReactElement => {
  const sections: React.ReactElement<ISectionProps>[] = props.pageContent.sections.map((sectionObject: Record<string, any>, index: number): React.ReactElement<ISectionProps> => (
    <SectionRenderer key={index} sectionObject={sectionObject} />
  ));
  // stackItems.push(
  //   // Push empty stack item the fills any remaining space
  //   <Stack.Item key={sections.length} growthFactor={1}>
  //     <div />
  //   </Stack.Item>
  // );
  sections.push(
    // <Stack.Item >
      <SectionRenderer key={sections.length} sectionObject={{type: 'attribution'}}/>
    // </Stack.Item>
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
          {props.shouldIncludeHead && <GlobalHead />}
          <SectionHolder>{ sections }</SectionHolder>
        </React.Fragment>
      </ThemeProvider>
    </WebsiteProvider>
  )
}
IndexPage.defaultProps = {
  shouldIncludeHead: true,
}

export default IndexPage;
