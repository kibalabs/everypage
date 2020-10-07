import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps, ISingleAnyChildProps, flattenChildren } from '@kibalabs/core-react';

import { Direction, Alignment, getFlexItemAlignment, getFlexContentAlignment, IDimensionGuide, PaddingSize, Spacing } from '..';
import { PaddingView, IPaddingViewPaddingProps } from '../wrappers/paddingView';
import { useDimensions } from '../theming';
import { ResponsiveField, CssConverter, fieldToResponsiveCss } from '../util';

// NOTE(krish): if the child of the stack.item declares 100% height (on vertical stack) it doesn't work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)
// NOTE(krish): behavior of the above is also different on IE11, be careful!

const getContentAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `justify-content: ${getFlexContentAlignment(field)};`;
}

const getChildAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `align-items: ${getFlexItemAlignment(field)};`;
}

const getDirectionCss: CssConverter<Direction> = (field: Direction): string => {
  return `flex-direction: ${field === Direction.Vertical ? 'column' : 'row'};`;
}

export interface IStackItemProps extends ISingleAnyChildProps {
  className: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  isHidden: boolean;
  alignment?: Alignment;
  gutterBefore?: PaddingSize,
  gutterAfter?: PaddingSize,
}

class StackItem extends React.Component<IStackItemProps> {
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
  isFullWidth: boolean;
  isFullHeight: boolean;
  $direction: ResponsiveField<Direction>;
  childAlignment: ResponsiveField<Alignment>;
  contentAlignment: ResponsiveField<Alignment>;
}

const StyledStack = styled.div<IStyledStackProps>`
  display: flex;
  width: ${(props: IStyledStackProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledStackProps): string => (props.isFullHeight ? '100%' : 'auto')};
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.$direction, props.theme, getDirectionCss)};
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.childAlignment, props.theme, getChildAlignmentCss)};
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.contentAlignment, props.theme, getContentAlignmentCss)};
  .scrollableVertically {
    overflow-y: auto;
  }
  .scrollableHorizontally {
    overflow-x: auto;
  }
`;

interface IStackProps extends IMultiAnyChildProps, IPaddingViewPaddingProps {
  id?: string;
  className: string;
  theme?: IDimensionGuide;
  shouldAddGutters: boolean;
  defaultGutter?: PaddingSize;
  isScrollableVertically: boolean;
  isScrollableHorizontally: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
  paddingStart?: PaddingSize,
  paddingEnd?: PaddingSize,
  direction: Direction;
  directionResponsive?: ResponsiveField<Direction>;
  childAlignment: Alignment;
  childAlignmentResponsive?: ResponsiveField<Alignment>;
  contentAlignment: Alignment;
  contentAlignmentResponsive?: ResponsiveField<Alignment>;
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

  const defaultGutter = props.defaultGutter || PaddingSize.Default;
  const shouldAddGutters = props.shouldAddGutters && defaultGutter !== PaddingSize.None;
  return (
    <PaddingView paddingTop={paddingTop} paddingBottom={paddingBottom} paddingRight={paddingRight} paddingLeft={paddingLeft} {...props as IPaddingViewPaddingProps}>
      <StyledStack
        id={props.id}
        className={getClassName(Stack.displayName, props.isScrollableVertically && 'scrollableVertically', props.isScrollableHorizontally && 'scrollableHorizontally')}
        theme={theme}
        $direction={{base: props.direction, ...props.directionResponsive}}
        childAlignment={{base: props.childAlignment, ...props.childAlignmentResponsive}}
        contentAlignment={{base: props.contentAlignment, ...props.contentAlignmentResponsive}}
        isFullWidth={props.isFullWidth}
        isFullHeight={props.isFullHeight}
      >
        { children.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
          <React.Fragment key={index}>
            {child.props.gutterBefore && (
              <Spacing className='stack-gutter' variant={child.props.gutterBefore}/>
            )}
            <StyledStackItem
              className={getClassName(StyledStackItem.displayName, child.props.isHidden && 'isHidden')}
              growthFactor={child.props.growthFactor}
              shrinkFactor={child.props.shrinkFactor}
              baseSize={child.props.baseSize}
              alignment={child.props.alignment}
            >
              {child.props.children}
            </StyledStackItem>
            {(child.props.gutterAfter || (shouldAddGutters && index < children.length - 1)) && (
              <Spacing className='stack-gutter' variant={child.props.gutterAfter || defaultGutter}/>
            )}
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
  isFullWidth: false,
  isFullHeight: false,
  isScrollableVertically: false,
  isScrollableHorizontally: false,
};
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

const StyledStackItem = withStackItem((props: IStyledStackItemProps): React.ReactElement | React.ReactElement[] => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })))
});
