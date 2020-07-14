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
}

export const getGridItemMediaCss = (totalColumnCount: number, gutterSize: string, columnCount: number, screenWidth: string, shouldHideIfNone?: boolean): string => {
  // TODO(krish): it should be unset below but ie11 doesn't like this. find a nicer way!
  return `@media (min-width: ${screenWidth}) {
    max-width: ${getGridItemSizeCss(totalColumnCount, gutterSize, columnCount)};
    ${shouldHideIfNone ? (columnCount === 0 ? 'display: none' : 'display: block') : ''};
  }`
}

const columnCountsToCss = (totalColumnCount: number, gutterSize: string, screenWidthSmall: string, screenWidthMedium: string, screenWidthLarge: string, screenWidthExtraLarge: string, columnCountNormal?: number, columnCountSmall?: number, columnCountMedium?: number, columnCountLarge?: number, columnCountExtraLarge?: number): string => {
  const output = [];
  if (columnCountNormal !== undefined) {
    output.push(`max-width: ${getGridItemSizeCss(totalColumnCount, gutterSize, columnCountNormal)};`);
  }
  if (columnCountSmall !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, gutterSize, columnCountSmall, screenWidthSmall));
  }
  if (columnCountMedium !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, gutterSize, columnCountMedium, screenWidthMedium));
  }
  if (columnCountLarge !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, gutterSize, columnCountLarge, screenWidthLarge));
  }
  if (columnCountExtraLarge !== undefined) {
    output.push(getGridItemMediaCss(totalColumnCount, gutterSize, columnCountExtraLarge, screenWidthExtraLarge));
  }
  return output.join('\n');
};

const withResponsiveContainingView = (Component: React.ComponentType<IStyledResponsiveContainingViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveContainingViewProps>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  ${(props: IStyledResponsiveContainingViewProps): string => columnCountsToCss(props.theme.columnCount, props.theme.gutterSize, props.theme.screenWidthSmall, props.theme.screenWidthMedium, props.theme.screenWidthLarge, props.theme.screenWidthExtraLarge, props.size, props.sizeSmall, props.sizeMedium, props.sizeLarge, props.sizeExtraLarge)};
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
    >
      {props.children}
    </StyledResponsiveContainingView>
  );
};

ResponsiveContainingView.defaultProps = {
  ...defaultWrapperProps,
};
ResponsiveContainingView.displayName = 'responsive-containing-view';
