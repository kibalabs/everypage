import React from 'react';

import { useEventListener } from './useEventListener';

export const useScrollListener = (element: HTMLElement | Document | Window | null, handler: (event: Event) => void): void => {
  //   const savedHandler = React.useRef<(event: Event) => void>(handler);

//   const onScroll = (): void => {
//     if (node) {
//       window.requestAnimationFrame((): void => {
//         setSize({ width: node.clientWidth, height: node.clientHeight, scrollHeight: node.scrollHeight, scrollWidth: node.scrollWidth });
//       });
//     }
//   };

  useEventListener(element, 'scroll', handler);
}

// // export const useEventListener = (element: HTMLElement | Document | Window, eventName: string, handler: (event: Event) => void): void => {
// //   const savedHandler = React.useRef<(event: Event) => void>(handler);

// //   React.useEffect(() => {
// //     savedHandler.current = handler;
// //   }, [handler]);

// //   React.useEffect(() => {
// //     const eventListener = (event: Event): void => savedHandler.current(event);
// //     element.addEventListener(eventName, eventListener);
// //     return (): void => {
// //       element.removeEventListener(eventName, eventListener);
// //     };
// //   }, [eventName, element]);
// // };

export const useScrollListenerRef = <T extends HTMLElement>(handler: (event: Event) => void): React.RefObject<T> => {
  const scrollingRef = React.useRef<T | null>(null);
  const [hasLaidOut, setHasLaidOut] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    setHasLaidOut(true);
  });

  // const size = useSize(scrollingRef.current);
  // console.log('here', scrollingRef.current);
  // if (scrollingRef.current) {
  //   console.log('creating listener');
    useScrollListener(scrollingRef.current, handler);
  // }

  return scrollingRef;
}
