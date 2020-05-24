import React from 'react';

export const useInitialization = (effect: React.EffectCallback): boolean => {
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);
  React.useEffect((): (void | (() => void | undefined)) => {
    const returnValue = effect();
    setIsInitialized(true);
    return returnValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isInitialized;
};
