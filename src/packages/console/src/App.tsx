import React from 'react';
import { Helmet } from 'react-helmet';
import { Router, Route } from '@kibalabs/core-react';
import { LocalStorageClient, Requester, RequesterModifier, Request, Response } from '@kibalabs/core';

import { EverypageClient } from './everypageClient/everypageClient';
import { GlobalCss } from './components/globalCss';
import { resetCss } from './components/resetCss';
import { HomePage } from './pages/homePage';
import { SitePage } from './pages/sitePage';
import { CanvasPage } from './pages/canvasPage';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import { NotFoundPage } from './pages/notFoundPage';
import { SiteVersionPreviewPage } from './pages/siteVerisonPreviewPage';
import { GlobalsProvider } from './globalsContext';
import { TawkTo } from './components/tawkto';

export class JwtRequestModifier extends RequesterModifier {
  private localStorageClient: LocalStorageClient;
  private jwtStorageKey: string;

  public constructor(localStorageClient: LocalStorageClient, jwtStorageKey: string) {
    super();
    this.localStorageClient = localStorageClient;
    this.jwtStorageKey = jwtStorageKey;
  }

  public modifyRequest(request: Request): Request {
    const jwt = this.localStorageClient.getValue(this.jwtStorageKey);
    if (jwt) {
      request.headers['Authorization'] = `Bearer ${jwt}`;
    }
    return request;
  }

  public modifyResponse(response: Response): Response {
    if ('x-kiba-token' in response.headers && response.headers['x-kiba-token']) {
      this.localStorageClient.setValue(this.jwtStorageKey, response.headers['x-kiba-token']);
    }
    return response;
  }

}

const localStorageClient = new LocalStorageClient(window.localStorage);
const requester = new Requester();
requester.addModifier(new JwtRequestModifier(localStorageClient, 'ep-console-jwt'));
const everypageClient = new EverypageClient(requester);
const globals = {
  everypageClient,
  localStorageClient,
}

export const App = (): React.ReactElement => {
  return (
    <GlobalsProvider globals={globals}>
      <React.Fragment>
        <Helmet>
          <title>Everypage Console</title>
        </Helmet>
        <TawkTo accountId='5eb2856d81d25c0e584943a6' widgetId='1e7l85vs0' />
        <GlobalCss resetCss={resetCss} />
        <Router>
          <Route path='/' page={HomePage} />
          <Route path='/login' page={LoginPage} />
          <Route path='/register' page={RegisterPage} />
          <Route path='/canvas' page={CanvasPage} />
          <Route path='/sites/:slug' page={SitePage} />
          <Route path='/sites/:slug/preview/:siteVersionId' page={SiteVersionPreviewPage} />
          <Route default={true} page={NotFoundPage} />
        </Router>
      </React.Fragment>
    </GlobalsProvider>
  );
}
