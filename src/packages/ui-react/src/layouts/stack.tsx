import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';

import { Direction, Alignment, getFlexItemAlignment, getFlexContentAlignment, useDimensions, IDimensionGuide } from '..';

  // NOTE(krish): if the child of the stackitem declares 100% height (on vertical stack) it doesnt work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)

export interface IStackItemProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  isScrollable: boolean;
  isHidden: boolean;
  alignment?: Alignment;
}

class StackItem extends React.Component<IStackItemProps> {
  static displayName = 'Stack.Item';
  static defaultProps = {
    className: '',
    growthFactor: 0,
    shrinkFactor: 0,
    // NOTE(krish): see note above
    baseSize: 'auto',
    isScrollable: false,
    isHidden: false,
  };
}

interface IStyledStackProps {
  direction: string;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  isFullWidth: boolean;
  isFullHeight: boolean;
  isScrollable: boolean;
}

const StyledStack = styled.div<IStyledStackProps>`
  display: flex;
  flex-direction: ${(props: IStyledStackProps): string => (props.direction === Direction.Vertical ? 'column' : 'row')};
  width: ${(props: IStyledStackProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledStackProps): string => (props.isFullHeight ? '100%' : 'auto')};
  overflow-y: ${(props: IStyledStackProps): string => (props.isScrollable && props.direction === Direction.Vertical ? 'auto' : (props.isFullHeight ? 'hidden' : 'visible'))};
  overflow-x: ${(props: IStyledStackProps): string => (props.isScrollable && props.direction === Direction.Horizontal ? 'auto' : (props.isFullWidth ? 'hidden' : 'visible'))};
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
  isScrollable: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
}

export const Stack = (props: IStackProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  const realChildren = React.Children.toArray(props.children).filter((child: React.ReactNode): boolean => child !== null && child !== undefined);
  const children = realChildren.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
    child.type !== StackItem ? <StackItem key={index}>{ child }</StackItem> : child
  ));
  return (
    <StyledStack
      id={props.id}
      className={getClassName('stack', props.className)}
      direction={props.direction}
      childAlignment={props.childAlignment}
      contentAlignment={props.contentAlignment}
      isFullWidth={props.isFullWidth}
      isFullHeight={props.isFullHeight}
      isScrollable={props.isScrollable}
    >
      { children.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
        <StyledStackItem
          key={index}
          id={child.props.id}
          className={getClassName('stack-item', child.props.className)}
          growthFactor={child.props.growthFactor}
          shrinkFactor={child.props.shrinkFactor}
          baseSize={child.props.baseSize}
          isScrollable={child.props.isScrollable}
          gutterSize={props.shouldAddGutters ? theme.gutterSize : '0'}
          direction={props.direction}
          alignment={child.props.alignment}
          isHidden={child.props.isHidden}
        >
          <StyledStackItemInner
            className={'stack-item-inner'}
            direction={props.direction}
            alignment={child.props.alignment}
          >
            {child.props.children}
          </StyledStackItemInner>
        </StyledStackItem>
      ))}
    </StyledStack>
  );
};

Stack.defaultProps = {
  className: '',
  direction: Direction.Vertical,
  childAlignment: Alignment.Fill,
  contentAlignment: Alignment.Fill,
  isScrollable: true,
  shouldAddGutters: false,
  isFullWidth: false,
  isFullHeight: false,
};
Stack.Item = StackItem;

interface IStyledStackItemProps extends IStackItemProps {
  direction: Direction;
  alignment?: Alignment;
  gutterSize: string;
}

const StyledStackItem = styled.div<IStyledStackItemProps>`
  display: ${(props: IStyledCanvasStackItemProps): string => props.isHidden ? 'none' : 'flex'};
  flex-grow: ${(props: IStyledStackItemProps): number => props.growthFactor};
  flex-shrink: ${(props: IStyledStackItemProps): number => props.shrinkFactor};
  flex-basis: ${(props: IStyledStackItemProps): string => props.baseSize};
  overflow-y: ${(props: IStyledStackItemProps): string => (props.isScrollable && props.direction === Direction.Vertical ? 'auto' : 'visible')};
  overflow-x: ${(props: IStyledStackItemProps): string => (props.isScrollable && props.direction === Direction.Horizontal ? 'auto' : 'visible')};
  margin-top: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Vertical ? props.gutterSize : '0')};
  margin-bottom: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Vertical ? props.gutterSize : '0')};
  margin-left: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Horizontal ? props.gutterSize : '0')};
  margin-right: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Horizontal ? props.gutterSize : '0')};
  align-self: ${(props: IStyledStackItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
`;

interface IStyledStackItemInnerProps extends ISingleAnyChildProps {
  direction: Direction;
  alignment?: Alignment;
}

const StyledStackItemInner = styled.div<IStyledStackItemInnerProps>`
  flex-grow: 1;
  width: ${(props: IStyledStackItemInnerProps): string => (props.direction === Direction.Vertical ? '100%' : 'auto')};
  height: ${(props: IStyledStackItemInnerProps): string => (props.direction === Direction.Horizontal ? '100%' : 'auto')};
`;
