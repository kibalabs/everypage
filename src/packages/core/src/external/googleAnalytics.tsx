import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactGA from 'react-ga';

import { IWebsitePlugin } from '../model';

export interface IGoogleAnalyticsProp extends IWebsitePlugin {
  trackingId?: string;
}

export const GoogleAnalytics = (props: IGoogleAnalyticsProp): React.ReactElement => {
  useInitialization((): void => {
    if (!props.trackingId) {
      console.error('trackingId should be provided to GoogleAnalytics');
      return;
    }
    ReactGA.initialize(props.trackingId);
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return null;
};

GoogleAnalytics.defaultProps = {
};
