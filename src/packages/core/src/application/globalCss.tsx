import { createGlobalStyle } from 'styled-components';

import { ITheme, themeToCss, colorsToCss } from '@kibalabs/ui-react';

interface IGlobalCssProps {
  theme: ITheme;
  resetCss: string;
}

export const GlobalCss = createGlobalStyle<IGlobalCssProps>`
  ${(props: IGlobalCssProps): string => props.resetCss}

  html {
    scroll-behavior: smooth;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
    ${(props: IGlobalCssProps): string => colorsToCss(props.theme.colors)};
  }

  body {
    background-color: ${(props: IGlobalCssProps): string => props.theme.colors.background};
    overflow: auto;
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.default)};
  }

  /* NOTE(krish): the not button needs to be specified as buttons can act as links and these styles will be used on hover */
  /* since this overall ":hover" is more specific than the generic styles for the default button (with no modifier) */
  a:not(.button):not(.link-base):not(.icon-button) {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.links.default.normal.default.text)};
    :hover {
      ${(props: IGlobalCssProps): string => themeToCss(props.theme.links.default.normal.hover.text)};
    }
    :visited {
      ${(props: IGlobalCssProps): string => themeToCss(props.theme.links.default.visited.default.text)};
    }
  }

  p {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.paragraph)};
  }
  b {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.bold)};
  }
  strong {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.strong)};
  }
  i {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.italic)};
  }
  em {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.emphasis)};
  }
  mark {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.mark)};
  }
  small {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.small)};
  }
  del {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.deleted)};
  }
  ins {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.inserted)};
  }
  sub {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.subscript)};
  }
  sup {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.superscript)};
  }

  h1 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header1)};
  }
  h2 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header2)};
  }
  h3 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header3)};
  }
  h4 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header4)};
  }
  h5 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header5)};
  }
  h6 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header6)};
  }

  ul {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.bulletLists.default.normal.default.bulletList)};
  }

  li {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.bulletTexts.default.normal.default.text)};
    :before {
      ${(props: IGlobalCssProps): string => themeToCss(props.theme.bulletTexts.default.normal.default.bullet)};
    }
  }
`;
