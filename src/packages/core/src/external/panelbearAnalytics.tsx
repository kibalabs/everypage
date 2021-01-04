import React from 'react';

import { useInitialization } from '@kibalabs/core-react';

import { IWebsitePlugin } from '../model';

export interface IPanelbearAnalyticsProps extends IWebsitePlugin {
  siteId?: string;
}

export const PanelbearAnalytics = (props: IPanelbearAnalyticsProps): React.ReactElement => {
  if (!props.siteId) {
    console.error('siteId should be provided to PanelbearAnalytics');
    return null;
  }

  useInitialization((): void => {
    if (document) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://cdn.panelbear.com/analytics.js?site=${props.siteId}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
      setTimeout((): void => {
        window.panelbear = window.panelbear || function () {
          window.panelbearQ = window.panelbearQ || [];
          panelbearQ.push(arguments);
        };
        // NOTE(krishan711): not sure why honorDNT is needed.
        window.panelbear('config', { site: props.siteId, honorDNT: false });
      }, 300);
    } else {
      console.warn('Could not set up PanelbearAnalytics since document is not set.');
    }
  });

  return null;
};

PanelbearAnalytics.defaultProps = {
};
