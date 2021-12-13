import React from 'react';

import { KibaException, LocalStorageClient, Requester } from '@kibalabs/core';
import { Route, Router, useFavicon, useInitialization } from '@kibalabs/core-react';
import { TawkToChat } from '@kibalabs/everypage';
import { KibaApp } from '@kibalabs/ui-react';
import Helmet from 'react-helmet';

import { AuthManager } from './authManager';
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
import { consoleTheme } from './theme';

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

declare global {
  export interface Window {
    KRT_VERSION?: string;
  }
}

export const App = (): React.ReactElement => {
  useFavicon('/assets/favicon.svg');

  useInitialization((): void => {
    // eslint-disable-next-line no-console
    console.log(`Running everypage console version: ${window.KRT_VERSION}`);
    if (authManager.getIsUserLoggedIn()) {
      everypageClient.refreshToken().catch((error: KibaException): void => {
        if (error.message.includes('TOKEN_PAST_LAST_REFRESH_DATE')) {
          authManager.logout().then((): void => {
            window.location.reload();
          });
        }
      });
    }
  });

  return (
    <KibaApp theme={consoleTheme}>
      <GlobalsProvider globals={globals}>
        <Helmet>
          <title>Everypage Console</title>
        </Helmet>
        {process.env.NODE_ENV === 'production' && <TawkToChat accountId='5eb2856d81d25c0e584943a6' widgetId='1e7l85vs0' />}
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
      </GlobalsProvider>
    </KibaApp>
  );
};
