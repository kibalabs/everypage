import React from 'react';

import { useInitialization } from '@kibalabs/core-react';

import { IWebsitePlugin } from '../model';

declare global {
  interface Window {
    panelbear: (...args: unknown[]) => void;
    panelbearQ: unknown[];
  }
}

export interface IPanelbearAnalyticsProps extends IWebsitePlugin {
  siteId?: string;
}

export const PanelbearAnalytics = (props: IPanelbearAnalyticsProps): null => {
  useInitialization((): void => {
    if (!props.siteId) {
      console.error('siteId should be provided to PanelbearAnalytics');
      return;
    }

    if (!window || !document) {
      console.warn('Could not set up PanelbearAnalytics since document is not set.');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://cdn.panelbear.com/analytics.js?site=${props.siteId}`;
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);
    window.setTimeout((): void => {
      window.panelbear = window.panelbear || function panelbear(...args: unknown[]): void {
        window.panelbearQ = window.panelbearQ || [];
        window.panelbearQ.push(args);
      };
      // NOTE(krishan711): not sure why honorDNT is needed.
      window.panelbear('config', { site: props.siteId, honorDNT: false });
    }, 300);
  });

  return null;
};

PanelbearAnalytics.defaultProps = {
};
