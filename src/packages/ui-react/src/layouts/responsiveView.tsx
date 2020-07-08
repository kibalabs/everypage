import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { useDimensions } from '..';
import { IDimensionGuide, ScreenSize, getScreenSize } from '../subatoms/dimensions';

export interface IResponsiveViewProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  hiddenAbove?: ScreenSize;
  hiddenBelow?: ScreenSize;
}

export const ResponsiveView = (props: IResponsiveViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledResponsiveView
      id={props.id}
      className={getClassName(ResponsiveView.displayName, props.className)}
      hiddenAboveSize={props.hiddenAbove && getScreenSize(props.hiddenAbove, theme)}
      hiddenBelowSize={props.hiddenBelow && getScreenSize(props.hiddenBelow, theme)}
    >
      {props.children}
    </StyledResponsiveView>
  );
};

ResponsiveView.defaultProps = {
  className: '',
};
ResponsiveView.displayName = 'responsive-view';

interface IStyledResponsiveViewProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  hiddenAboveSize?: string;
  hiddenBelowSize?: string;
}

const withResponsiveView = (Component: React.ComponentType<IStyledResponsiveViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveViewProps>`
  ${(props: IStyledResponsiveViewProps): string => props.hiddenBelowSize ? `@media (max-width: ${props.hiddenBelowSize}) {display: none !important;}` : ''};
  ${(props: IStyledResponsiveViewProps): string => props.hiddenAboveSize ? `@media (min-width: ${props.hiddenAboveSize}) {display: none !important;}` : ''};
`;

const StyledResponsiveView = withResponsiveView((props: IStyledResponsiveViewProps): React.ReactElement => {
  return React.cloneElement(props.children || <div />, { className: props.className });
});
