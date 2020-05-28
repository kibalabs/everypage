import React from 'react';

import { useInitialization } from './useInitialization';

export const useInterval = (delaySeconds: number, callback: () => void): void => {
  const savedCallback = React.useRef<() => void>(callback);

  React.useEffect((): void => {
    savedCallback.current = callback;
  }, [callback]);

  useInitialization((): (() => void) => {
    const intervalId = setInterval((): void => {
      savedCallback.current();
    }, delaySeconds * 1000);

    return (): void => clearInterval(intervalId);
  });
};
