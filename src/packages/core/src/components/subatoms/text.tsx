import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, CssTheme, themeToCss, useBuiltTheme } from '..';

export interface ITextTheme extends CssTheme {
  'font-size': string;
  'font-family': string;
  'font-weight': string;
  'color': string;
  'line-height': string;
  'text-decoration': string;
  'margin': string;
}

export enum TextAlignment {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Justify = 'justify',
}

export interface ITextProps extends IComponentProps<ITextTheme>, ISingleAnyChildProps {
  alignment?: TextAlignment;
}

interface IStyledTextProps {
  theme: ITextTheme;
  alignment: TextAlignment;
}

const styleModeTagMapping = {
  bold: 'b',
  strong: 'strong',
  italic: 'i',
  emphasis: 'em',
  mark: 'mark',
  small: 'small',
  deleted: 'del',
  inserted: 'ins',
  subscript: 'sub',
  superscript: 'sup',
}

const textModeTagMapping = {
  paragraph: 'p',
  inline: 'span',
  header1: 'h1',
  header: 'h1',
  header2: 'h2',
  title: 'h2',
  header3: 'h3',
  subtitle: 'h3',
  header4: 'h4',
  header5: 'h5',
  header6: 'h6',
}

const getTag = (mode: string): string => {
  const modes = mode.split('-');
  // Find the last mode that is in textModeTagMapping, and if none the last one in style
  const textModes = modes.filter((mode: string): boolean => mode in textModeTagMapping);
  if (textModes.length > 0) {
    return textModeTagMapping[textModes[textModes.length -1]];
  }
  const styleModes = modes.filter((mode: string): boolean => mode in styleModeTagMapping);
  if (styleModes.length > 0) {
    return styleModeTagMapping[styleModes[-1]];
  }
  return 'p';
}

const StyledText = styled.span<IStyledTextProps>`
  ${(props: IStyledTextProps): string => themeToCss(props.theme)};
  text-align: ${(props: IStyledTextProps): string => props.alignment};
`;

export const Text = (props: ITextProps): React.ReactElement => {
  const theme = props.theme || useBuiltTheme('texts', props.mode);
  return (
    <StyledText
      id={props.id}
      className={getClassName('text', props.className)}
      theme={theme}
      alignment={props.alignment}
      as={getTag(props.mode)}
    >
      { props.children }
    </StyledText>
  )
};

Text.defaultProps = {
  ...defaultComponentProps,
  alignment: TextAlignment.Left,
}
