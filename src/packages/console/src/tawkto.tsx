import React from 'react';
import { useInitialization } from '@kibalabs/core-react';

export interface ITawkToProps {
  accountId: string;
  widgetId: string;
}

export const TawkTo = (props: ITawkToProps): React.ReactElement => {
  if (!props.accountId || !props.widgetId) {
    return null;
  }

   useInitialization((): void => {
    if (window) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${props.accountId}/${props.widgetId}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
    }
  });

  return null;
};

TawkTo.defaultProps = {
  widgetId: 'default',
}
