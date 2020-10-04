import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, useBuiltTheme, themeToCss } from '../..';
import { ILinkTheme } from './theme';

interface IStyledLinkProps {
  theme: ILinkTheme;
}

const StyledLink = styled.a<IStyledLinkProps>`
  ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.default?.background)};
  ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.default?.text)};
  &:hover {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.hover?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.hover?.text)};
  }
  &.disabled {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.default?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.default?.text)};
    cursor: not-allowed;
    &:hover {
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.hover?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.hover?.text)};
    }
  }
  &:visited {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.default?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.default?.text)};
    &:hover {
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.hover?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.hover?.text)};
    }
  }
`;

export interface ILinkProps extends IComponentProps<ILinkTheme> {
  isEnabled: boolean;
  shouldOpenSameTab: boolean;
  target: string;
  text: string;
}

export const Link = (props: ILinkProps): React.ReactElement => {
  const theme = useBuiltTheme('links', props.variant, props.theme);
  return (
    <StyledLink
      id={props.id}
      className={getClassName(Link.displayName, props.className, !props.isEnabled && 'disabled')}
      theme={theme}
      href={props.isEnabled ? props.target : undefined}
      target={props.shouldOpenSameTab ? '_self' : '_blank'}
      rel={'noopener'}
    >
      {props.text}
    </StyledLink>
  );
};

Link.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  shouldOpenSameTab: false,
};
Link.displayName = 'link';
