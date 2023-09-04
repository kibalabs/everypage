import React from 'react';

import { createRoot, hydrateRoot } from 'react-dom/client';

import { App } from './App';

const renderedPath = window.KIBA_RENDERED_PATH;
const pageData = window.KIBA_PAGE_DATA;

if (typeof document !== 'undefined') {
  const target = document.getElementById('root') as HTMLDivElement;
  if (target.hasChildNodes() && window.location.pathname === renderedPath) {
    hydrateRoot(target, <React.StrictMode><App pageData={pageData} /></React.StrictMode>);
  } else {
    createRoot(target).render(<React.StrictMode><App pageData={pageData} /></React.StrictMode>);
  }
}
