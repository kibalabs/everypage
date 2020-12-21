import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IHistory } from '@kibalabs/core-react';

interface IAppProps {
  routerHistory?: IHistory;
  pageContent?: object;
  pageTheme?: object;
  notFoundPageContent?: object;
  notFoundPageTheme?: object;
}

export const App = (props: IAppProps) => {
  return (
    <Router history={props.routerHistory}>
      {/* <Route path='/' pageElement={<Index pageContent={props.pageContent} pageTheme={props.pageTheme} />} />
      <Route default={true} pageElement={<Index pageContent={props.notFoundPageContent} pageTheme={props.notFoundPageTheme} />} /> */}
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
}
