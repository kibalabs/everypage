import React from 'react';
import { Helmet } from 'react-helmet';

import { useWebsite } from '../util';
import { IWebsite } from '../model';
import { ITheme, useTheme, IFont } from '../components';


export interface IGlobalHeadProps {
  website?: IWebsite;
  theme?: ITheme;
}

// TODO(krish): this should use HeadContent but can't yet because helmet doesn't work with fragments (https://github.com/nfl/react-helmet/issues/342)
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

  const createManifest = (): Record<string, any> => {
    const sizes = [48, 72, 96, 144, 168, 192, 256, 512];
    return {
      name: website.name,
      short_name: website.name,
      gcm_sender_id: '',
      gcm_user_visible_only: true,
      start_url: '/?utm_source=homescreen',
      permissions: ['gcm'],
      scope: '',
      orientation: 'portrait',
      display: 'standalone',
      theme_color: theme.colors.brandPrimary,
      background_color: theme.colors.background,
      icons: sizes.map((size) => ({
        'src': `/assets/_generated/favicon-${size}.png`,
        'sizes': `${size}x${size}`,
        'type': 'image/png'
      })),
    };
  }

  return (
    <Helmet>
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
      <meta name='theme-color' content={String(theme.colors.brandPrimary)} />
      <meta name='mobile-web-app-capable' content='yes' />

      {/* iOS */}
      <meta name='apple-mobile-web-app-title' content={website.name} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />

      {/* Windows */}
      <meta name='msapplication-navbutton-color' content={String(theme.colors.brandPrimary)} />
      <meta name='msapplication-TileColor' content={String(theme.colors.brandPrimary)} />
      <meta name='msapplication-TileImage' content={`/${website.buildHash}/assets/_generated/favicon-144x144.png`} />
      <meta name='msapplication-config' content='browserconfig.xml' />
      <meta name='msapplication-tooltip' content={website.tagline || website.description} />
      <meta name='msapplication-starturl' content='/' />
      <meta name='msapplication-tap-highlight' content='no' />

      {/* UC Mobile Browser */}
      <meta name='full-screen' content='yes' />
      <meta name='browsermode' content='application' />

      {/* Favicons */}
      <link rel='icon' type='image/png' sizes='16x16' href={`/${website.buildHash}/assets/_generated/favicon-16.png`} />
      <link rel='icon' type='image/png' sizes='32x32' href={`/${website.buildHash}/assets/_generated/favicon-32.png`} />
      <link rel='icon' type='image/png' sizes='48x48' href={`/${website.buildHash}/assets/_generated/favicon-48.png`} />
      <link rel='icon' type='image/png' sizes='228x228' href={`/${website.buildHash}/assets/_generated/favicon-228.png`} />
      <link rel='shortcut icon' type='image/x-icon' href={`/${website.buildHash}/assets/_generated/favicon.ico`} />

      {/* Favicons - iOS */}
      <link rel='apple-touch-icon' sizes='57x57' href={`/${website.buildHash}/assets/_generated/favicon-57.png`} />
      <link rel='apple-touch-icon' sizes='60x60' href={`/${website.buildHash}/assets/_generated/favicon-60.png`} />
      <link rel='apple-touch-icon' sizes='72x72' href={`/${website.buildHash}/assets/_generated/favicon-72.png`} />
      <link rel='apple-touch-icon' sizes='76x76' href={`/${website.buildHash}/assets/_generated/favicon-76.png`} />
      <link rel='apple-touch-icon' sizes='114x114' href={`/${website.buildHash}/assets/_generated/favicon-114.png`} />
      <link rel='apple-touch-icon' sizes='120x120' href={`/${website.buildHash}/assets/_generated/favicon-120.png`} />
      <link rel='apple-touch-icon' sizes='144x144' href={`/${website.buildHash}/assets/_generated/favicon-144.png`} />
      <link rel='apple-touch-icon' sizes='152x152' href={`/${website.buildHash}/assets/_generated/favicon-152.png`} />
      <link rel='apple-touch-icon' sizes='167x167' href={`/${website.buildHash}/assets/_generated/favicon-167.png`} />
      <link rel='apple-touch-icon' sizes='180x180' href={`/${website.buildHash}/assets/_generated/favicon-180.png`} />
      <link rel='apple-touch-icon' sizes='1024x1024' href={`/${website.buildHash}/assets/_generated/favicon-1024.png`} />

      {/* Favicons - Safari pinned */}
      <link rel='mask-icon' color={String(theme.colors.brandPrimary)} href={`/${website.buildHash}/assets/_generated/favicon.svg`} />

      {/* Favicons - Android */}
      <link rel='icon' sizes='192x192' href={`/${website.buildHash}/assets/_generated/favicon-192.png`} />
      <link rel='icon' sizes='128x128' href={`/${website.buildHash}/assets/_generated/favicon-128.png`} />

      {/* PWA Manifest */}
      <link rel='manifest' href={`data:application/manifest+json,${JSON.stringify(createManifest())}`} />
    </Helmet>
  );
};
