import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

export interface IHidingViewProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  isHidden?: boolean;
}

export const HidingView = (props: IHidingViewProps): React.ReactElement => {
  return (
    <StyledHidingView
      id={props.id}
      className={getClassName(HidingView.displayName, props.className)}
      isHidden={props.isHidden}
    >
      {props.children}
    </StyledHidingView>
  );
};

HidingView.defaultProps = {
  className: '',
};
HidingView.displayName = 'hiding-view';

interface IStyledHidingViewProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  isHidden?: boolean;
}

const withHidingView = (Component: React.ComponentType<IStyledHidingViewProps>): React.ComponentType => styled(Component)<IStyledHidingViewProps>`
  ${(props: IStyledHidingViewProps): string => props.isHidden ? `display: none !important;` : ''};
`;

const StyledHidingView = withHidingView((props: IStyledHidingViewProps): React.ReactElement => {
  return React.cloneElement(props.children || <div />, { className: props.className });
});
