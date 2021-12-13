import { useInitialization } from '@kibalabs/core-react';

import { IWebsitePlugin } from '../model';

export interface IGoogleAnalyticsProp extends IWebsitePlugin {
  trackingId?: string;
}

export const GoogleAnalytics = (props: IGoogleAnalyticsProp): null => {
  useInitialization((): void => {
    const analyticsScript = document.createElement('script');
    analyticsScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${props.trackingId});
    `;
    document.body.appendChild(analyticsScript);
  });

  return null;
};

GoogleAnalytics.defaultProps = {
};
