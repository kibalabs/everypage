import React from 'react';
import styled from 'styled-components';

import { CssTheme, themeToCss, ISingleAnyChildProps } from '../util';
import { textTheme } from '../theme';


export interface ITextTheme extends CssTheme {
  'font-size': string;
  'font-family': string;
  'font-weight': string;
  'color': string;
  'line-height': string;
}


interface ITextProps extends ISingleAnyChildProps {
  theme?: ITextTheme;
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
  const theme = props.theme || textTheme;
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
}
