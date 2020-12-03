import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './pages/app';

export const render = (): string => {
  return ReactDOMServer.renderToString(<App />);
};
