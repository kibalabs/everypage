import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from '@kibalabs/core-react';

import { NotFound } from './404';
import { Home } from './home';

export const App = () => (
  <Router>
    <Route path='/' page={Home} />
    <Route default={true} page={NotFound} />
  </Router>
);
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
