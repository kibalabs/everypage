import { useInitialization } from '@kibalabs/core-react';

import { IWebsitePlugin } from '../model';

export interface ITawkToChatProps extends IWebsitePlugin {
  accountId?: string;
  widgetId?: string;
}

export const TawkToChat = (props: ITawkToChatProps): null => {
  useInitialization((): void => {
    if (!props.accountId || !props.widgetId) {
      console.error('accountId and widgetId should be provided to TawkToChat');
      return;
    }

    if (!document) {
      console.warn('Could not set up TawkToChat since document is not set.');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${props.accountId}/${props.widgetId}`;
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);
  });

  return null;
};

TawkToChat.defaultProps = {
  widgetId: 'default',
};
