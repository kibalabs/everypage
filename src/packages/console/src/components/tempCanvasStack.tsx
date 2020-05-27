import React from 'react';
import styled from 'styled-components';

import { Direction, Alignment, getFlexItemAlignment, getFlexContentAlignment, useTheme, IDimensionGuide } from '@kibalabs/everypage-core';
import { IMultiAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';

  // NOTE(krish): if the child of the stackitem declares 100% height (on vertical stack) it doesnt work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)

export interface ICanvasStackItemProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  shouldAllowScrolling: boolean;
  isHidden: boolean;
  alignment?: Alignment;
}

class CanvasStackItem extends React.Component<ICanvasStackItemProps> {
  static displayName = 'CanvasStack.Item';
  static defaultProps = {
    className: '',
    growthFactor: 0,
    shrinkFactor: 0,
    // NOTE(krish): see note above
    baseSize: 'auto',
    shouldAllowScrolling: false,
    isHidden: false,
  };
}

interface IStyledCanvasStackProps {
  direction: string;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  isFullWidth: boolean;
  isFullHeight: boolean;
  shouldAllowScrolling: boolean;
}

const StyledCanvasStack = styled.div<IStyledCanvasStackProps>`
  display: flex;
  flex-direction: ${(props: IStyledCanvasStackProps): string => (props.direction === Direction.Vertical ? 'column' : 'row')};
  width: ${(props: IStyledCanvasStackProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledCanvasStackProps): string => (props.isFullHeight ? '100%' : 'auto')};
  overflow-y: ${(props: IStyledCanvasStackProps): string => (props.shouldAllowScrolling && props.direction === Direction.Vertical ? 'auto' : (props.isFullHeight ? 'hidden' : 'visible'))};
  overflow-x: ${(props: IStyledCanvasStackProps): string => (props.shouldAllowScrolling && props.direction === Direction.Horizontal ? 'auto' : (props.isFullWidth ? 'hidden' : 'visible'))};
  justify-content: ${(props: IStyledCanvasStackProps): string => getFlexContentAlignment(props.contentAlignment)};
  align-items: ${(props: IStyledCanvasStackProps): string => getFlexItemAlignment(props.childAlignment)};
`;

interface ICanvasStackProps extends IMultiAnyChildProps {
  id?: string;
  className: string;
  theme?: IDimensionGuide;
  direction: Direction;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  shouldAddGutters: boolean;
  shouldAllowScrolling: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
}

export const CanvasStack = (props: ICanvasStackProps): React.ReactElement => {
  const theme = props.theme || useTheme<IDimensionGuide>('dimensions');
  const realChildren = React.Children.toArray(props.children).filter((child: React.ReactNode): boolean => child !== null && child !== undefined);
  const children = realChildren.map((child: React.ReactElement, index: number): React.ReactElement<ICanvasStackItemProps> => (
    child.type !== CanvasStackItem ? <CanvasStackItem key={index}>{ child }</CanvasStackItem> : child
  ));
  return (
    <StyledCanvasStack
      id={props.id}
      className={`stack ${props.className}`}
      direction={props.direction}
      childAlignment={props.childAlignment}
      contentAlignment={props.contentAlignment}
      isFullWidth={props.isFullWidth}
      isFullHeight={props.isFullHeight}
      shouldAllowScrolling={props.shouldAllowScrolling}
    >
      { children.map((child: React.ReactElement, index: number): React.ReactElement<ICanvasStackItemProps> => (
        <StyledCanvasStackItem
          key={index}
          id={child.props.id}
          className={`stack-item ${child.props.className}`}
          growthFactor={child.props.growthFactor}
          shrinkFactor={child.props.shrinkFactor}
          baseSize={child.props.baseSize}
          shouldAllowScrolling={child.props.shouldAllowScrolling}
          gutterSize={props.shouldAddGutters ? theme.gutterSize : '0'}
          direction={props.direction}
          alignment={child.props.alignment}
          isHidden={child.props.isHidden}
        >
          <StyledCanvasStackItemInner
            className={`stack-item-inner`}
            direction={props.direction}
            alignment={child.props.alignment}
          >
            {child.props.children}
          </StyledCanvasStackItemInner>
        </StyledCanvasStackItem>
      ))}
    </StyledCanvasStack>
  );
};

CanvasStack.defaultProps = {
  className: '',
  direction: Direction.Vertical,
  childAlignment: Alignment.Fill,
  contentAlignment: Alignment.Fill,
  shouldAllowScrolling: true,
  shouldAddGutters: false,
  isFullWidth: false,
  isFullHeight: false,
};
CanvasStack.Item = CanvasStackItem;

interface IStyledCanvasStackItemProps extends ICanvasStackItemProps {
  direction: Direction;
  alignment?: Alignment;
  gutterSize: string;
}

const StyledCanvasStackItem = styled.div<IStyledCanvasStackItemProps>`
  display: ${(props: IStyledCanvasStackItemProps): string => props.isHidden ? 'none' : 'flex'};
  flex-grow: ${(props: IStyledCanvasStackItemProps): number => props.growthFactor};
  flex-shrink: ${(props: IStyledCanvasStackItemProps): number => props.shrinkFactor};
  flex-basis: ${(props: IStyledCanvasStackItemProps): string => props.baseSize};
  overflow-y: ${(props: IStyledCanvasStackItemProps): string => (props.shouldAllowScrolling && props.direction === Direction.Vertical ? 'auto' : 'hidden')};
  overflow-x: ${(props: IStyledCanvasStackItemProps): string => (props.shouldAllowScrolling && props.direction === Direction.Horizontal ? 'auto' : 'hidden')};
  margin-top: ${(props: IStyledCanvasStackItemProps): string => (props.direction === Direction.Vertical ? props.gutterSize : '0')};
  margin-bottom: ${(props: IStyledCanvasStackItemProps): string => (props.direction === Direction.Vertical ? props.gutterSize : '0')};
  margin-left: ${(props: IStyledCanvasStackItemProps): string => (props.direction === Direction.Horizontal ? props.gutterSize : '0')};
  margin-right: ${(props: IStyledCanvasStackItemProps): string => (props.direction === Direction.Horizontal ? props.gutterSize : '0')};
  align-self: ${(props: IStyledCanvasStackItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
`;

interface IStyledCanvasStackItemInnerProps extends ISingleAnyChildProps {
  direction: Direction;
  alignment?: Alignment;
}

const StyledCanvasStackItemInner = styled.div<IStyledCanvasStackItemInnerProps>`
  flex-grow: 1;
  width: ${(props: IStyledCanvasStackItemInnerProps): string => (props.direction === Direction.Vertical ? '100%' : 'auto')};
  height: ${(props: IStyledCanvasStackItemInnerProps): string => (props.direction === Direction.Horizontal ? '100%' : 'auto')};
`;
