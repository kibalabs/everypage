import React from 'react';
import { ThemeProvider, ITheme } from '@kibalabs/ui-react';

import { resetCss, GlobalCss, GlobalHead, SectionHolder, renderSection, buildEverypageTheme } from '.';
import { WebsiteProvider } from '../util';
import { IWebsite } from '../model';
import { ISectionProps } from '../sections';
import { PluginRenderer } from './pluginRenderer';

export interface IIndexPageProps {
  pageContent: { sections: Record<string, any> } & IWebsite;
  pageTheme: ITheme;
  shouldIncludeHead: boolean;
  shouldIncludeHeadSection: boolean;
  shouldIncludeAttributionSection: boolean;
}

export const IndexPage = (props: IIndexPageProps): React.ReactElement => {
  const resolvedPageTheme = buildEverypageTheme(props.pageTheme);
  const sections = props.pageContent.sections.map((sectionObject: Record<string, any>, index: number): React.ReactElement<ISectionProps> => (
    renderSection({...sectionObject, key: index})
  ));
  if (props.shouldIncludeAttributionSection) {
    sections.push(renderSection({ key: sections.length, type: 'attribution'}));
  }
  if (props.shouldIncludeHeadSection) {
    sections.unshift(renderSection({ key: sections.length, type: 'head'}));
  }

  // TODO(krish): add validation for the website information

  return (
    <WebsiteProvider website={props.pageContent}>
      <ThemeProvider theme={resolvedPageTheme}>
        <React.Fragment>
          <GlobalCss
            theme={resolvedPageTheme}
            resetCss={resetCss}
          />
          {props.shouldIncludeHead && <GlobalHead />}
          {props.pageContent.plugins && <PluginRenderer plugins={props.pageContent.plugins} />}
          <SectionHolder>{ sections }</SectionHolder>
        </React.Fragment>
      </ThemeProvider>
    </WebsiteProvider>
  )
}
IndexPage.defaultProps = {
  shouldIncludeHead: true,
  shouldIncludeHeadSection: false,
  shouldIncludeAttributionSection: true,
}

export default IndexPage;
