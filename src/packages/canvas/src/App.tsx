import React from 'react';
import { Helmet } from 'react-helmet';
import { ErrorBoundary } from '@kibalabs/core-react';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { CanvasPage } from './canvasPage';


export const App = (): React.ReactElement => {
  return (
    <ErrorBoundary>
      <GlobalCss resetCss={resetCss} />
      <Helmet>
        <title>Everypage Canvas</title>
      </Helmet>
      <CanvasPage />
    </ErrorBoundary>
  );
}
