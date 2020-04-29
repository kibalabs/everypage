import React from 'react';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { CanvasPage } from './canvasPage';


export const App = (): React.ReactElement => {
  return (
    <React.Fragment>
      <GlobalCss resetCss={resetCss} />
      <CanvasPage />
    </React.Fragment>
  );
}
