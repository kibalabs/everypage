import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IIconProps } from '../../subatoms/icon';
import { IIconButtonTheme } from './theme';

interface IStyledIconButtonProps {
  theme: IIconButtonTheme;
}

const StyledIconButton = styled.button<IStyledIconButtonProps>`
  ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: 'pointer';
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  transition: 0.3s;
  &:hover {
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.hover?.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.press?.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.focus?.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.default.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.default.background)};
    &:hover {
      ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.hover?.text)};
      ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.hover?.background)};
    }
    &:active {
      ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.press?.text)};
      ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.press?.background)};
    }
    &:focus {
      ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.focus?.text)};
      ${(props: IStyledIconButtonProps): string => themeToCss(props.theme.disabled.focus?.background)};
    }
  }
`;

interface IIconButtonProps extends IComponentProps<IIconButtonTheme> {
  text: string;
  isEnabled: boolean;
  icon: React.ReactElement<IIconProps>;
  onClicked?(): void;
}

export const IconButton = (props: IIconButtonProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };

  const theme = props.theme || useBuiltTheme('iconButtons', props.mode);
  return (
    <StyledIconButton
      id={props.id}
      className={getClassName('icon-button', !props.isEnabled && 'disabled', props.className)}
      theme={theme}
      onClick={onClicked}
      disabled={!props.isEnabled}
    >
      {props.icon}
    </StyledIconButton>
  );
};

IconButton.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
