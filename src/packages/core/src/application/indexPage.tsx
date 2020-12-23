import React from 'react';
import { KibaApp, ITheme } from '@kibalabs/ui-react';

import { SectionHolder, renderSection, buildEverypageTheme } from '.';
import { WebsiteProvider } from '../util';
import { IWebsite } from '../model';
import { ISectionProps } from '../sections';
import { PluginRenderer } from './pluginRenderer';
import { HeadContent } from './headContent';

export interface IIndexPageProps {
  pageContent: IWebsite;
  pageTheme: ITheme;
  shouldIncludeHeadSection: boolean;
  shouldIncludeAttributionSection: boolean;
  isRehydrating?: boolean;
}

export const IndexPage = (props: IIndexPageProps): React.ReactElement => {
  const resolvedPageTheme = React.useMemo((): ITheme => buildEverypageTheme(props.pageTheme), [props.pageTheme]);
  const sections = props.pageContent.sections.map((sectionObject: Record<string, any>, index: number): React.ReactElement<ISectionProps> => (
    renderSection({id: `section-${index}`, ...sectionObject, key: index})
  ));
  if (props.shouldIncludeAttributionSection && props.pageContent.shouldHideAttribution !== true) {
    sections.push(renderSection({ id: 'attribution', key: sections.length, type: 'attribution'}));
  }
  if (props.shouldIncludeHeadSection) {
    sections.unshift(renderSection({ id: 'metadata', key: sections.length, type: 'meta'}));
  }

  return (
    <WebsiteProvider website={props.pageContent}>
      <KibaApp isRehydrating={props.isRehydrating} theme={resolvedPageTheme}>
        <HeadContent />
        {props.pageContent.plugins && <PluginRenderer plugins={props.pageContent.plugins} />}
        <SectionHolder background={props.pageContent.background}>{ sections }</SectionHolder>
      </KibaApp>
    </WebsiteProvider>
  )
}
IndexPage.defaultProps = {
  shouldIncludeHeadSection: false,
  shouldIncludeAttributionSection: true,
}
