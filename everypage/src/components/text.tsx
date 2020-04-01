import React from 'react';
import styled from 'styled-components';

import { CssTheme, themeToCss, ISingleAnyChildProps, useTheme } from '../util';


export interface ITextTheme extends CssTheme {
  'font-size': string;
  'font-family': string;
  'font-weight': string;
  'color': string;
  'line-height': string;
}


interface ITextProps extends ISingleAnyChildProps {
  theme?: ITextTheme;
  mode?: string;
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
      alignment={props.alignment}
      theme={theme}
    >
      { props.children }
    </StyledText>
  )
};

Text.defaultProps = {
  alignment: 'left',
  mode: 'text',
}
