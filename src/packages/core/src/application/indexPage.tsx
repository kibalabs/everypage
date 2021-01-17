import React from 'react';

import { ITheme, KibaApp } from '@kibalabs/ui-react';

import { buildEverypageTheme, renderSection, SectionHolder } from '.';
import { IWebsite, IWebsiteSection } from '../model';
import { Attribution, ISectionProps, Meta } from '../sections';
import { WebsiteProvider } from '../util';
import { HeadContent } from './headContent';
import { PluginRenderer } from './pluginRenderer';
import { SectionRenderer } from './sectionRenderer';

export interface IIndexPageProps {
  pageContent: IWebsite;
  pageTheme: ITheme;
  shouldIncludeHeadSection: boolean;
  shouldIncludeAttributionSection: boolean;
  isRehydrating?: boolean;
}

export const IndexPage = (props: IIndexPageProps): React.ReactElement => {
  const resolvedPageTheme = React.useMemo((): ITheme => buildEverypageTheme(props.pageTheme), [props.pageTheme]);
  return (
    <WebsiteProvider website={props.pageContent}>
      <KibaApp isRehydrating={props.isRehydrating} theme={resolvedPageTheme}>
        <HeadContent />
        {props.pageContent.plugins && <PluginRenderer plugins={props.pageContent.plugins} />}
        <SectionHolder background={props.pageContent.background}>
          {props.shouldIncludeHeadSection && (
            <SectionRenderer id='metadata' type='metadata' />
          )}
          {props.pageContent.sections?.map((sectionObject: IWebsiteSection, index: number): React.ReactElement<ISectionProps> => (
            <SectionRenderer key={index} id={`section-${index}`} {...sectionObject} />
          ))}
          {props.shouldIncludeAttributionSection && props.pageContent.shouldHideAttribution !== true && (
            <SectionRenderer id='attribution' type='attribution' />
          )}
        </SectionHolder>
      </KibaApp>
    </WebsiteProvider>
  );
};
IndexPage.defaultProps = {
  shouldIncludeHeadSection: false,
  shouldIncludeAttributionSection: true,
};
