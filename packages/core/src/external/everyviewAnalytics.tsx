import { useInitialization } from '@kibalabs/core-react';

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

    if (!window) {
      console.warn('Could not set up EveryviewAnalytics since window is not set.');
      return;
    }

    // NOTE(krishan711): figerprintjs references window immediately: https://github.com/fingerprintjs/fingerprintjs/issues/602
    // eslint-disable-next-line import/no-extraneous-dependencies
    import('@kibalabs/everyview-tracker').then((Everyview) => {
      const tracker = new Everyview.EveryviewTracker(props.applicationId || '');
      tracker.initialize().then((): void => {
        tracker.trackApplicationOpen();
      });
    });
  });

  return null;
};

EveryviewAnalytics.defaultProps = {
};
