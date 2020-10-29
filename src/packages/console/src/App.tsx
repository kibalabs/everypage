import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Helmet } from 'react-helmet';
import { LocalStorageClient, Requester } from '@kibalabs/core';
import { Router, Route, useInitialization } from '@kibalabs/core-react';
import { buildTheme, ThemeProvider, resetCss } from '@kibalabs/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { EverypageClient } from './everypageClient/everypageClient';
import { GlobalCss } from './components/globalCss';
import { HomePage } from './pages/homePage';
import { SitePage } from './pages/sitePage';
import { CanvasPage } from './pages/canvasPage';
import { CanvasSectionPage } from './pages/canvasSectionPage';
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
import { IConsoleConfig } from './consoleConfig';
import { EmptyPage } from './pages/emptyPage';

const localStorageClient = new LocalStorageClient(window.localStorage);
const requester = new Requester();
const everypageClient = new EverypageClient(requester);
const authManager = new AuthManager(localStorageClient, 'ep-console-jwt', everypageClient);
requester.addModifier(new JwtRequestModifier(authManager));

const consoleConfig: IConsoleConfig = {
  plans: [{
    planIndex: 1,
    name: 'Core',
    code: 'core',
    priceMonthly: 0,
    priceYearly: 0,
    priceCodeMonthly: 'monthly',
    priceCodeYearly: 'yearly',
    siteLimit: 3,
    hasCustomDomain: false,
    hasNoBranding: false,
    isPurchasable: true,
    highlightFeature: 'get your pages published',
    features: [
    ],
  }, {
    planIndex: 2,
    name: 'Starter',
    code: 'starter',
    priceMonthly: 500,
    priceYearly: 5000,
    priceCodeMonthly: 'monthly',
    priceCodeYearly: 'yearly',
    siteLimit: 20,
    hasCustomDomain: true,
    hasNoBranding: false,
    isPurchasable: true,
    highlightFeature: 'host pages on your own domain',
    features: [
    ],
  }, {
    planIndex: 3,
    name: 'Premium',
    code: 'premium',
    priceMonthly: 2000,
    priceYearly: 20000,
    priceCodeMonthly: 'monthly',
    priceCodeYearly: 'yearly',
    siteLimit: 50,
    hasCustomDomain: true,
    hasNoBranding: true,
    isPurchasable: true,
    highlightFeature: 'remove everypage branding',
    features: [
    ],
  // }, {
  //   planIndex: 4,
  //   name: 'Ultimate',
  //   code: 'ultimate',
  //   priceMonthly: 5000,
  //   priceYearly: 50000,
  //   priceCodeMonthly: 'monthly',
  //   priceCodeYearly: 'yearly',
  //   siteLimit: 100,
  //   hasCustomDomain: true,
  //   hasNoBranding: true,
  //   isPurchasable: false,
  //   highlightFeature: 'run a/b tests on your sites',
  //   features: [
  //   ],
  }]
}

const globals = {
  everypageClient,
  authManager,
  localStorageClient,
  consoleConfig,
}

const stripePromise = loadStripe('pk_live_74pJIhvxX0m61Ub6NDjFiFBy00Q8aDg61J');
// const stripePromise = loadStripe('pk_test_51GqarKBhdc2gIBl2s6qZ2AUFhlRXQOE0l7y4dnUC5YUoKdLSpobrz3h4hFC3PJduu91lTvWJrPW6YwdrCzxExljh00YB1xWyma');

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
        <Elements stripe={stripePromise}>
          <Helmet>
            <title>Everypage Console</title>
          </Helmet>
          {process.env.NODE_ENV === 'production' && <TawkTo accountId='5eb2856d81d25c0e584943a6' widgetId='1e7l85vs0' />}
          <GlobalCss resetCss={resetCss} theme={theme} />
          <Router authManager={authManager}>
            <Route path='/canvas' page={CanvasPage}/>
            <Route path='/canvas-section' page={CanvasSectionPage}/>
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
        </Elements>
      </GlobalsProvider>
    </ThemeProvider>
  );
});
