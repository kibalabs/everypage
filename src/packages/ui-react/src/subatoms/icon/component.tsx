import React from 'react';
import styled from 'styled-components';


export interface IIconProps {
  size?: 'default' | 'small' | 'large' | 'extra-large' | 'full';
  _color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
  svgContent: string;
}

interface IStyledIconProps {
  size: 'default' | 'small' | 'large' | 'extra-large' | 'full';
  color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
}

const getSize = (size: string): string => {
  switch (size) {
    case 'small': {
      return '0.75em';
    }
    case 'large': {
      return '2em';
    }
    case 'extra-large': {
      return '4em';
    }
    case 'full': {
      return '100%';
    }
    default: {
      return '1.3em';
    }
  }
}

const StyledIcon = styled.div<IStyledIconProps>`
  width: ${(props: IStyledIconProps): string => getSize(props.size)};
  height: ${(props: IStyledIconProps): string => getSize(props.size)};
  color: ${(props: IStyledIconProps): string => props.color ? props.color : 'currentColor'};

  svg {
    height: 100%;
    width: 100%;
    fill: ${(props: IStyledIconProps): string => props.shouldAddFill ? 'currentColor': 'none'};
    stroke: ${(props: IStyledIconProps): string => props.shouldAddStroke ? 'currentColor': 'none'};
  }
`;

export const Icon = (props: IIconProps): React.ReactElement => {
  return (
    <StyledIcon
      size={props.size}
      color={props._color}
      shouldAddFill={props.shouldAddFill}
      shouldAddStroke={props.shouldAddStroke}
      dangerouslySetInnerHTML={{__html: props.svgContent}}
    />
  );
};

Icon.defaultProps = {
  shouldAddFill: true,
  shouldAddStroke: true,
};
