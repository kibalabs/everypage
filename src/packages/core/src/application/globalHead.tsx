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
      <script src='https://unpkg.com/ionicons@5.0.1/dist/ionicons.js' />
      { website.keywords && <meta name='keywords' content={website.keywords.join(', ')} /> }
      { website.version && <meta name='version' content={website.version} /> }
      { website.description && <meta name='description' content={website.description} /> }
      <title>{website.title || `${website.name} - ${website.tagline}`}</title>
      { Object.values(theme.fonts).map((font: IFont, index: number): React.ReactElement => (
        <link key={index} href={font.url} rel='stylesheet' />
      ))}
    </Helmet>
  );
};
