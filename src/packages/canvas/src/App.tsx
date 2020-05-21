import React from 'react';
import { Helmet } from 'react-helmet';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { CanvasPage } from './canvasPage';


export const App = (): React.ReactElement => {
  return (
    <React.Fragment>
      <GlobalCss resetCss={resetCss} />
      <Helmet>
        <title>Everypage Canvas</title>
      </Helmet>
      <CanvasPage />
    </React.Fragment>
  );
}
