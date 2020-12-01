import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Helmet } from 'react-helmet';
import { LocalStorageClient, Requester } from '@kibalabs/core';
import { Router, Route, useInitialization } from '@kibalabs/core-react';
import { buildTheme, ThemeProvider, resetCss } from '@kibalabs/ui-react';

import { EverypageClient } from './everypageClient/everypageClient';
import { GlobalCss } from './components/globalCss';
import { HomePage } from './pages/homePage';
import { SitePage } from './pages/sitePage';
import { CanvasPage } from './pages/canvasPage';
import { CanvasPreviewPage } from './pages/canvasPreviewPage';
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
import { consoleConfig } from './consoleConfig';
import { EmptyPage } from './pages/emptyPage';

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
}

const theme = buildTheme({
  colors: {
    brandPrimary: '#4b6cb7',
    brandSecondary: '#182848',
  },
});

export const App = hot((): React.ReactElement => {
  useInitialization((): void => {
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
          {process.env.NODE_ENV === 'production' && <TawkTo accountId='5eb2856d81d25c0e584943a6' widgetId='1e7l85vs0' />}
          <GlobalCss resetCss={resetCss} theme={theme} />
          <Router authManager={authManager}>
            <Route path='/canvas' page={CanvasPage}/>
            <Route path='/canvas-section' page={CanvasPreviewPage}/>
            <Route path='/canvas-preview' page={CanvasPreviewPage}/>
            <Route path='/' page={HomePage} redirectIfNoAuth={'/login'} />
            <Route path='/accounts/:accountId' page={AccountPage} redirectIfNoAuth={'/login'} />
            <Route path='/sites/create' page={CreateSitePage} redirectIfNoAuth={'/login'} />
            <Route path='/sites/:slug' page={SitePage} redirectIfNoAuth={'/login'} />
            <Route path='/sites/:slug/preview/:siteVersionId' page={SiteVersionPreviewPage} redirectIfNoAuth={'/login'} />
            <Route path='/login' page={LoginPage} redirectIfAuth={'/'} />
            <Route path='/register' page={RegisterPage} redirectIfAuth={'/'} />
            <Route path='/verify-email' page={VerifyEmailPage} redirectIfNoAuth={'/'} />
            <Route path='/start' page={EmptyPage} redirectIfAuth={'/'} redirectIfNoAuth={'/canvas'}/>
            <Route default={true} page={NotFoundPage} />
          </Router>
        </React.Fragment>
      </GlobalsProvider>
    </ThemeProvider>
  );
});
