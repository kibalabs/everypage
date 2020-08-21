import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, LoadingSpinner, themeToCss, useBuiltTheme } from '../..';
import { IButtonTheme } from './theme';
import { IIconProps, Spacing, PaddingSize } from '../../subatoms';

interface IStyledButtonProps {
  theme: IButtonTheme;
  isLoading: boolean;
}

const StyledButton = styled.button<IStyledButtonProps>`
  ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.background)};
  /* Since it can be rendered as an <a>, unset everything for visited */
  &:visited {
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.theme.normal.default.background)};
  }
  cursor: ${(props: IStyledButtonProps): string => (props.isLoading ? 'default' : 'pointer')};
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  transition-duration: 0.3s;
  &.fullWidth {
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
  iconRight?: React.ComponentClass<IIconProps>;
  iconLeft?: React.ReactElement<IIconProps>;
  iconGutterSize?: string;
  target?: string;
  targetShouldOpenSameTab?: boolean;
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

  const theme = useBuiltTheme('buttons', props.mode, props.theme);
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || (props.targetShouldOpenSameTab === undefined && props.target && props.target.startsWith('#'));
  return (
    <StyledButton
      id={props.id}
      className={getClassName(Button.displayName, props.className, props.isFullWidth && 'fullWidth', !props.isEnabled && 'disabled')}
      theme={theme}
      onClick={onClicked}
      isLoading={props.isLoading}
      disabled={!props.isEnabled}
      as={props.target && 'a'}
      href={props.target}
      rel={(props.target && targetShouldOpenSameTab) ? 'noopener' : undefined}
      target={props.target && (targetShouldOpenSameTab ? '_self' : '_blank')}
    >
      { !props.isLoading && props.iconLeft && (
        <React.Fragment>
          {props.iconLeft}
          <Spacing mode={props.iconGutterSize} />
        </React.Fragment>
      )}
      { !props.isLoading && props.text }
      { !props.isLoading && props.iconRight && (
        <React.Fragment>
          <Spacing mode={props.iconGutterSize} />
          {props.iconRight}
        </React.Fragment>
      )}
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
  iconGutterSize: PaddingSize.Default,
};
Button.displayName = 'button';
