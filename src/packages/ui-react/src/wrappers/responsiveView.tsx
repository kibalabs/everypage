import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from './wrapperProps';
import { useDimensions } from '..';
import { IDimensionGuide, ScreenSize, getScreenSize } from '../subatoms/dimensions';

export interface IResponsiveViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  hiddenAbove?: ScreenSize;
  hiddenBelow?: ScreenSize;
}

export const ResponsiveView = (props: IResponsiveViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledResponsiveView
      className={getClassName(ResponsiveView.displayName, props.className)}
      hiddenAboveSize={props.hiddenAbove && getScreenSize(props.hiddenAbove, theme)}
      hiddenBelowSize={props.hiddenBelow && getScreenSize(props.hiddenBelow, theme)}
    >
      {props.children}
    </StyledResponsiveView>
  );
};

ResponsiveView.defaultProps = {
  ...defaultWrapperProps,
};
ResponsiveView.displayName = 'responsive-view';

interface IStyledResponsiveViewProps extends IWrapperProps {
  hiddenAboveSize?: string;
  hiddenBelowSize?: string;
}

const withResponsiveView = (Component: React.ComponentType<IStyledResponsiveViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveViewProps>`
  ${(props: IStyledResponsiveViewProps): string => props.hiddenBelowSize ? `@media (max-width: ${props.hiddenBelowSize}) {display: none !important;}` : ''};
  ${(props: IStyledResponsiveViewProps): string => props.hiddenAboveSize ? `@media (min-width: ${props.hiddenAboveSize}) {display: none !important;}` : ''};
`;

const StyledResponsiveView = withResponsiveView((props: IStyledResponsiveViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});
