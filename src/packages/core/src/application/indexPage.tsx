import React from 'react';
import { KibaApp, ITheme } from '@kibalabs/ui-react';

import { SectionHolder, renderSection, buildEverypageTheme } from '.';
import { WebsiteProvider } from '../util';
import { IWebsite } from '../model';
import { ISectionProps } from '../sections';
import { PluginRenderer } from './pluginRenderer';
import { HeadContent } from './headContent';

export interface IIndexPageProps {
  pageContent: { sections: Record<string, any> } & IWebsite;
  pageTheme: ITheme;
  shouldIncludeHeadSection: boolean;
  shouldIncludeAttributionSection: boolean;
}

export const IndexPage = (props: IIndexPageProps): React.ReactElement => {
  const resolvedPageTheme = React.useMemo((): ITheme => buildEverypageTheme(props.pageTheme), [props.pageTheme]);
  const sections = props.pageContent.sections.map((sectionObject: Record<string, any>, index: number): React.ReactElement<ISectionProps> => (
    renderSection({...sectionObject, key: index})
  ));
  if (props.shouldIncludeAttributionSection && props.pageContent.shouldHideAttribution !== true) {
    sections.push(renderSection({ key: sections.length, type: 'attribution'}));
  }
  if (props.shouldIncludeHeadSection) {
    sections.unshift(renderSection({ key: sections.length, type: 'head'}));
  }

  // TODO(krish): add validation for the website information

  return (
    <KibaApp theme={resolvedPageTheme}>
      <WebsiteProvider website={props.pageContent}>
        <React.Fragment>
          <HeadContent />
          {props.pageContent.plugins && <PluginRenderer plugins={props.pageContent.plugins} />}
          <SectionHolder background={props.pageContent.background}>{ sections }</SectionHolder>
        </React.Fragment>
      </WebsiteProvider>
    </KibaApp>
  )
}
IndexPage.defaultProps = {
  shouldIncludeHeadSection: false,
  shouldIncludeAttributionSection: true,
}

export default IndexPage;
