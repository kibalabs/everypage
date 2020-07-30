import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from './wrapperProps';
import { TextAlignment, IDimensionGuide } from '../subatoms';
import { useDimensions } from '../theming';

const getAlignmentCss = (alignment: TextAlignment): string => {
  return `text-align: ${alignment};`;
}

const getResponsiveCss = (screenWidth: string, css: string): string => {
  return `@media (min-width: ${screenWidth}) { ${css} }`;
}

const getResponsiveAlignmentCss = (screenWidth: string, alignment?: TextAlignment): string => {
  return alignment ? getResponsiveCss(screenWidth, getAlignmentCss(alignment)) : '';
}

interface IStyledResponsiveTextAlignmentViewProps extends IWrapperProps {
  theme: IDimensionGuide;
  alignment: TextAlignment;
  alignmentSmall?: TextAlignment;
  alignmentMedium?: TextAlignment;
  alignmentLarge?: TextAlignment;
  alignmentExtraLarge?: TextAlignment;
}

const withResponsiveTextAlignmentView = (Component: React.ComponentType<IStyledResponsiveTextAlignmentViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveTextAlignmentViewProps>`
  ${(props: IStyledResponsiveTextAlignmentViewProps): string => getAlignmentCss(props.alignment)};
  ${(props: IStyledResponsiveTextAlignmentViewProps): string => getResponsiveAlignmentCss(props.theme.screenWidthSmall, props.alignmentSmall)};
  ${(props: IStyledResponsiveTextAlignmentViewProps): string => getResponsiveAlignmentCss(props.theme.screenWidthMedium, props.alignmentMedium)};
  ${(props: IStyledResponsiveTextAlignmentViewProps): string => getResponsiveAlignmentCss(props.theme.screenWidthLarge, props.alignmentLarge)};
  ${(props: IStyledResponsiveTextAlignmentViewProps): string => getResponsiveAlignmentCss(props.theme.screenWidthExtraLarge, props.alignmentExtraLarge)};
`;

const StyledResponsiveTextAlignmentView = withResponsiveTextAlignmentView((props: IStyledResponsiveTextAlignmentViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});

export interface IResponsiveTextAlignmentViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  alignment: TextAlignment;
  alignmentSmall?: TextAlignment;
  alignmentMedium?: TextAlignment;
  alignmentLarge?: TextAlignment;
  alignmentExtraLarge?: TextAlignment;
}

export const ResponsiveTextAlignmentView = (props: IResponsiveTextAlignmentViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledResponsiveTextAlignmentView
      className={getClassName(ResponsiveTextAlignmentView.displayName, props.className)}
      theme={theme}
      alignment={props.alignment}
      alignmentSmall={props.alignmentSmall}
      alignmentMedium={props.alignmentMedium}
      alignmentLarge={props.alignmentLarge}
      alignmentExtraLarge={props.alignmentExtraLarge}
    >
      {props.children}
    </StyledResponsiveTextAlignmentView>
  );
};

ResponsiveTextAlignmentView.defaultProps = {
  ...defaultWrapperProps,
  alignment: TextAlignment.Start,
};
ResponsiveTextAlignmentView.displayName = 'text-alignment-view';
