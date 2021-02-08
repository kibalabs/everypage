import React from 'react';

import { LocalStorageClient, Requester } from '@kibalabs/core';
import { Route, Router, useInitialization, useFavicon } from '@kibalabs/core-react';
import { TawkToChat } from '@kibalabs/everypage';
import { buildTheme, resetCss, ThemeProvider } from '@kibalabs/ui-react';
import Helmet from 'react-helmet';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';

import { AuthManager } from './authManager';
import { GlobalCss } from './components/globalCss';
import { consoleConfig } from './consoleConfig';
import { EverypageClient } from './everypageClient/everypageClient';
import { GlobalsProvider } from './globalsContext';
import { JwtRequestModifier } from './jwtRequestModifier';
import { AccountPage } from './pages/accountPage';
import { CanvasPage } from './pages/canvasPage';
import { CanvasPreviewPage } from './pages/canvasPreviewPage';
import { CreateSitePage } from './pages/createSitePage';
import { EmptyPage } from './pages/emptyPage';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { NotFoundPage } from './pages/notFoundPage';
import { RegisterPage } from './pages/registerPage';
import { SitePage } from './pages/sitePage';
import { SiteVersionPreviewPage } from './pages/siteVersionPreviewPage';
import { VerifyEmailPage } from './pages/verifyEmailPage';

const localStorageClient = new LocalStorageClient(window.localStorage);
const requester = new Requester();
const everypageClient = new EverypageClient(requester);
const authManager = new AuthManager(localStorageClient, 'ep-console-jwt', everypageClient);
requester.addModifier(new JwtRequestModifier(authManager));

const globals = {
  everypageClient,
  authManager,
  localStorageClient,
  consoleConfig,
};

const defaultTheme = buildTheme();
const theme = buildTheme({
  colors: {
    brandPrimary: '#4b6cb7',
    brandSecondary: '#182848',
  },
  buttons: {
    default: {
      normal: {
        default: {
          background: {
            padding: `${defaultTheme.dimensions.paddingNarrow} ${defaultTheme.dimensions.paddingWide}`,
          },
          text: {
            'font-weight': 'normal',
          },
        },
      },
    },
    padded: {
      normal: {
        default: {
          background: {
            padding: `${defaultTheme.dimensions.padding} ${defaultTheme.dimensions.paddingWide}`,
          },
        },
      },
    },
    destructive: {
      normal: {
        default: {
          text: {
            color: '$colors.error',
          },
        },
        hover: {
          background: {
            'background-color': '$colors.errorClear90',
          },
        },
        press: {
          background: {
            'background-color': '$colors.errorClear80',
          },
        },
      },
    },
  },
  texts: {
    default: {
      'font-size': '16px',
    },
    light: {
      color: '$colors.textLight25',
    },
  },
  boxes: {
    banner: {
      'background-color': 'white',
      padding: `${defaultTheme.dimensions.padding} ${defaultTheme.dimensions.paddingWide}`,
      'border-width': '1px',
      'border-color': '$colors.backgroundDark25',
      'border-radius': '0',
    },
  },
});

export const App = hot((): React.ReactElement => {
  useFavicon('/assets/favicon.svg');
  useInitialization((): void => {
    // eslint-disable-next-line no-console
    console.log(`Running everypage console version: ${window.KRT_VERSION}`);
    if (authManager.getIsUserLoggedIn()) {
      everypageClient.refreshToken();
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalsProvider globals={globals}>
        <React.Fragment>
          <Helmet>
            <title>Everypage Console</title>
          </Helmet>
          {process.env.NODE_ENV === 'production' && <TawkToChat accountId='5eb2856d81d25c0e584943a6' widgetId='1e7l85vs0' />}
          <GlobalCss resetCss={resetCss} theme={theme} />
          <Router authManager={authManager}>
            <Route path='/canvas' page={CanvasPage} />
            <Route path='/canvas-preview' page={CanvasPreviewPage} />
            <Route path='/' page={HomePage} redirectIfNoAuth={'/login'} />
            <Route path='/accounts/:accountId' page={AccountPage} redirectIfNoAuth={'/login'} />
            <Route path='/sites/create' page={CreateSitePage} redirectIfNoAuth={'/login'} />
            <Route path='/sites/:slug' page={SitePage} redirectIfNoAuth={'/login'} />
            <Route path='/sites/:slug/preview/:siteVersionId' page={SiteVersionPreviewPage} redirectIfNoAuth={'/login'} />
            <Route path='/login' page={LoginPage} redirectIfAuth={'/'} />
            <Route path='/register' page={RegisterPage} redirectIfAuth={'/'} />
            <Route path='/verify-email' page={VerifyEmailPage} redirectIfNoAuth={'/'} />
            <Route path='/start' page={EmptyPage} redirectIfAuth={'/'} redirectIfNoAuth={'/canvas'} />
            <Route default={true} page={NotFoundPage} />
          </Router>
        </React.Fragment>
      </GlobalsProvider>
    </ThemeProvider>
  );
});
