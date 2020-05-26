import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps, ITextTheme, useTheme, themeToCss, ThemeType, RecursivePartial } from '..';


export interface ILinkThemeBase extends ThemeType {
  text: ITextTheme;
}

export interface ILinkThemeState extends ThemeType {
  default: RecursivePartial<ILinkThemeBase>;
  hover: RecursivePartial<ILinkThemeBase>;
}

export interface ILinkTheme extends ThemeType {
  normal: ILinkThemeState;
  disabled: ILinkThemeState;
  visited: ILinkThemeState;
}

interface IStyledLinkProps {
  theme: ILinkTheme;
}

const StyledLink = styled.a<IStyledLinkProps>`
  ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal.default.text)};
  text-decoration: underline;
  &:hover {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal.hover.text)};
  }
  &.disabled {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled.default.text)};
    cursor: not-allowed;
    &:hover {
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled.hover.text)};
    }
  }
  &:visited {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited.default.text)};
    &:hover {
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited.hover.text)};
    }
  }
`;

export interface ILinkProps extends IComponentProps<ILinkTheme> {
  isEnabled: boolean;
  shouldOpenNewTab: boolean;
  destination: string;
  text: string;
}

export const Link = (props: ILinkProps): React.ReactElement => {
  const theme = props.theme || useTheme('links', props.mode);
  return (
    <StyledLink
      id={props.id}
      className={`link ${props.className} ${props.isEnabled ? 'enabled' : 'disabled'}`}
      theme={theme}
      href={props.isEnabled ? props.destination : undefined}
      target={props.shouldOpenNewTab ? '_blank' : '_self'}
      rel={'noopener'}
    >
      {props.text}
    </StyledLink>
  );
};

Link.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  shouldOpenNewTab: false,
};
