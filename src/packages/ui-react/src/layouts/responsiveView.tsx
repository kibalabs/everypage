import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { useDimensions } from '..';
import { IDimensionGuide } from '../subatoms/dimensions';


interface IStyledResponsiveViewProps {
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  show?: boolean;
  showSmall?: boolean;
  showMedium?: boolean;
  showLarge?: boolean;
  showExtraLarge?: boolean;
  screenWidthSmall: string;
  screenWidthMedium: string;
  screenWidthLarge: string;
  screenWidthExtraLarge: string;
}

const StyledResponsiveView = styled.div<IStyledResponsiveViewProps>`
  height: ${(props: IStyledResponsiveViewProps): string => (props.isFullHeight ? '100%' : 'auto')};
  width: ${(props: IStyledResponsiveViewProps): string => (props.isFullWidth ? '100%' : 'auto')};
  ${(props: IStyledResponsiveViewProps): string => (props.show === undefined ? '' : props.show ? 'display: initial' : 'display: none')};

  @media (min-width: ${(props: IStyledResponsiveViewProps): string => (props.screenWidthSmall)}) {
    ${(props: IStyledResponsiveViewProps): string => (props.showSmall === undefined ? '' : props.showSmall ? 'display: initial' : 'display: none')};
  }

  @media (min-width: ${(props: IStyledResponsiveViewProps): string => (props.screenWidthMedium)}) {
    ${(props: IStyledResponsiveViewProps): string => (props.showMedium === undefined ? '' : props.showMedium ? 'display: initial' : 'display: none')};
  }

  @media (min-width: ${(props: IStyledResponsiveViewProps): string => (props.screenWidthLarge)}) {
    ${(props: IStyledResponsiveViewProps): string => (props.showLarge === undefined ? '' : props.showLarge ? 'display: initial' : 'display: none')};
  }

  @media (min-width: ${(props: IStyledResponsiveViewProps): string => (props.screenWidthExtraLarge)}) {
    ${(props: IStyledResponsiveViewProps): string => (props.showExtraLarge === undefined ? '' : props.showExtraLarge ? 'display: initial' : 'display: none')};
  }
`;

export interface IResponsiveViewProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  show?: boolean;
  showSmall?: boolean;
  showMedium?: boolean;
  showLarge?: boolean;
  showExtraLarge?: boolean;
}

export const ResponsiveView = (props: IResponsiveViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledResponsiveView
      id={props.id}
      className={getClassName('responsive-view', props.className)}
      isFullHeight={props.isFullHeight}
      isFullWidth={props.isFullWidth}
      screenWidthSmall={theme.screenWidthSmall}
      screenWidthMedium={theme.screenWidthMedium}
      screenWidthLarge={theme.screenWidthLarge}
      screenWidthExtraLarge={theme.screenWidthExtraLarge}
      show={props.show}
      showSmall={props.showSmall}
      showMedium={props.showMedium}
      showLarge={props.showLarge}
      showExtraLarge={props.showExtraLarge}
    >
      {props.children}
    </StyledResponsiveView>
  );
};

ResponsiveView.defaultProps = {
  className: '',
};
