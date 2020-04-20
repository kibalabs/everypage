import React from 'react';
import styled from 'styled-components';

import { Direction, Alignment } from '..';
import { IMultiAnyChildProps, ISingleAnyChildProps } from '../../util';
import { useTheme, IDimensionGuide } from '../../theming';

// See https://webdesign.tutsplus.com/tutorials/a-comprehensive-guide-to-flexbox-alignment--cms-30183
// to learn about alignment

export interface IStackItemProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  shouldAllowScrolling: boolean;
  alignment?: Alignment;
}

class StackItem extends React.Component<IStackItemProps> {
  static displayName = 'Stack.Item';
  static defaultProps = {
    className: '',
    growthFactor: 0,
    shrinkFactor: 0,
    // NOTE(krish): if the child of the stackitem declares 100% height (on vertical stack) it doesnt work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)
    baseSize: 'auto',
    shouldAllowScrolling: false,
  };
}

const getFlexItemAlignment = (childAlignment: string): string => {
  if (childAlignment === Alignment.Start) {
    return 'flex-start';
  }
  if (childAlignment === Alignment.End) {
    return 'flex-end';
  }
  if (childAlignment === Alignment.Center) {
    return 'center';
  }
  return 'stretch';
};

const getFlexContentAlignment = (childAlignment: string): string => {
  if (childAlignment === Alignment.Start) {
    return 'flex-start';
  }
  if (childAlignment === Alignment.End) {
    return 'flex-end';
  }
  if (childAlignment === Alignment.Center) {
    return 'center';
  }
  return 'space-between';
};

interface IStyledStackProps {
  direction: string;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  isFullWidth: boolean;
  isFullHeight: boolean;
}

const StyledStack = styled.div<IStyledStackProps>`
  width: ${(props: IStyledStackProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledStackProps): string => (props.isFullHeight ? '100%' : 'auto')};
  display: flex;
  flex-direction: ${(props: IStyledStackProps): string => (props.direction === Direction.Vertical ? 'column' : 'row')};
  overflow-x: ${(props: IStyledStackProps): string => (props.direction === Direction.Horizontal ? 'auto' : 'visible')};
  overflow-y: ${(props: IStyledStackProps): string => (props.direction === Direction.Vertical ? 'auto' : 'visible')};
  align-items: ${(props: IStyledStackProps): string => getFlexItemAlignment(props.childAlignment)};
  justify-content: ${(props: IStyledStackProps): string => getFlexContentAlignment(props.childAlignment)};
`;

interface IStackProps extends IMultiAnyChildProps {
  id?: string;
  className: string;
  theme?: IDimensionGuide;
  direction: Direction;
  childAlignment: Alignment;
  contentAlignment: Alignment;
  shouldShowGutters: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
}

export const Stack = (props: IStackProps): React.ReactElement => {
  const dimensions = props.theme || useTheme<IDimensionGuide>('dimensions');
  const realChildren = React.Children.toArray(props.children).filter((child: React.ReactNode): boolean => child !== null && child !== undefined);
  const children = realChildren.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
    child.type !== StackItem ? <StackItem key={index}>{ child }</StackItem> : child
  ));
  return (
    <StyledStack
      id={props.id}
      className={`stack ${props.className}`}
      direction={props.direction}
      childAlignment={props.childAlignment}
      contentAlignment={props.contentAlignment}
      isFullWidth={props.isFullWidth}
      isFullHeight={props.isFullHeight}
    >
      { children.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
        <StyledStackItem
          key={index}
          id={child.props.id}
          className={`stack-item ${child.props.className}`}
          growthFactor={child.props.growthFactor}
          shrinkFactor={child.props.shrinkFactor}
          baseSize={child.props.baseSize}
          shouldAllowScrolling={child.props.shouldAllowScrolling}
          gutterSize={props.shouldShowGutters ? dimensions.gutterSize : '0'}
          direction={props.direction}
        >
          {child.props.children}
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
  shouldShowGutters: false,
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
  flex-grow: ${(props: IStyledStackItemProps): number => props.growthFactor};
  flex-shrink: ${(props: IStyledStackItemProps): number => props.shrinkFactor};
  flex-basis: ${(props: IStyledStackItemProps): string => props.baseSize};
  overflow-y: ${(props: IStyledStackItemProps): string => (props.shouldAllowScrolling && props.direction === Direction.Vertical ? 'auto' : 'visible')};
  overflow-x: ${(props: IStyledStackItemProps): string => (props.shouldAllowScrolling && props.direction === Direction.Horizontal ? 'auto' : 'visible')};
  margin-top: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Vertical ? props.gutterSize : '0')};
  margin-bottom: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Vertical ? props.gutterSize : '0')};
  margin-left: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Horizontal ? props.gutterSize : '0')};
  margin-right: ${(props: IStyledStackItemProps): string => (props.direction === Direction.Horizontal ? props.gutterSize : '0')};
  align-self: ${(props: IStyledStackItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
`;
