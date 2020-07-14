import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, LoadingSpinner, themeToCss, useBuiltTheme } from '../..';
import { IButtonTheme } from './theme';

interface IStyledButtonProps {
  theme: IButtonTheme;
  isLoading: boolean;
}

const StyledButton = styled.button<IStyledButtonProps>`
  ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: ${(props: IStyledButtonProps): string => (props.isLoading ? 'default' : 'pointer')};
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  transition: 0.3s;
  .fullWidth {
    width: 100%;
  }

  &:hover {
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.hover?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.press?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.focus?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.default.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.default.background)};
    &:hover {
      ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.hover?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.hover?.background)};
    }
    &:active {
      ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.press?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.press?.background)};
    }
    &:focus {
      ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.focus?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.theme.disabled.focus?.background)};
    }
  }
`;

interface IButtonProps extends IComponentProps<IButtonTheme> {
  buttonType: 'button' | 'reset' | 'submit';
  text: string;
  isEnabled: boolean;
  isLoading: boolean;
  isFullWidth: boolean;
  // rightIcon?: React.ComponentClass<IIconProps>;
  // leftIcon?: React.ComponentClass<IIconProps>;
  // iconSize: 'default' | 'small' | 'large' | 'full';
  onClicked?(): void;
}

export const Button = (props: IButtonProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.isLoading) {
      return;
    }
    if (props.onClicked) {
      props.onClicked();
    }
  };

  if (props.onClicked && props.buttonType == 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use onClicked. use the form.onSubmitted instead');
  }

  const theme = props.theme || useBuiltTheme('buttons', props.mode);
  return (
    <StyledButton
      id={props.id}
      className={getClassName(Button.displayName, props.className, props.isFullWidth && 'fullWidth', !props.isEnabled && 'disabled')}
      theme={theme}
      onClick={onClicked}
      isLoading={props.isLoading}
      disabled={!props.isEnabled}
    >
      { !props.isLoading && props.text }
      { props.isLoading && <LoadingSpinner id={props.id && `${props.id}-loading-spinner`} mode='light' size='small'/> }
    </StyledButton>
  );
};

Button.defaultProps = {
  ...defaultComponentProps,
  buttonType: 'button',
  isLoading: false,
  isEnabled: true,
  isFullWidth: false,
};
Button.displayName = 'button';
