import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps } from './componentProps';
import { CssTheme, themeToCss, ISingleAnyChildProps, useTheme } from '../util';


export interface ITextTheme extends CssTheme {
  'font-size': string;
  'font-family': string;
  'font-weight': string;
  'color': string;
  'line-height': string;
}


interface ITextProps extends IComponentProps<ITextTheme>, ISingleAnyChildProps {
  alignment?: 'center' | 'left' | 'right' | 'justify';
}


interface IStyledTextProps {
  theme: ITextTheme;
  alignment: 'center' | 'left' | 'right' | 'justify';
}


const StyledText = styled.span<IStyledTextProps>`
  ${(props: IStyledTextProps): string => themeToCss(props.theme)};
  text-align: ${(props: IStyledTextProps): string => props.alignment};
`;


export const Text = (props: ITextProps): React.ReactElement => {
  const theme = props.theme || useTheme('texts', props.mode);
  return (
    <StyledText
      id={props.id}
      className={`text ${props.className}`}
      theme={theme}
      alignment={props.alignment}
    >
      { props.children }
    </StyledText>
  )
};

Text.defaultProps = {
  ...defaultComponentProps,
  alignment: 'left',
}
