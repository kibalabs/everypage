import React from 'react';
import styled from 'styled-components';


interface IFullWidthDivProps {
  size: 'extra-narrow' | 'narrow' | 'default' | 'wide' | 'extra-wide' | 'extra-extra-wide';
  direction: 'horizontal' | 'vertical';
}

const getSize = (size: string): string => {
  switch (size) {
    case 'extra-narrow': {
      return '0.25em';
    }
    case 'narrow': {
      return '0.5em';
    }
    case 'default': {
      return '1em';
    }
    case 'wide': {
      return '2em';
    }
    case 'extra-wide': {
      return '4em';
    }
    case 'extra-extra-wide': {
      return '8em';
    }
    default: {
      return '0';
    }
  }
};

const StyledDiv = styled.div<IFullWidthDivProps>`
  width: ${(props: IFullWidthDivProps): string => (props.direction === 'vertical' ? '0' : getSize(props.size))};
  height: ${(props: IFullWidthDivProps): string => (props.direction === 'horizontal' ? '0' : getSize(props.size))};
`;

interface ISpacingProps {
  size: 'extra-narrow' | 'narrow' | 'default' | 'wide' | 'extra-wide' | 'extra-extra-wide';
  direction: 'horizontal' | 'vertical';
}

export const Spacing = (props: ISpacingProps): React.ReactElement => {
  return (
    <StyledDiv
      size={props.size}
      direction={props.direction}
    />
  );
};

Spacing.displayName = 'Spacing';
Spacing.defaultProps = {
  size: 'default',
  direction: 'vertical',
};
