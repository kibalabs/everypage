import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import { EveryviewTracker } from '@kibalabs/everyview-tracker';

import { IWebsitePlugin } from '../model';

export interface IEveryviewAnalyticsProp extends IWebsitePlugin {
  applicationId?: string;
}

export const EveryviewAnalytics = (props: IEveryviewAnalyticsProp): null => {
  useInitialization((): void => {
    if (!props.applicationId) {
      console.error('applicationId should be provided to EveryviewAnalytics');
      return;
    }
    const tracker = new EveryviewTracker(props.applicationId);
    tracker.trackApplicationOpen();
  });

  return null;
};

EveryviewAnalytics.defaultProps = {
};
