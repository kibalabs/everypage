import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Router, Route, useInitialization } from '@kibalabs/core-react';
import { LocalStorageClient, Requester } from '@kibalabs/core';

import { EverypageClient } from './everypageClient/everypageClient';
import { GlobalCss } from './components/globalCss';
import { resetCss } from './components/resetCss';
import { HomePage } from './pages/homePage';
import { SitePage } from './pages/sitePage';
import { CanvasPage } from './pages/canvasPage';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import { VerifyEmailPage } from './pages/verifyEmailPage';
import { NotFoundPage } from './pages/notFoundPage';
import { CreateSitePage } from './pages/createSitePage';
import { SiteVersionPreviewPage } from './pages/siteVersionPreviewPage';
import { AccountPage } from './pages/accountPage';
import { GlobalsProvider } from './globalsContext';
import { TawkTo } from './components/tawkto';
import { AuthManager } from './authManager';
import { JwtRequestModifier } from './jwtRequestModifier';

const localStorageClient = new LocalStorageClient(window.localStorage);
const requester = new Requester();
const everypageClient = new EverypageClient(requester);
const authManager = new AuthManager(localStorageClient, 'ep-console-jwt', everypageClient);
requester.addModifier(new JwtRequestModifier(authManager));
const globals = {
  everypageClient,
  authManager,
  localStorageClient,
}

export const App = hot((): React.ReactElement => {
  useInitialization((): void => {
    console.log(`\n\n\nRunning everypage console version: ${window.KRT_VERSION}\n\n\n`);
    if (authManager.getIsUserLoggedIn()) {
      everypageClient.refresh_token();
    }
  });

  return (
    <GlobalsProvider globals={globals}>
      <React.Fragment>
        <Helmet>
          <title>Everypage Console</title>
        </Helmet>
        {process.env.NODE_ENV === 'production' && <TawkTo accountId='5eb2856d81d25c0e584943a6' widgetId='1e7l85vs0' />}
        <GlobalCss resetCss={resetCss} />
        <Router authManager={authManager}>
          <Route path='/' page={HomePage} redirectIfNoAuth={'/login'} />
          <Route path='/canvas' page={CanvasPage} redirectIfNoAuth={'/login'} />
          <Route path='/accounts/:accountId' page={AccountPage} redirectIfNoAuth={'/login'} />
          <Route path='/sites/create' page={CreateSitePage} redirectIfNoAuth={'/login'} />
          <Route path='/sites/:slug' page={SitePage} redirectIfNoAuth={'/login'} />
          <Route path='/sites/:slug/preview/:siteVersionId' page={SiteVersionPreviewPage} redirectIfNoAuth={'/login'} />
          <Route path='/login' page={LoginPage} redirectIfAuth={'/'} />
          <Route path='/register' page={RegisterPage} redirectIfAuth={'/'} />
          <Route path='/verify-email' page={VerifyEmailPage} redirectIfNoAuth={'/'} />
          <Route default={true} page={NotFoundPage} />
        </Router>
      </React.Fragment>
    </GlobalsProvider>
  );
})
