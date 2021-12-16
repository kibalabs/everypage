import React from 'react';

import { IHeadRootProviderProps, ITheme, KibaApp } from '@kibalabs/ui-react';

import { buildEverypageTheme, SectionHolder } from '.';
import { IWebsite, IWebsiteSection } from '../model';
import { ISectionProps } from '../sections';
import { WebsiteProvider } from '../util';
import { HeadContent } from './headContent';
import { PluginRenderer } from './pluginRenderer';
import { SectionRenderer } from './sectionRenderer';

export interface IIndexPageProps extends IHeadRootProviderProps {
  pageContent: IWebsite;
  pageTheme: ITheme;
  shouldIncludeHeadSection: boolean;
  shouldIncludeAttributionSection: boolean;
  isRehydrating?: boolean;
}

export const IndexPage = (props: IIndexPageProps): React.ReactElement => {
  console.log('IndexPage', setHead)
  const resolvedPageTheme = React.useMemo((): ITheme => buildEverypageTheme(props.pageTheme), [props.pageTheme]);
  return (
    <WebsiteProvider website={props.pageContent}>
      <KibaApp isRehydrating={props.isRehydrating} theme={resolvedPageTheme} setHead={props.setHead}>
        <HeadContent />
        {props.pageContent.plugins && <PluginRenderer plugins={props.pageContent.plugins} />}
        <SectionHolder background={props.pageContent.background}>
          {props.shouldIncludeHeadSection && (
            <SectionRenderer id='meta' type='meta' />
          )}
          {/* TODO(krishan711): this fragment should be removed but typing complains, fix this! */}
          <React.Fragment>
            {props.pageContent.sections?.map((section: IWebsiteSection, index: number): React.ReactElement<ISectionProps> => (
              <SectionRenderer key={index} id={`section-${index}`} {...section} />
            ))}
          </React.Fragment>
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
