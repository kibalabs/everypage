import React from 'react';

import { useWebsite } from '../util';
import { IWebsite } from '../model';
import { ITheme, useTheme } from '../components';


export interface IHeadContentProps {
  website?: IWebsite;
  theme?: ITheme;
}

export const HeadContent = (props: IHeadContentProps): React.ReactElement => {
  const website = props.website || useWebsite();
  const theme = props.theme || useTheme();
  return (
    <React.Fragment>
      <meta charSet='utf-8' />
      <meta name='ep-version' content={process.env.PACKAGE_VERSION} />
      <meta name='build-hash' content={website.buildHash || null} />
      <meta name='attribution' content='Made with everypage. Visit https://www.everypagehq.com' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      { website.version && <meta name='version' content={website.version} /> }

      {/* Font loading ideas from https://csswizardry.com/2020/05/the-fastest-google-fonts/ */}
      {/* NOTE(krish): helmet doesnt work with fragments (https://github.com/nfl/react-helmet/issues/342) */}
      <link rel='preconnect' href='https://assets.evrpg.com' crossOrigin='anonymous' />
      { Object.keys(theme.fonts).map((fontKey: string, index: number): React.ReactElement => (
        <link key={index} href={theme.fonts[fontKey].url} rel='preload' as='style' />
      ))}
      { Object.keys(theme.fonts).map((fontKey: string, index: number): React.ReactElement => (
        <link key={index} href={theme.fonts[fontKey].url} rel='stylesheet' media='print' onLoad={(event: React.SyntheticEvent<HTMLLinkElement>): void => {(event.target as HTMLLinkElement).media = 'all'}} />
      ))}

      <title>{website.title || `${website.name} - ${website.tagline}`}</title>
      { website.description && <meta name='description' content={website.description} /> }
      { website.keywords && <meta name='keywords' content={website.keywords.join(', ')} /> }
      <meta name='author' content={website.company} />
      <meta name='copyright' content={website.company} />
    </React.Fragment>
  );
};
