import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';


export interface IIconProps {
  id?: string;
  className: string;
  size?: 'default' | 'small' | 'large' | 'extra-large' | 'extra-extra-large' | 'full';
  _color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
  svgContent: string;
}

interface IStyledIconProps {
  size: 'default' | 'small' | 'large' | 'extra-large' | 'extra-extra-large' | 'full';
  color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
}

const getSize = (size: string): string => {
  switch (size) {
    case 'small': {
      return '0.75rem';
    }
    case 'large': {
      return '2rem';
    }
    case 'extra-large': {
      return '4rem';
    }
    case 'extra-extra-large': {
      return '8rem';
    }
    case 'full': {
      return '100%';
    }
    default: {
      return '1.3rem';
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
      id={props.id}
      className={getClassName(Icon.displayName, props.className)}
      size={props.size}
      color={props._color}
      shouldAddFill={props.shouldAddFill}
      shouldAddStroke={props.shouldAddStroke}
      dangerouslySetInnerHTML={{__html: props.svgContent}}
    />
  );
};

Icon.defaultProps = {
  className: '',
  shouldAddFill: true,
  shouldAddStroke: true,
};
Icon.displayName = 'icon';
