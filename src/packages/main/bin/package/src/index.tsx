import React from 'react';
import ReactDOM from 'react-dom';
import { Root, Routes } from 'react-static';
import { AppContainer } from 'react-hot-loader';

export const App = () => (
  <Root>
    <React.Suspense fallback={<div>loading...</div>}>
      <Routes />
    </React.Suspense>
  </Root>
);
export default App;

// For react-static
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')
  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
  const render = (Component: Function) => {
    renderMethod(<AppContainer><Component /></AppContainer>, target);
  };
  render(App)
  if (module && module.hot) {
    module.hot.accept('@kibalabs/everypage', () => render(App));
  }
}
