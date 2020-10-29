import { createGlobalStyle } from 'styled-components';
import { ITheme, colorsToCss } from '@kibalabs/ui-react';

interface IGlobalCssProps {
  theme: ITheme;
  resetCss: string;
}

export const GlobalCss = createGlobalStyle<IGlobalCssProps>`
  ${(props: IGlobalCssProps): string => props.resetCss}

  html, body, #root {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  html {
    overflow: hidden;
    ${(props: IGlobalCssProps): string => colorsToCss(props.theme.colors)};
  }

  body {
    font-size: 12px;
    font-family: "Montserrat", sans-serif;
    background-color: #f5f5f5;
    overflow: auto;
  }

  strong {
    font-weight: bold;
  }
`;
