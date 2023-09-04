import React from 'react';


import { IRoute, Router } from '@kibalabs/core-react';
import { IndexPage, IWebsite } from '@kibalabs/everypage';
import { IHeadRootProviderProps, ITheme } from '@kibalabs/ui-react';
import { createRoot, hydrateRoot } from 'react-dom/client';

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

export interface IAppProps extends IHeadRootProviderProps {
  staticPath?: string;
}

// eslint-disable-next-line no-undef
const siteData: SiteData = __non_webpack_require__('./siteData.json');

const getBasePath = (): string | undefined => {
  if (typeof window === 'undefined' || !window.location.pathname.startsWith('/_bh')) {
    return undefined;
  }
  const pathParts = window.location.pathname.split('/');
  return `/${pathParts[1]}`;
};

export const App = (props: IAppProps): React.ReactElement => {
  const routes: IRoute[] = siteData.routes.map((routeData: RouteData): IRoute => {
    return { path: routeData.path, pageElement: <IndexPage isRehydrating={true} setHead={props.setHead} pageContent={routeData.content} pageTheme={routeData.theme} /> };
  });
  routes.push({ path: '*', pageElement: <IndexPage isRehydrating={true} setHead={props.setHead} pageContent={siteData.notFoundPageContent} pageTheme={siteData.notFoundPageTheme} /> });
  return (
    <Router basePath={getBasePath()} staticPath={props.staticPath} routes={routes} />
  );
};

if (typeof document !== 'undefined') {
  const target = document.getElementById('root') as HTMLDivElement;
  if (target.hasChildNodes()) { // && window.location.pathname === renderedPath) {
    hydrateRoot(target, <React.StrictMode><App /></React.StrictMode>);
  } else {
    createRoot(target).render(<React.StrictMode><App /></React.StrictMode>);
  }
}
