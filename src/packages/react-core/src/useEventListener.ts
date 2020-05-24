import React from 'react';

export const useEventListener = (element: HTMLElement | Document | Window | null, eventName: string, handler: (event: Event) => void): void => {
  const savedHandler = React.useRef<(event: Event) => void>(handler);

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (!element) {
      return;
    }
    const eventListener = (event: Event): void => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return (): void => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
