import React from 'react';
// import styled from 'styled-components';

import { MarkdownText, Stack, Container, TextAlignment } from '../components';


// const StyledAttribution = styled.nav`
//   width: 100%;
//   height: 50px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #dddddd;
// `;

export const Attribution = (): React.ReactElement => (
  <Container>
    <Stack contentAlignment='center' shouldShowGutters={true}>
      <Stack.Item>
        <MarkdownText alignment={TextAlignment.Center} text='Made with [EveryPage](https://everypagehq.com)' />
      </Stack.Item>
    </Stack>
  </Container>
);
