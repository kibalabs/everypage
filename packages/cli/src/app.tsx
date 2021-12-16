import React from 'react';

import ReactDOM from 'react-dom';

import { IRoute, Router } from '@kibalabs/core-react';
import { IndexPage, IWebsite } from '@kibalabs/everypage';
import { ITheme } from '@kibalabs/ui-react';

export interface RouteData {
  path: string;
  content: IWebsite;
  theme: ITheme;
}

export interface SiteData {
  routes: RouteData[];
  notFoundPageContent: IWebsite;
  notFoundPageTheme: ITheme;
}

export interface IAppProps {
  staticPath?: string;
}

// eslint-disable-next-line no-undef
const siteData: SiteData = __non_webpack_require__('./siteData.json');

export const App = (props: IAppProps): React.ReactElement => {
  const routes: IRoute[] = siteData.routes.map((routeData: RouteData): IRoute => {
    return { path: routeData.path, pageElement: <IndexPage isRehydrating={true} pageContent={routeData.content} pageTheme={routeData.theme} /> };
  });
  routes.push({ path: '*', pageElement: <IndexPage isRehydrating={true} pageContent={siteData.notFoundPageContent} pageTheme={siteData.notFoundPageTheme} /> });
  return (
    <Router staticPath={props.staticPath} routes={routes} />
  );
};

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');
  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
  const render = (Component: React.ReactElement): void => {
    renderMethod(<Component />, target);
  };
  render(App);
}
