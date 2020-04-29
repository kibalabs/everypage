import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps, IBoxTheme, ITextTheme, LoadingSpinner, themeToCss, ThemeType, useTheme, RecursivePartial } from '..';


export interface IButtonThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface IButtonThemeState extends ThemeType {
  default: IButtonThemeBase;
  hover: RecursivePartial<IButtonThemeBase>;
  press: RecursivePartial<IButtonThemeBase>;
  focus: RecursivePartial<IButtonThemeBase>;
}

export interface IButtonTheme extends ThemeType {
  normal: IButtonThemeState;
  disabled: IButtonThemeState;
}

interface IStyledButtonProps {
  theme: IButtonTheme;
  isLoading: boolean;
  isFullWidth: boolean;
}

const StyledButton = styled.button<IStyledButtonProps>`
  ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: ${(props: IStyledButtonProps): string => (props.isLoading ? 'default' : 'pointer')};
  width: ${(props: IStyledButtonProps): string => (props.isFullWidth ? '100%' : 'inherit')};
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: padding-box;
  transition: 0.3s;
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

  const theme = props.theme || useTheme('buttons', props.mode);
  return (
    <StyledButton
      id={props.id}
      className={`button ${!props.isEnabled ? 'disabled' : ''} ${props.className}`}
      theme={theme}
      onClick={onClicked}
      isLoading={props.isLoading}
      disabled={!props.isEnabled}
      isFullWidth={props.isFullWidth}
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
