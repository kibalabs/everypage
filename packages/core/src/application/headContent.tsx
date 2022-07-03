import React from 'react';

import { Head, ITheme, mergeTheme, useTheme } from '@kibalabs/ui-react';

import { IWebsite } from '../model';
import { useWebsite } from '../util';

export interface IHeadContentProps {
  website?: IWebsite;
  theme?: ITheme;
}

// NOTE(krishan711): meta tags from https://github.com/gokulkrishh/awesome-meta-and-manifest/blob/master/README.md
export const HeadContent = (props: IHeadContentProps): React.ReactElement => {
  const website = useWebsite(props.website);
  const theme = mergeTheme(useTheme(), props.theme);
  const title = website.title || `${website.name} - ${website.tagline}`;
  const assetPrefix = website.buildHash ? `/${website.buildHash}` : '';
  let socialCardImageUrl = website.socialCardImageUrl;
  if (socialCardImageUrl && socialCardImageUrl.startsWith('/')) {
    // NOTE(krishan711): Twitter doesn't support relative urls
    socialCardImageUrl = `https://${website.siteHost}${assetPrefix}${socialCardImageUrl}`;
  }
  let faviconImageUrl = website.faviconImageUrl;
  if (faviconImageUrl && faviconImageUrl.startsWith('/')) {
    faviconImageUrl = `${assetPrefix}${faviconImageUrl}`;
  }

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      {/* Everypage meta */}
      <meta name='generator' content='everypage (https://www.everypagehq.com)' />
      <meta name='everypage-version' content={process.env.PACKAGE_VERSION} />
      <meta name='build-hash' content={website.buildHash} />
      { website.version && <meta name='version' content={website.version} /> }

      {/* Fonts */}
      <link rel='preconnect' href='https://assets.evrpg.com' crossOrigin='anonymous' />
      { Object.keys(theme.fonts || {}).map((fontKey: string, index: number): React.ReactElement => (
        <React.Fragment key={index}>
          <link href={theme.fonts[fontKey].url} rel='preload' as='style' />
          {/* TODO(krishan711): the lazy loading doesn't work here */}
          {/* <link href={theme.fonts[fontKey].url} rel='stylesheet' media='print' onLoad={((event: React.SyntheticEvent<HTMLLinkElement>): void => {(event.target as HTMLLinkElement).media = 'all'})} />
          <noscript><link href={theme.fonts[fontKey].url} rel='stylesheet' /></noscript> */}
          <link href={theme.fonts[fontKey].url} rel='stylesheet' />
        </React.Fragment>
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
      {socialCardImageUrl && <meta property='og:image' content={socialCardImageUrl} />}
      <meta property='og:url' content={`https://${website.siteHost}`} />

      {/* Twitter */}
      <meta name='twitter:card' content={(website.iosAppId || website.androidAppId) ? 'app' : 'summary_large_image'} />
      <meta name='twitter:title' content={title} />
      { website.description && <meta name='twitter:description' content={website.description} /> }
      {socialCardImageUrl && <meta name='twitter:image' content={socialCardImageUrl} />}
      {/* <meta name='twitter:image:alt' content='Alt text for image' /> */}
      { website.twitterUsername && <meta name='twitter:site' content={`@${website.twitterUsername}`} /> }
      { website.twitterCompanyUsername && <meta name='twitter:creator' content={`@${website.twitterCompanyUsername}`} /> }
      { website.iosAppId && <meta name='twitter:app:id:iphone' content={website.iosAppId} /> }
      { website.iosAppId && <meta name='twitter:app:id:ipad' content={website.iosAppId} /> }
      { website.androidAppId && <meta name='twitter:app:id:googleplay' content={website.androidAppId} /> }

      {/* Android */}
      <meta name='theme-color' content={String(theme.colors.brandPrimary)} />
      <meta name='mobile-web-app-capable' content='yes' />

      {/* iOS */}
      <meta name='apple-mobile-web-app-title' content={website.name} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      {website.shouldUseGeneratedFavicons && <link rel='apple-touch-icon' sizes='180x180' href={`${assetPrefix}/assets/_generated/favicon-180.png`} />}
      {website.shouldUseGeneratedFavicons && <link rel='apple-touch-icon' sizes='1024x1024' href={`${assetPrefix}/assets/_generated/favicon-1024.png`} />}

      {/* iOS Banner */}
      { website.iosAppId && <meta name='apple-itunes-app' content={website.iosAppId} /> }

      {/* Windows */}
      <meta name='msapplication-navbutton-color' content={String(theme.colors.brandPrimary)} />
      <meta name='msapplication-TileColor' content={String(theme.colors.brandPrimary)} />
      {website.shouldUseGeneratedFavicons && <meta name='msapplication-TileImage' content={`${assetPrefix}/assets/_generated/favicon-144.png`} />}
      <meta name='msapplication-config' content='browserconfig.xml' />
      <meta name='msapplication-tooltip' content={website.tagline || website.description} />
      <meta name='msapplication-starturl' content='/' />
      <meta name='msapplication-tap-highlight' content='no' />

      {/* UC Mobile Browser */}
      <meta name='full-screen' content='yes' />
      <meta name='browsermode' content='application' />

      {/* Favicons */}
      {!website.shouldUseGeneratedFavicons && faviconImageUrl && <link rel='icon' href={faviconImageUrl} />}
      {website.shouldUseGeneratedFavicons && <link rel='icon' type='image/png' sizes='16x16' href={`${assetPrefix}/assets/_generated/favicon-16.png`} />}
      {website.shouldUseGeneratedFavicons && <link rel='icon' type='image/png' sizes='32x32' href={`${assetPrefix}/assets/_generated/favicon-32.png`} />}
      {website.shouldUseGeneratedFavicons && <link rel='icon' type='image/png' sizes='48x48' href={`${assetPrefix}/assets/_generated/favicon-48.png`} />}
      {website.shouldUseGeneratedFavicons && <link rel='icon' type='image/png' sizes='228x228' href={`${assetPrefix}/assets/_generated/favicon-228.png`} />}
      {website.shouldUseGeneratedFavicons && <link rel='shortcut icon' type='image/x-icon' href={`${assetPrefix}/assets/_generated/favicon.ico`} />}

      {/* Favicons - Android */}
      {website.shouldUseGeneratedFavicons && <link rel='icon' sizes='192x192' href={`${assetPrefix}/assets/_generated/favicon-192.png`} />}
      {website.shouldUseGeneratedFavicons && <link rel='icon' sizes='128x128' href={`${assetPrefix}/assets/_generated/favicon-128.png`} />}

      {/* PWA Manifest */}
      {website.shouldUseGeneratedFavicons && <link rel='manifest' href={`${assetPrefix}/assets/_generated/manifest.json`} />}
    </Head>
  );
};
