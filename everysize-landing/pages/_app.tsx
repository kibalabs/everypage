import React from 'react';
// import App from 'next/app'

export const MyApp = ({ Component, pageProps }): React.ReactElement => {
  return <Component {...pageProps} />
}

export default MyApp;
