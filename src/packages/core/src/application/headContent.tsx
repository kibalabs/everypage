import React from 'react';
import ReactDOM from 'react-dom';
import { ISingleAnyChildProps, IMultiAnyChildProps } from '@kibalabs/core-react';
import { ITheme, useTheme } from '@kibalabs/ui-react';

import { useWebsite } from '../util';
import { IWebsite } from '../model';

export const HeadRootContext = React.createContext<HTMLElement | null>(null);

interface IHeadRootProviderProps extends ISingleAnyChildProps {
  root: HTMLElement;
}

export const HeadRootProvider = (props: IHeadRootProviderProps): React.ReactElement => {
  return (
    <HeadRootContext.Provider value={props.root}>
      {props.children}
    </HeadRootContext.Provider>
  );
};

export function useHeadRoot(): HTMLElement {
  const headRoot = React.useContext(HeadRootContext);
  if (!headRoot) {
    throw Error('No headRoot has been set!');
  }
  return headRoot;
}

interface IHeadProps extends IMultiAnyChildProps {
}

export const Head = (props: IHeadProps): React.ReactElement => {
  const headRoot = useHeadRoot();
  return React.isValidElement(headRoot) ? React.cloneElement(headRoot, {}, props.children) : ReactDOM.createPortal(props.children, headRoot);
}

interface IChildCaptureProps extends IMultiAnyChildProps {
  headElements: HTMLElement[];
}

export const ChildCapture = (props: IChildCaptureProps): React.ReactElement => {
  props.headElements.push(props.children);
  return null;
}

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
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      {/* Everypage meta */}
      <meta name='ep-version' content={process.env.PACKAGE_VERSION} />
      <meta name='build-hash' content={website.buildHash || null} />
      <meta name='attribution' content='Made with everypage. Visit https://www.everypagehq.com' />
      { website.version && <meta name='version' content={website.version} /> }

      {/* Fonts */}
      <link rel='preconnect' href='https://assets.evrpg.com' crossOrigin='anonymous' />
      { Object.keys(theme.fonts || {}).map((fontKey: string, index: number): React.ReactElement => (
        <React.Fragment key={index}>
          <link key={index} href={theme.fonts[fontKey].url} rel='preload' as='style' />
          <link key={index} href={theme.fonts[fontKey].url} rel='stylesheet' media='print' onLoad={((event: React.SyntheticEvent<HTMLLinkElement>): void => {(event.target as HTMLLinkElement).media = 'all'})} />
          <noscript><link href={theme.fonts[fontKey].url} rel='stylesheet' /></noscript>
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
      <meta property='og:image' content={socialCardImageUrl} />
      <meta property='og:url' content={`https://${website.siteHost}`} />

      {/* Twitter */}
      <meta name='twitter:card' content={(website.iosAppId || website.androidAppId) ? 'app' : 'summary_large_image'} />
      <meta name='twitter:title' content={title} />
      { website.description && <meta name='twitter:description' content={website.description} /> }
      <meta name='twitter:image' content={socialCardImageUrl} />
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
      {/* iOS Banner */}
      { website.iosAppId && <meta name='apple-itunes-app' content={website.iosAppId} /> }

      {/* Windows */}
      <meta name='msapplication-navbutton-color' content={String(theme.colors.brandPrimary)} />
      <meta name='msapplication-TileColor' content={String(theme.colors.brandPrimary)} />
      <meta name='msapplication-TileImage' content={`/${website.buildHash}/assets/_generated/favicon-144.png`} />
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
      <link rel='apple-touch-icon' sizes='180x180' href={`/${website.buildHash}/assets/_generated/favicon-180.png`} />
      <link rel='apple-touch-icon' sizes='1024x1024' href={`/${website.buildHash}/assets/_generated/favicon-1024.png`} />

      {/* Favicons - Android */}
      <link rel='icon' sizes='192x192' href={`/${website.buildHash}/assets/_generated/favicon-192.png`} />
      <link rel='icon' sizes='128x128' href={`/${website.buildHash}/assets/_generated/favicon-128.png`} />

      {/* PWA Manifest */}
      <link rel='manifest' href={`/${website.buildHash}/assets/_generated/manifest.json`} />

      {/* Temporary fixes */}
      <script src='https://cdn.jsdelivr.net/npm/lazysizes@5.2.2/lazysizes.min.js' async={true} />
      <script src='https://cdn.jsdelivr.net/npm/lazysizes@5.2.2/plugins/attrchange/ls.attrchange.min.js' async={true} />
      <script src='https://cdn.jsdelivr.net/npm/whatwg-fetch@3.2.0/dist/fetch.umd.min.js' />
    </Head>
  );
};
