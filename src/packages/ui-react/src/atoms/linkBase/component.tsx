import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { ILinkBaseTheme } from './theme';

interface IStyledLinkBaseProps {
  theme: ILinkBaseTheme;
  isFullWidth: boolean;
}

const StyledLinkBase = styled.a<IStyledLinkBaseProps>`
  ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.default.background)};
  ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.default.linkBase)};
  width: ${(props: IStyledLinkBaseProps): string => (props.isFullWidth ? '100%' : 'initial')};
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
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.hover?.linkBase)};
  }
  &:active {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.press?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.press?.linkBase)};
  }
  &:focus {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.focus?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.focus?.linkBase)};
  }
  &.disabled {
    cursor: not-allowed;
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.default.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.default.linkBase)};
    &:hover {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.hover?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.hover?.linkBase)};
    }
    &:active {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.press?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.press?.linkBase)};
    }
    &:focus {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.focus?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.focus?.linkBase)};
    }
  }
`;

interface ILinkBaseProps extends IComponentProps<ILinkBaseTheme>, ISingleAnyChildProps {
  isEnabled: boolean;
  isFullWidth: boolean;
  target: string;
  label?: string;
  onClicked?(): void;
}

export const LinkBase = (props: ILinkBaseProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };

  const theme = props.theme || useBuiltTheme('linkBases', props.mode);
  return (
    <StyledLinkBase
      id={props.id}
      className={getClassName(LinkBase.displayName, props.className, !props.isEnabled && 'disabled')}
      theme={theme}
      onClick={onClicked}
      isFullWidth={props.isFullWidth}
      href={props.target}
      aria-label={props.label}
    >
      {props.children}
    </StyledLinkBase>
  );
};

LinkBase.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  isFullWidth: false,
};
LinkBase.displayName = 'link-base';