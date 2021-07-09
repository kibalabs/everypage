import React from 'react';

import ReactDOM from 'react-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';

import { App } from './App';

const HotApp = hot(App);

ReactDOM.render(
  <React.StrictMode>
    <HotApp />
  </React.StrictMode>,
  document.getElementById('root'),
);
