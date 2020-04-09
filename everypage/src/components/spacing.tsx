import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps } from '.';
import { IDimensionGuide } from '../theming';
import { Direction } from './direction';


export enum SpacingSize {
  ExtraNarrow = 'extra-narrow',
  Narrow = 'narrow',
  Default = 'default',
  Wide = 'wide',
  ExtraWide = 'extra-wide',
  ExtraExtraWide = 'extra-extra-wide',
}


const getSize = (size: SpacingSize): string => {
  switch (size) {
    case SpacingSize.ExtraNarrow: {
      return '0.25em';
    }
    case SpacingSize.Narrow: {
      return '0.5em';
    }
    case SpacingSize.Default: {
      return '1em';
    }
    case SpacingSize.Wide: {
      return '2em';
    }
    case SpacingSize.ExtraWide: {
      return '4em';
    }
    case SpacingSize.ExtraExtraWide: {
      return '8em';
    }
    default: {
      return '0';
    }
  }
};


interface IStyledSpacingProps {
  size: SpacingSize;
  direction: Direction;
}


const StyledDiv = styled.div<IStyledSpacingProps>`
  width: ${(props: IStyledSpacingProps): string => (props.direction === Direction.Vertical ? '0' : getSize(props.size))};
  height: ${(props: IStyledSpacingProps): string => (props.direction === Direction.Horizontal ? '0' : getSize(props.size))};
`;


interface ISpacingProps extends IComponentProps<IDimensionGuide> {
  direction: Direction;
}


export const Spacing = (props: ISpacingProps): React.ReactElement => {
  return (
    <StyledDiv
      size={props.mode as SpacingSize}
      direction={props.direction}
    />
  );
};


Spacing.displayName = 'Spacing';
Spacing.defaultProps = {
  ...defaultComponentProps,
  direction: Direction.Vertical,
};
