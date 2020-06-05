import React from 'react';
import { Helmet } from 'react-helmet';

import { useWebsite } from '../util';
import { IWebsite } from '../model';
import { ITheme, useTheme, IFont } from '../components';


export interface IGlobalHeadProps {
  website?: IWebsite;
  theme?: ITheme;
}

// TODO(krish): this should use HeadContent but can't yet becasue helmet doesnt work with fragments (https://github.com/nfl/react-helmet/issues/342)
export const GlobalHead = (props: IGlobalHeadProps): React.ReactElement => {
  const website = props.website || useWebsite();
  const theme = props.theme || useTheme();
  const title = website.title || `${website.name} - ${website.tagline}`;
  let socialCardImageUrl = website.socialCardImageUrl;
  if (!socialCardImageUrl) {
    // TODO(krish): set a default image!
  } else if (socialCardImageUrl.startsWith('/')) {
    socialCardImageUrl = `https://${website.siteHost}${socialCardImageUrl}`;
  }
  return (
    <Helmet>
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

      <title>{title}</title>
      { website.description && <meta name='description' content={website.description} /> }
      { website.keywords && <meta name='keywords' content={website.keywords.join(', ')} /> }
      <meta name='author' content={website.company} />
      <meta name='copyright' content={website.company} />

      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={website.name} />
      { website.description && <meta property='og:description' content={website.description} /> }
      <meta property='og:image' content={socialCardImageUrl} />
      <meta property='og:url' content={`https://${website.siteHost}`} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      { website.description && <meta name='twitter:description' content={website.description} /> }
      <meta name='twitter:image' content={socialCardImageUrl} />
      <meta name='twitter:image:alt' content='Alt text for image' />
      { website.twitterUsername && <meta name='twitter:site' content={`@${website.twitterUsername}`} /> }
      { website.twitterCompanyUsername && <meta name='twitter:creator' content={`@${website.twitterCompanyUsername}`} /> }
    </Helmet>
  );
};
