import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReportChunks } from 'react-universal-component';
import { ChildCapture, HeadRootProvider } from '@kibalabs/everypage-core';

import App from './pages/app';

export const render = (): any => {
  const chunkNames: string[] = []
  const headElements = [];
  const bodyString = ReactDOMServer.renderToString(
    <ReportChunks report={(chunkName: string) => chunkNames.push(chunkName)}>
      <HeadRootProvider root={<ChildCapture headElements={headElements}/>}>
        <App />
      </HeadRootProvider>
    </ReportChunks>
  );
  console.log('headElements', headElements);
  return {bodyString, chunkNames};
};
