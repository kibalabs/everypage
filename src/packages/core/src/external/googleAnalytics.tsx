import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import ReactGA from 'react-ga';

import { IWebsitePlugin } from '../model';

export interface IGoogleAnalyticsProp extends IWebsitePlugin {
  trackingId?: string;
}

export const GoogleAnalytics = (props: IGoogleAnalyticsProp): React.ReactElement => {
  if (!props.trackingId) {
    console.error('trackingId should be provided to GoogleAnalytics');
    return null;
  }

  useInitialization((): void => {
    ReactGA.initialize(props.trackingId);
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return null;
};

GoogleAnalytics.defaultProps = {
};
