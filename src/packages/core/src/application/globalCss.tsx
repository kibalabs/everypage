import { createGlobalStyle } from 'styled-components';

import { ITheme, themeToCss } from '../components';

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
  }

  body {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.text)};
    background-color: ${(props: IGlobalCssProps): string => props.theme.colors.background};
    overflow: auto;
  }

  a {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.links.default.normal.default.text)};
    :hover {
      ${(props: IGlobalCssProps): string => themeToCss(props.theme.links.default.normal.hover.text)};
    }
    :visited {
      ${(props: IGlobalCssProps): string => themeToCss(props.theme.links.default.visited.default.text)};
    }
  }

  strong {
    font-weight: bold;
  }
`;
