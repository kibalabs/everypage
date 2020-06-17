import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, IBoxTheme, themeToCss, ThemeType, useBuiltTheme, RecursivePartial } from '..';
;


export interface ILinkBaseThemeBase extends ThemeType {
  background: IBoxTheme;
}

export interface ILinkBaseThemeState extends ThemeType {
  default: ILinkBaseThemeBase;
  hover: RecursivePartial<ILinkBaseThemeBase>;
  press: RecursivePartial<ILinkBaseThemeBase>;
  focus: RecursivePartial<ILinkBaseThemeBase>;
}

export interface ILinkBaseTheme extends ThemeType {
  normal: ILinkBaseThemeState;
  disabled: ILinkBaseThemeState;
}

interface IStyledLinkBaseProps {
  theme: ILinkBaseTheme;
  isFullWidth: boolean;
}

const StyledLinkBase = styled.a<IStyledLinkBaseProps>`
  ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.default.background)};
  width: ${(props: IStyledLinkBaseProps): string => (props.isFullWidth ? '100%' : 'inherit')};
  color: currentColor;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: padding-box;
  transition: 0.3s;
  &:hover {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.default.background)};
    &:hover {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.hover?.background)};
    }
    &:active {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.press?.background)};
    }
    &:focus {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.focus?.background)};
    }
  }
`;

interface ILinkBaseProps extends IComponentProps<ILinkBaseTheme>, ISingleAnyChildProps {
  buttonType: 'button' | 'reset' | 'submit';
  isEnabled: boolean;
  isFullWidth: boolean;
  target?: string;
  onClicked?(): void;
}

export const LinkBase = (props: ILinkBaseProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };

  if (props.onClicked && props.buttonType == 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use onClicked. use the form.onSubmitted instead');
  }

  const theme = props.theme || useBuiltTheme('linkBases', props.mode);
  return (
    <StyledLinkBase
      id={props.id}
      className={getClassName('link-base', props.className, !props.isEnabled && 'disabled')}
      theme={theme}
      onClick={onClicked}
      disabled={!props.isEnabled}
      isFullWidth={props.isFullWidth}
      href={props.target}
    >
      {props.children}
    </StyledLinkBase>
  );
};

LinkBase.defaultProps = {
  ...defaultComponentProps,
  buttonType: 'button',
  isEnabled: true,
  isFullWidth: false,
};
