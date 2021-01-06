import React from 'react';

import ReactDOM from 'react-dom';

import { IMultiAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';

export const HeadRootContext = React.createContext<HTMLElement | null>(null);

interface IHeadRootProviderProps extends ISingleAnyChildProps {
  root: HTMLElement;
}

export const HeadRootProvider = (props: IHeadRootProviderProps): React.ReactElement => {
  return (
    <HeadRootContext.Provider value={props.root}>
      {props.children}
    </HeadRootContext.Provider>
  );
};

export function useHeadRoot(): HTMLElement | null {
  const headRoot = React.useContext(HeadRootContext);
  // if (!headRoot) {
  //   throw Error('No headRoot has been set!');
  // }
  return headRoot;
}

interface IHeadProps extends IMultiAnyChildProps {
}

export const Head = (props: IHeadProps): React.ReactElement | null => {
  const headRoot = useHeadRoot();
  if (!headRoot) {
    return null;
  }
  if (React.isValidElement(headRoot)) {
    return React.cloneElement(headRoot, {}, props.children);
  }
  return ReactDOM.createPortal(props.children, headRoot);
};

interface IChildCaptureProps extends IMultiAnyChildProps {
  headElements: HTMLElement[];
}

export const ChildCapture = (props: IChildCaptureProps): React.ReactElement | null => {
  if (props.children) {
    props.headElements.push(props.children as HTMLElement);
  }
  return null;
};
