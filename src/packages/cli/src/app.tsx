import React from 'react';

import ReactDOM from 'react-dom';

import { IRouteProps, Route, Router } from '@kibalabs/core-react';
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
  return (
    <Router staticPath={props.staticPath}>
      {siteData.routes.map((routeData: RouteData): React.ReactElement<IRouteProps> => (
        <Route
          key={routeData.path}
          path={routeData.path}
          pageElement={<IndexPage isRehydrating={true} pageContent={routeData.content} pageTheme={routeData.theme} />}
        />
      ))}
      <Route
        default={true}
        pageElement={<IndexPage isRehydrating={true} pageContent={siteData.notFoundPageContent} pageTheme={siteData.notFoundPageTheme} />}
      />
    </Router>
  );
};

export default App;

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');
  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
  const render = (Component: React.ReactElement): void => {
    renderMethod(<Component />, target);
  };
  render(App);
}
