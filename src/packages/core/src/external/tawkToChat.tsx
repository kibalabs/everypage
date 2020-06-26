import React from 'react';
import { useInitialization } from '@kibalabs/core-react';
import { IWebsitePlugin } from '../model';

export interface ITawkToChatProps extends IWebsitePlugin {
  accountId?: string;
  widgetId?: string;
}

export const TawkToChat = (props: ITawkToChatProps): React.ReactElement => {
  if (!props.accountId || !props.widgetId) {
    console.error('accountId and widgetId should be provided to EveryviewAnalytics')
    return null;
  }

   useInitialization((): void => {
    if (document) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${props.accountId}/${props.widgetId}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
    } else {
      console.log('Could not set up CrispChat since document is not set.')
    }
  });

  return null;
};

TawkToChat.defaultProps = {
  widgetId: 'default',
}
