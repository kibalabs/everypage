import React from 'react';
import { useInitialization } from '@kibalabs/core-react';
import { IWebsitePlugin } from '../model';

// Needs to be optional because the plugin renderer can't guarantee the props
export interface ICrispChatProps extends IWebsitePlugin {
  websiteId?: string;
}

export const CrispChat = (props: ICrispChatProps): React.ReactElement => {
  if (!props.websiteId) {
    console.error('websiteId should be provided to EveryviewAnalytics')
    return null;
  }

  useInitialization((): void => {
    if (window && document) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = props.websiteId;

      const script = document.createElement('script');
      script.src = `https://client.crisp.chat/l.js`;
      script.async = true;
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
    } else {
      console.log('Could not set up CrispChat since window or document is not set.')
    }
  });

  return null;
};

CrispChat.defaultProps = {
}
