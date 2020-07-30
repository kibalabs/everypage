import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps, ISingleAnyChildProps, flattenChildren } from '@kibalabs/core-react';

import { Direction, Alignment, getFlexItemAlignment, getFlexContentAlignment, IDimensionGuide, PaddingSize, Spacing } from '..';
import { PaddingView, IPaddingViewPaddingProps } from '../wrappers/paddingView';
import { useDimensions } from '../theming';

// NOTE(krish): if the child of the stack.item declares 100% height (on vertical stack) it doesn't work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)
// NOTE(krish): behavior of the above is also different on IE11, be careful!

const getContentAlignmentCss = (alignment: Alignment): string => {
  return `justify-content: ${getFlexContentAlignment(alignment)};`;
}

const getResponsiveCss = (screenWidth: string, css: string): string => {
  return `@media (min-width: ${screenWidth}) { ${css} }`;
}

const getResponsiveContentAlignmentCss = (screenWidth: string, alignment?: Alignment): string => {
  return alignment ? getResponsiveCss(screenWidth, getContentAlignmentCss(alignment)) : '';
}

export interface IStackItemProps extends ISingleAnyChildProps {
  className: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  isHidden: boolean;
  alignment?: Alignment;
  gutterSizeBefore?: PaddingSize,
  gutterSizeAfter?: PaddingSize,
}

class StackItem extends React.Component<IStackItemProps> {
  static displayName = 'Stack.Item';
  static defaultProps = {
    className: '',
    growthFactor: 0,
    shrinkFactor: 0,
    // NOTE(krish): see note above
    baseSize: 'auto',
    isHidden: false,
  };
}

interface IStyledStackProps {
  theme: IDimensionGuide;
  $direction: string;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  contentAlignmentSmall?: Alignment;
  contentAlignmentMedium?: Alignment;
  contentAlignmentLarge?: Alignment;
  contentAlignmentExtraLarge?: Alignment;
  isFullWidth: boolean;
  isFullHeight: boolean;
}

const StyledStack = styled.div<IStyledStackProps>`
  display: flex;
  flex-direction: ${(props: IStyledStackProps): string => (props.$direction === Direction.Vertical ? 'column' : 'row')};
  width: ${(props: IStyledStackProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledStackProps): string => (props.isFullHeight ? '100%' : 'auto')};
  align-items: ${(props: IStyledStackProps): string => getFlexItemAlignment(props.childAlignment)};
  ${(props: IStyledStackProps): string => getContentAlignmentCss(props.contentAlignment)};
  ${(props: IStyledStackProps): string => getResponsiveContentAlignmentCss(props.theme.screenWidthSmall, props.contentAlignmentSmall)};
  ${(props: IStyledStackProps): string => getResponsiveContentAlignmentCss(props.theme.screenWidthMedium, props.contentAlignmentMedium)};
  ${(props: IStyledStackProps): string => getResponsiveContentAlignmentCss(props.theme.screenWidthLarge, props.contentAlignmentLarge)};
  ${(props: IStyledStackProps): string => getResponsiveContentAlignmentCss(props.theme.screenWidthExtraLarge, props.contentAlignmentExtraLarge)};
`;

interface IStackProps extends IMultiAnyChildProps, IPaddingViewPaddingProps {
  id?: string;
  className: string;
  theme?: IDimensionGuide;
  direction: Direction;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  contentAlignmentSmall?: Alignment;
  contentAlignmentMedium?: Alignment;
  contentAlignmentLarge?: Alignment;
  contentAlignmentExtraLarge?: Alignment;
  shouldAddGutters: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
  paddingStart?: PaddingSize,
  paddingEnd?: PaddingSize,
}

export const Stack = (props: IStackProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  const children = flattenChildren(props.children).map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
    child.type !== StackItem ? <StackItem key={index}>{ child }</StackItem> : child
  ));
  const paddingTop = (props.paddingStart && props.direction == Direction.Vertical) ? props.paddingStart : undefined;
  const paddingBottom = (props.paddingEnd && props.direction == Direction.Vertical) ? props.paddingEnd : undefined;
  const paddingRight = (props.paddingStart && props.direction == Direction.Horizontal) ? props.paddingStart : undefined;
  const paddingLeft = (props.paddingEnd && props.direction == Direction.Horizontal) ? props.paddingEnd : undefined;
  return (
    <PaddingView paddingTop={paddingTop} paddingBottom={paddingBottom} paddingRight={paddingRight} paddingLeft={paddingLeft} {...props as IPaddingViewPaddingProps}>
      <StyledStack
        id={props.id}
        className={getClassName(Stack.displayName, props.className)}
        theme={theme}
        $direction={props.direction}
        childAlignment={props.childAlignment}
        contentAlignment={props.contentAlignment}
        contentAlignmentSmall={props.contentAlignmentSmall}
        contentAlignmentMedium={props.contentAlignmentMedium}
        contentAlignmentLarge={props.contentAlignmentLarge}
        contentAlignmentExtraLarge={props.contentAlignmentExtraLarge}
        isFullWidth={props.isFullWidth}
        isFullHeight={props.isFullHeight}
      >
        { children.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
          <React.Fragment key={index}>
            {(child.props.gutterSizeBefore) && <Spacing className='stack-gutter' mode={child.props.gutterSizeBefore}/>}
            <StyledStackItem
              className={getClassName(StyledStackItem.displayName, child.props.isHidden && 'isHidden')}
              growthFactor={child.props.growthFactor}
              shrinkFactor={child.props.shrinkFactor}
              baseSize={child.props.baseSize}
              alignment={child.props.alignment}
            >
              {child.props.children}
            </StyledStackItem>
            {(child.props.gutterSizeAfter || (props.shouldAddGutters && index < children.length - 1)) && <Spacing className='stack-gutter' mode={child.props.gutterSizeAfter || PaddingSize.Default}/>}
          </React.Fragment>
        ))}
      </StyledStack>
    </PaddingView>
  );
};

Stack.defaultProps = {
  className: '',
  direction: Direction.Vertical,
  childAlignment: Alignment.Fill,
  contentAlignment: Alignment.Fill,
  shouldAddGutters: false,
  isFullWidth: false,
  isFullHeight: false,
};
Stack.displayName = 'stack';
Stack.Item = StackItem;

interface IStyledStackItemProps extends ISingleAnyChildProps {
  className: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  alignment?: Alignment;
}

const withStackItem = (Component: React.ComponentType<IStyledStackItemProps>): React.ComponentType => styled(Component)<IStyledStackItemProps>`
  flex-basis: ${(props: IStyledStackItemProps): string => props.baseSize};
  flex-grow: ${(props: IStyledStackItemProps): number => props.growthFactor};
  flex-shrink: ${(props: IStyledStackItemProps): number => props.shrinkFactor};
  min-width: ${(props: IStyledStackItemProps): string => props.shrinkFactor ? '0' : 'none'};
  align-self: ${(props: IStyledStackItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
  /* Fix for https://github.com/philipwalton/flexbugs#flexbug-2 */
  max-width: 100%;
  &.isHidden {
    display: none;
  }
`;

const StyledStackItem = withStackItem((props: IStyledStackItemProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});
StyledStackItem.displayName = 'stack-item';
