import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { IndexPage } from '@kibalabs/everypage';

export const Root = (): React.ReactElement => {
  return (
    <React.Suspense fallback={<div>loading...</div>}><IndexPage /></React.Suspense>
  );
};
export default Root;


// For react-static
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')
  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
  const render = (Component: Function) => {
    renderMethod(<AppContainer><Component /></AppContainer>, target);
  };
  render(Root)
  if (module && module.hot) {
    module.hot.accept('@kibalabs/everypage', () => render(Root));
  }
}
