import React from 'react';

import { useWebsite } from '../util';
import { IWebsite } from '../model';
import { ITheme, useTheme } from '../components';


export interface IHeadContentProps {
  website?: IWebsite;
  theme?: ITheme;
}

// NOTE(krish): meta tags from https://github.com/gokulkrishh/awesome-meta-and-manifest/blob/master/README.md
export const HeadContent = (props: IHeadContentProps): React.ReactElement => {
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
    <React.Fragment>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      {/* Everypage meta */}
      <meta name='ep-version' content={process.env.PACKAGE_VERSION} />
      <meta name='build-hash' content={website.buildHash || null} />
      <meta name='attribution' content='Made with everypage. Visit https://www.everypagehq.com' />
      { website.version && <meta name='version' content={website.version} /> }

      {/* Fonts */}
      {/* Font loading ideas from https://csswizardry.com/2020/05/the-fastest-google-fonts/ */}
      {/* NOTE(krish): helmet doesn't work with fragments (https://github.com/nfl/react-helmet/issues/342) */}
      <link rel='preconnect' href='https://assets.evrpg.com' crossOrigin='anonymous' />
      { Object.keys(theme.fonts || {}).map((fontKey: string, index: number): React.ReactElement => (
        <link key={index} href={theme.fonts[fontKey].url} rel='preload' as='style' />
      ))}
      { Object.keys(theme.fonts || {}).map((fontKey: string, index: number): React.ReactElement => (
        <link key={index} href={theme.fonts[fontKey].url} rel='stylesheet' media='print' onLoad={(event: React.SyntheticEvent<HTMLLinkElement>): void => {(event.target as HTMLLinkElement).media = 'all'}} />
      ))}

      {/* Page meta */}
      <title>{title}</title>
      { website.description && <meta name='description' content={website.description} /> }
      { website.keywords && <meta name='keywords' content={website.keywords.join(', ')} /> }
      <meta name='author' content={website.company} />
      <meta name='copyright' content={website.company} />
      <meta name='application-name' content={website.name} />

      {/* Facebook */}
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={website.name} />
      { website.description && <meta property='og:description' content={website.description} /> }
      <meta property='og:image' content={socialCardImageUrl} />
      <meta property='og:url' content={`https://${website.siteHost}`} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      { website.description && <meta name='twitter:description' content={website.description} /> }
      <meta name='twitter:image' content={socialCardImageUrl} />
      <meta name='twitter:image:alt' content='Alt text for image' />
      { website.twitterUsername && <meta name='twitter:site' content={`@${website.twitterUsername}`} /> }
      { website.twitterCompanyUsername && <meta name='twitter:creator' content={`@${website.twitterCompanyUsername}`} /> }

      {/* Android */}
      <meta name='theme-color' content={String(theme.brandColorPrimary)} />
      <meta name='mobile-web-app-capable' content='yes' />

      {/* iOS */}
      <meta name='apple-mobile-web-app-title' content={website.name} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />

      {/* Windows */}
      <meta name='msapplication-navbutton-color' content={String(theme.brandColorPrimary)} />
      <meta name='msapplication-TileColor' content={String(theme.brandColorPrimary)} />
      <meta name='msapplication-TileImage' content='/assets/_generated/favicon-144x144.png' />
      <meta name='msapplication-config' content='browserconfig.xml' />
      <meta name='msapplication-tooltip' content={website.tagline || website.description} />
      <meta name='msapplication-starturl' content='/' />
      <meta name='msapplication-tap-highlight' content='no' />

      {/* UC Mobile Browser */}
      <meta name='full-screen' content='yes' />
      <meta name='browsermode' content='application' />

      {/* Favicons */}
      <link href='/assets/_generated/favicon-16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/assets/_generated/favicon-32.png' rel='icon' type='image/png' sizes='32x32' />
      <link href='/assets/_generated/favicon-48.png' rel='icon' type='image/png' sizes='48x48' />
      <link href='/assets/_generated/favicon-228.png' rel='icon' type='image/png' sizes='228x228' />
      <link href='/assets/_generated/favicon.icon' rel='shortcut icon' type='image/x-icon' />

      {/* Favicons - iOS */}
      <link href='/assets/_generated/favicon-57.png' rel='apple-touch-icon' sizes='57x57' />
      <link href='/assets/_generated/favicon-60.png' rel='apple-touch-icon' sizes='60x60' />
      <link href='/assets/_generated/favicon-72.png' rel='apple-touch-icon' sizes='72x72' />
      <link href='/assets/_generated/favicon-76.png' rel='apple-touch-icon' sizes='76x76' />
      <link href='/assets/_generated/favicon-114.png' rel='apple-touch-icon' sizes='114x114' />
      <link href='/assets/_generated/favicon-120.png' rel='apple-touch-icon' sizes='120x120' />
      <link href='/assets/_generated/favicon-144.png' rel='apple-touch-icon' sizes='144x144' />
      <link href='/assets/_generated/favicon-152.png' rel='apple-touch-icon' sizes='152x152' />
      <link href='/assets/_generated/favicon-167.png' rel='apple-touch-icon' sizes='167x167' />
      <link href='/assets/_generated/favicon-180.png' rel='apple-touch-icon' sizes='180x180' />
      <link href='/assets/_generated/favicon-1024.png' rel='apple-touch-icon' sizes='1024x1024' />

      {/* Favicons - Safari pinned */}
      <link href='/assets/_generated/favicon.svg' rel='mask-icon' color={String(theme.brandColorPrimary)} />

      {/* Favicons - Android */}
      <link href='/assets/_generated/favicon-192.png' rel='icon' sizes='192x192' />
      <link href='/assets/_generated/favicon-128.png' rel='icon' sizes='128x128' />

      {/* PWA Manifest */}
      <link href='/assets/_generated/manifest.json' rel='manifest' />
    </React.Fragment>
  );
};
