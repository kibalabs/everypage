import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';

import { Direction, Alignment, getFlexItemAlignment, getFlexContentAlignment, useDimensions, IDimensionGuide, PaddingSize, getPaddingSize, Spacing } from '..';

  // NOTE(krish): if the child of the stack.item declares 100% height (on vertical stack) it doesn't work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)

export interface IStackItemProps extends ISingleAnyChildProps {
  id?: string;
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
  $direction: string;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  isFullWidth: boolean;
  isFullHeight: boolean;
}

const StyledStack = styled.div<IStyledStackProps>`
  display: flex;
  flex-direction: ${(props: IStyledStackProps): string => (props.$direction === Direction.Vertical ? 'column' : 'row')};
  width: ${(props: IStyledStackProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledStackProps): string => (props.isFullHeight ? '100%' : 'auto')};
  justify-content: ${(props: IStyledStackProps): string => getFlexContentAlignment(props.contentAlignment)};
  align-items: ${(props: IStyledStackProps): string => getFlexItemAlignment(props.childAlignment)};
`;

interface IStackProps extends IMultiAnyChildProps {
  id?: string;
  className: string;
  theme?: IDimensionGuide;
  direction: Direction;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  shouldAddGutters: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
  gutterSizeStart?: PaddingSize,
  gutterSizeEnd?: PaddingSize,
}

export const Stack = (props: IStackProps): React.ReactElement => {
  const realChildren = React.Children.toArray(props.children).filter((child: React.ReactNode): boolean => child !== null && child !== undefined);
  const children = realChildren.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
    child.type !== StackItem ? <StackItem key={index}>{ child }</StackItem> : child
  ));
  return (
    <StyledStack
      id={props.id}
      className={getClassName('stack', props.className)}
      $direction={props.direction}
      childAlignment={props.childAlignment}
      contentAlignment={props.contentAlignment}
      isFullWidth={props.isFullWidth}
      isFullHeight={props.isFullHeight}
    >
      {props.gutterSizeStart && <Spacing className='stack-gutter' mode={props.gutterSizeStart} />}
      { children.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
        <React.Fragment key={index}>
          {(child.props.gutterSizeBefore) && <Spacing className='stack-gutter' mode={child.props.gutterSizeBefore}/>}
          <StyledStackItem
            id={child.props.id}
            className={getClassName('stack-item', child.props.isHidden && 'isHidden', child.props.className)}
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
      {props.gutterSizeEnd && <Spacing className='stack-gutter' mode={props.gutterSizeEnd} />}
    </StyledStack>
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
Stack.Item = StackItem;

interface IStyledStackItemProps extends ISingleAnyChildProps {
  id?: string;
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
  min-width: ${(props: IStyledStackItemProps): number => props.shrinkFactor ? '0' : 'initial'};
  align-self: ${(props: IStyledStackItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
  &.isHidden {
    display: none;
  }
`;

const StyledStackItem = withStackItem((props: IStyledStackItemProps): React.ReactElement => {
  return React.cloneElement(props.children || <div />, { className: props.className });
});
