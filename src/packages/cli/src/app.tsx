import React from 'react';

import ReactDOM from 'react-dom';

import { IHistory, IRouteProps, Route, Router } from '@kibalabs/core-react';
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
  routerHistory?: IHistory;
}

const siteData: SiteData = __non_webpack_require__('./siteData.json');

export const App = (props: IAppProps) => {
  return (
    <Router history={props.routerHistory}>
      {siteData.routes.map((routeData: RouteData): React.ReactElement<IRouteProps> => (
        <Route key={routeData.path} path={routeData.path} pageElement={<IndexPage isRehydrating={true} pageContent={routeData.content} pageTheme={routeData.theme} />} />
      ))}
      <Route default={true} pageElement={<IndexPage isRehydrating={true} pageContent={siteData.notFoundPageContent} pageTheme={siteData.notFoundPageTheme} />} />
    </Router>
  );
};

export default App;

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');
  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
  const render = (Component: Function) => {
    renderMethod(<Component />, target);
  };
  render(App);
}
