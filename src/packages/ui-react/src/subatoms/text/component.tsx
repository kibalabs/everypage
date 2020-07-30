import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { useBuiltTheme } from '../../theming';
import { ITextTheme } from './theme';

export enum TextAlignment {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Justify = 'justify',
}

type TextTag = 'p' | 'span' | 'h1' | 'h1' | 'h2' | 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6' | 'b' | 'strong' | 'i' | 'em' | 'mark' | 'small' | 'del' | 'ins' | 'sub' | 'sup';

const styleModeTagMapping: Record<string, TextTag> = {
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

const textModeTagMapping: Record<string, TextTag> = {
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

export const getTextTag = (mode: string): TextTag => {
  const modes = mode.split('-');
  const textModes = modes.map((mode: string): TextTag | null => {
    if (mode in textModeTagMapping) {
      return textModeTagMapping[mode];
    }
    if (mode in styleModeTagMapping) {
      return styleModeTagMapping[mode];
    }
    return null;
  }).filter((textMode: TextTag | null): boolean => textMode !== null);
  return textModes.length > 0 ? textModes[textModes.length - 1] : 'p';
}

interface IStyledTextProps {
  theme: ITextTheme;
  alignment: TextAlignment;
}

const StyledText = styled.span<IStyledTextProps>`
  ${(props: IStyledTextProps): string => themeToCss(props.theme)};
  ${(props: IStyledTextProps): string => props.alignment ? `text-align: ${props.alignment}`: ''};
`;

export interface ITextProps extends IComponentProps<ITextTheme>, ISingleAnyChildProps {
  alignment?: TextAlignment;
  tag?: TextTag;
}

export const Text = (props: ITextProps): React.ReactElement => {
  const theme = useBuiltTheme('texts', props.mode, props.theme);
  return (
    <StyledText
      id={props.id}
      className={getClassName(Text.displayName, props.className)}
      theme={theme}
      alignment={props.alignment}
      as={props.tag || getTextTag(props.mode)}
    >
      { props.children }
    </StyledText>
  )
};

Text.defaultProps = {
  ...defaultComponentProps,
  alignment: TextAlignment.Left,
}
Text.displayName = 'text';
