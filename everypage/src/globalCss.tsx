import { createGlobalStyle } from 'styled-components';

export const GlobalCss = createGlobalStyle`
  html {
    overflow: hidden;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-size: 16px;
    background-color: white;
    overflow: auto;
  }
`;
