import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from './wrapperProps';
import { PaddingSize, getPaddingSize, IDimensionGuide } from '../subatoms/dimensions';
import { useDimensions } from '../theming';

export interface IPaddingViewPaddingProps {
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingHorizontal?: string;
  paddingVertical?: string;
  padding?: string;
}

export interface IPaddingViewProps extends IWrapperProps, IPaddingViewPaddingProps {
  theme?: IDimensionGuide;
}

export const PaddingView = (props: IPaddingViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  const paddingTop = props.paddingTop || props.paddingVertical || props.padding;
  const paddingBottom = props.paddingBottom || props.paddingVertical || props.padding;
  const paddingRight = props.paddingRight || props.paddingHorizontal || props.padding;
  const paddingLeft = props.paddingLeft || props.paddingHorizontal || props.padding;
  return (
    <StyledPaddingView
      className={getClassName(PaddingView.displayName, props.className)}
      theme={theme}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
    >
      {props.children}
    </StyledPaddingView>
  );
};

PaddingView.defaultProps = {
  ...defaultWrapperProps,
};
PaddingView.displayName = 'padding-view';

interface IStyledPaddingViewProps extends IWrapperProps {
  theme: IDimensionGuide;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
}

const withPaddingView = (Component: React.ComponentType<IStyledPaddingViewProps>): React.ComponentType => styled(Component)<IStyledPaddingViewProps>`
  ${(props: IStyledPaddingViewProps): string => props.paddingTop ? `padding-top: ${getPaddingSize(props.paddingTop, props.theme)}` : ''};
  ${(props: IStyledPaddingViewProps): string => props.paddingBottom ? `padding-bottom: ${getPaddingSize(props.paddingBottom, props.theme)}` : ''};
  ${(props: IStyledPaddingViewProps): string => props.paddingLeft ? `padding-left: ${getPaddingSize(props.paddingLeft, props.theme)}` : ''};
  ${(props: IStyledPaddingViewProps): string => props.paddingRight ? `padding-right: ${getPaddingSize(props.paddingRight, props.theme)}` : ''};
`;

const StyledPaddingView = withPaddingView((props: IStyledPaddingViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});
