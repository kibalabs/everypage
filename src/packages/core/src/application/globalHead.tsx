import React from 'react';
import { Helmet } from 'react-helmet';

import { useWebsite } from '../util';
import { IWebsite } from '../model';
import { ITheme, useTheme, IFont } from '../components';


export interface IGlobalHeadProps {
  website?: IWebsite;
  theme?: ITheme;
}

export const GlobalHead = (props: IGlobalHeadProps): React.ReactElement => {
  const website = props.website || useWebsite();
  const theme = props.theme || useTheme();
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <meta name='author' content={website.company} />
      <meta name='copyright' content={website.company} />
      <meta name='attribution' content='Made with everypage. Visit https://www.everypagehq.com' />
      <meta name='ep-version' content={process.env.PACKAGE_VERSION} />
      <meta name='build-hash' content={website.buildHash || null} />
      <title>{website.title || `${website.name} - ${website.tagline}`}</title>
      { website.description && <meta name='description' content={website.description} /> }
      { website.version && <meta name='version' content={website.version} /> }
      { website.keywords && <meta name='keywords' content={website.keywords.join(', ')} /> }

      {/* Font loading ideas from https://csswizardry.com/2020/05/the-fastest-google-fonts/ */}
      {/* NOTE(krish): helmet doesnt work with fragments (https://github.com/nfl/react-helmet/issues/342) */}
      <link rel='preconnect' href='https://assets.evrpg.com' crossorigin />
      { Object.values(theme.fonts).map((font: IFont, index: number): React.ReactElement => (
        <link key={index} href={font.url} rel='preload' as='style' />
      ))}
      { Object.values(theme.fonts).map((font: IFont, index: number): React.ReactElement => (
        <link key={index} href={font.url} rel='stylesheet' media='print' onload='this.media="all"' />
      ))}
    </Helmet>
  );
};
