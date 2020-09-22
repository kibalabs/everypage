import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from './wrapperProps';
import { useDimensions } from '..';
import { IDimensionGuide } from '../subatoms';
import { getGridItemSizeCss } from '../util';

interface IStyledResponsiveContainingViewProps extends IWrapperProps {
  theme: IDimensionGuide;
  size?: number;
  sizeSmall?: number;
  sizeMedium?: number;
  sizeLarge?: number;
  sizeExtraLarge?: number;
  isFullWidth: boolean;
  shouldIncludeMaxSize: boolean;
}

export const getGridItemMediaCss = (totalColumnCount: number, columnCount: number, screenWidth: string, screenWidthMax?: string): string => {
  return `@media (min-width: ${screenWidth}) {
    max-width: ${getGridItemSizeCss(totalColumnCount, '0px', columnCount, screenWidthMax)} !important;
  }`;
}

const columnCountsToCss = (totalColumnCount: number, screenWidthSmall: string, screenWidthMedium: string, screenWidthLarge: string, screenWidthExtraLarge: string, screenWidthMax: string, columnCountNormal: number, columnCountSmall: number, columnCountMedium: number, columnCountLarge: number, columnCountExtraLarge: number, shouldIncludeMaxSize: boolean): string => {
  const output = [];
  if (columnCountNormal !== undefined) {
    output.push(`max-width: ${getGridItemSizeCss(totalColumnCount, '0px', columnCountNormal)};`);
  }
  if (columnCountSmall !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, columnCountSmall, screenWidthSmall));
  }
  if (columnCountMedium !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, columnCountMedium, screenWidthMedium));
  }
  if (columnCountLarge !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, columnCountLarge, screenWidthLarge));
  }
  if (columnCountExtraLarge !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, columnCountExtraLarge, screenWidthExtraLarge));
  }
  if (shouldIncludeMaxSize) {
    const largestColumnCount = columnCountExtraLarge || columnCountLarge || columnCountMedium || columnCountSmall || columnCountNormal;
    output.push(getGridItemMediaCss(totalColumnCount, largestColumnCount, screenWidthMax, screenWidthMax));
  }
  return output.join('\n');
};

const withResponsiveContainingView = (Component: React.ComponentType<IStyledResponsiveContainingViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveContainingViewProps>`
  width: ${(props: IStyledResponsiveContainingViewProps): string => (props.isFullWidth ? '100%' : 'auto')};
  max-width: 100%;
  ${(props: IStyledResponsiveContainingViewProps): string => columnCountsToCss(props.theme.columnCount, props.theme.screenWidthSmall, props.theme.screenWidthMedium, props.theme.screenWidthLarge, props.theme.screenWidthExtraLarge, props.theme.screenWidthMax, props.size, props.sizeSmall, props.sizeMedium, props.sizeLarge, props.sizeExtraLarge, props.shouldIncludeMaxSize)};
  /* &.centered {
    margin-right: auto;
    margin-left: auto;
  } */
`;

const StyledResponsiveContainingView = withResponsiveContainingView((props: IStyledResponsiveContainingViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});

export interface IResponsiveContainingViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  size?: number;
  sizeSmall?: number;
  sizeMedium?: number;
  sizeLarge?: number;
  sizeExtraLarge?: number;
  isFullWidth?: boolean;
  shouldIncludeMaxSize: boolean;
}

export const ResponsiveContainingView = (props: IResponsiveContainingViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledResponsiveContainingView
      className={getClassName(ResponsiveContainingView.displayName, props.className)}
      theme={theme}
      size={props.size}
      sizeSmall={props.sizeSmall}
      sizeMedium={props.sizeMedium}
      sizeLarge={props.sizeLarge}
      sizeExtraLarge={props.sizeExtraLarge}
      isFullWidth={props.isFullWidth}
      shouldIncludeMaxSize={props.shouldIncludeMaxSize}
    >
      {props.children}
    </StyledResponsiveContainingView>
  );
};

ResponsiveContainingView.defaultProps = {
  ...defaultWrapperProps,
  shouldIncludeMaxSize: true,
  isFullWidth: true,
};
ResponsiveContainingView.displayName = 'responsive-containing-view';
