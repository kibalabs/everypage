import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IHistory } from '@kibalabs/core-react';
import { IndexPage } from '@kibalabs/everypage-core';

interface IAppProps {
  routerHistory?: IHistory;
}

export const NotFound = (): React.ReactElement => {
  return (
    <div>Oh my, not found!</div>
  );
};

export const Index = (): React.ReactElement => {
  const siteData = { pageContent: require('./site.json'), pageTheme: require('./theme.json') };
  return (
    <IndexPage isRehydrating={true} pageContent={siteData.pageContent} pageTheme={siteData.pageTheme} />
  );
}

export const App = (props: IAppProps) => {
  return (
    <Router history={props.routerHistory}>
      <Route path='/' page={Index} />
      <Route default={true} page={NotFound} />
    </Router>
  );
}

export default App;

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');
  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
  const render = (Component: Function) => {
    renderMethod(<Component />, target);
  };
  render(App);
  // if (module && module.hot) {
  //   module.hot.accept('@kibalabs/everypage', () => render(App));
  //   module.hot.accept('@kibalabs/everypage-core', () => render(App));
  // }
}
