import React from 'react';
import { useInitialization } from '@kibalabs/core-react';
import { IWebsitePlugin } from '../model';

// Needs to be optional because the plugin renderer can't guarantee the props
export interface IPandaXProps extends IWebsitePlugin {
  pixelId?: string;
}

export const PandaX = (props: IPandaXProps): React.ReactElement => {
  if (!props.pixelId) {
    console.error('pixelId should be provided to EveryviewAnalytics')
    return null;
  }

  useInitialization((): void => {
    if (window && document) {
      const script = document.createElement('script');
      script.src = `http://app.usepanda.io/pixel/${props.pixelId}`;
      script.async = true;
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
    } else {
      console.warn('Could not set up PandaX since window or document is not set.')
    }
  });

  return null;
};

PandaX.defaultProps = {
}
