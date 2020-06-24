import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, MultiDirection, useDimensions } from '../..';
import { IDimensionGuide } from '../dimensions';

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
  direction: MultiDirection;
  theme: IDimensionGuide;
}

const StyledDiv = styled.div<IStyledSpacingProps>`
  margin-left: ${(props: IStyledSpacingProps): string => (props.direction === MultiDirection.Both || props.direction === MultiDirection.Horizontal ? getSize(props.size, props.theme): '0')};
  margin-top: ${(props: IStyledSpacingProps): string => (props.direction === MultiDirection.Both || props.direction === MultiDirection.Vertical ? getSize(props.size, props.theme): '0')};
`;

interface ISpacingProps extends IComponentProps<IDimensionGuide> {
  direction: MultiDirection;
}

export const Spacing = (props: ISpacingProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledDiv
      id={props.id}
      className={getClassName('spacing', props.className)}
      theme={theme}
      size={props.mode as SpacingSize}
      direction={props.direction}
    />
  );
};

Spacing.defaultProps = {
  ...defaultComponentProps,
  direction: MultiDirection.Both,
};
