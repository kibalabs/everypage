import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, MultiDirection, useDimensions } from '../..';
import { getPaddingSize, PaddingSize, IDimensionGuide } from '../dimensions';

interface IStyledSpacingProps {
  size: string;
  direction: MultiDirection;
  theme: IDimensionGuide;
}

const StyledDiv = styled.div<IStyledSpacingProps>`
  margin-left: ${(props: IStyledSpacingProps): string => (props.direction === MultiDirection.Both || props.direction === MultiDirection.Horizontal ? getPaddingSize(props.size, props.theme): '0')};
  margin-top: ${(props: IStyledSpacingProps): string => (props.direction === MultiDirection.Both || props.direction === MultiDirection.Vertical ? getPaddingSize(props.size, props.theme): '0')};
`;

interface ISpacingProps extends IComponentProps<IDimensionGuide> {
  direction: MultiDirection;
}

export const Spacing = (props: ISpacingProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledDiv
      id={props.id}
      className={getClassName(Spacing.displayName, props.className)}
      theme={theme}
      size={props.variant as PaddingSize}
      direction={props.direction}
    />
  );
};

Spacing.defaultProps = {
  ...defaultComponentProps,
  direction: MultiDirection.Both,
};
Spacing.displayName = 'spacing';
