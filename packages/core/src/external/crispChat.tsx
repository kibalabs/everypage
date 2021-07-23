import { useInitialization } from '@kibalabs/core-react';

import { IWebsitePlugin } from '../model';

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

// Needs to be optional because the plugin renderer can't guarantee the props
export interface ICrispChatProps extends IWebsitePlugin {
  websiteId?: string;
}

export const CrispChat = (props: ICrispChatProps): null => {
  useInitialization((): void => {
    if (!props.websiteId) {
      console.error('websiteId should be provided to CrispChat');
      return;
    }

    if (!window || !document) {
      console.warn('Could not set up CrispChat since window or document is not set.');
      return;
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = props.websiteId;

    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);
  });

  return null;
};

CrispChat.defaultProps = {
};
