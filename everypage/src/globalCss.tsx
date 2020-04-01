import { createGlobalStyle } from 'styled-components';

export const GlobalCss = createGlobalStyle`
  html {
    overflow: hidden;
  }

  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-size: 14px;
    background-color: white;
    overflow: auto;
  }
`;
