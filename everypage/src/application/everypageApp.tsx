import React from 'react';
// import App from 'next/app';

export const EverypageApp = ({Component, pageProps}): React.ReactElement => {
  return <Component {...pageProps} />
}

export default EverypageApp;
