import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps } from '..';
import { IDimensionGuide, useTheme } from '../../theming';
import { Direction } from '../direction';


export enum SpacingSize {
  ExtraNarrow = 'extra-narrow',
  Narrow = 'narrow',
  Default = 'default',
  Wide = 'wide',
  ExtraWide = 'extra-wide',
  ExtraExtraWide = 'extra-extra-wide',
  ExtraExtraExtraWide = 'extra-extra-extra-wide',
}


const getSize = (size: SpacingSize, theme: IDimensionGuide): string => {
  switch (size) {
    case SpacingSize.ExtraNarrow: {
      return theme.paddingExtraNarrow;
    }
    case SpacingSize.Narrow: {
      return theme.paddingNarrow;
    }
    case SpacingSize.Default: {
      return theme.padding;
    }
    case SpacingSize.Wide: {
      return theme.paddingWide;
    }
    case SpacingSize.ExtraWide: {
      return theme.paddingExtraWide;
    }
    case SpacingSize.ExtraExtraWide: {
      return theme.paddingExtraExtraWide;
    }
    case SpacingSize.ExtraExtraExtraWide: {
      return theme.paddingExtraExtraExtraWide;
    }
    default: {
      return '0';
    }
  }
};


interface IStyledSpacingProps {
  size: SpacingSize;
  direction: Direction;
  theme: IDimensionGuide;
}


const StyledDiv = styled.div<IStyledSpacingProps>`
  margin-left: ${(props: IStyledSpacingProps): string => (props.direction === Direction.Vertical ? '0' : getSize(props.size, props.theme))};
  margin-top: ${(props: IStyledSpacingProps): string => (props.direction === Direction.Horizontal ? '0' : getSize(props.size, props.theme))};
`;


interface ISpacingProps extends IComponentProps<IDimensionGuide> {
  direction: Direction;
}


export const Spacing = (props: ISpacingProps): React.ReactElement => {
  const theme = props.theme || useTheme('dimensions');
  return (
    <StyledDiv
      id={props.id}
      className={`spacing ${props.className}`}
      theme={theme}
      size={props.mode as SpacingSize}
      direction={props.direction}
    />
  );
};

Spacing.defaultProps = {
  ...defaultComponentProps,
  direction: Direction.Vertical,
};
