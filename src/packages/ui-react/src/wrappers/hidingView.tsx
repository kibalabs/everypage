import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from './wrapperProps';

export interface IHidingViewProps extends IWrapperProps {
  isHidden?: boolean;
}

export const HidingView = (props: IHidingViewProps): React.ReactElement => {
  return (
    <StyledHidingView
      className={getClassName(HidingView.displayName, props.className)}
      isHidden={props.isHidden}
    >
      {props.children}
    </StyledHidingView>
  );
};

HidingView.defaultProps = {
  ...defaultWrapperProps,
};
HidingView.displayName = 'hiding-view';

interface IStyledHidingViewProps extends IWrapperProps {
  isHidden?: boolean;
}

const withHidingView = (Component: React.ComponentType<IStyledHidingViewProps>): React.ComponentType => styled(Component)<IStyledHidingViewProps>`
  ${(props: IStyledHidingViewProps): string => props.isHidden ? `display: none !important;` : ''};
`;

const StyledHidingView = withHidingView((props: IStyledHidingViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});
