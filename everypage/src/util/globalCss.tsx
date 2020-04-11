import { createGlobalStyle } from 'styled-components';

import { ITheme, themeToCss } from '../theming';

interface IGlobalCssProps {
  theme: ITheme;
  resetCss: string;
}

export const GlobalCss = createGlobalStyle<IGlobalCssProps>`
  ${(props: IGlobalCssProps): string => props.resetCss}

  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  html {
    overflow: hidden;
  }

  body {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.text)};
    background-color: ${(props: IGlobalCssProps): string => props.theme.colors.background};
    overflow: auto;
  }

  strong {
    font-weight: bold;
  }
`;
