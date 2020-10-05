import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, useBuiltTheme } from '../..';
import { IIconTheme } from './theme';

interface IStyledIconProps {
  theme: IIconTheme;
  color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
}

const StyledIcon = styled.div<IStyledIconProps>`
  width: ${(props: IStyledIconProps): string => props.theme.size};
  height: ${(props: IStyledIconProps): string => props.theme.size};
  min-width: ${(props: IStyledIconProps): string => props.theme.size};
  min-height: ${(props: IStyledIconProps): string => props.theme.size};
  color: ${(props: IStyledIconProps): string => props.color ? props.color : 'currentColor'};

  svg {
    height: 100%;
    width: 100%;
    fill: ${(props: IStyledIconProps): string => props.shouldAddFill ? 'currentColor': 'none'};
    stroke: ${(props: IStyledIconProps): string => props.shouldAddStroke ? 'currentColor': 'none'};
  }
`;

export interface IIconProps extends IComponentProps<IIconTheme> {
  _color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
  svgContent: string;
}

export const Icon = (props: IIconProps): React.ReactElement => {
  const theme = useBuiltTheme('icons', props.variant, props.theme);
  return (
    <StyledIcon
      id={props.id}
      className={getClassName(Icon.displayName, props.className)}
      theme={theme}
      size={props.size}
      color={props._color}
      shouldAddFill={props.shouldAddFill}
      shouldAddStroke={props.shouldAddStroke}
      dangerouslySetInnerHTML={{__html: props.svgContent}}
    />
  );
};

Icon.defaultProps = {
  ...defaultComponentProps,
  shouldAddFill: true,
  shouldAddStroke: true,
};
Icon.displayName = 'icon';
