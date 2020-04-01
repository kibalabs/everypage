import React from 'react';
// import styled from 'styled-components';

import { Text, Stack, Container } from '../components';


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
        <Text alignment='center'>Made with EveryPage</Text>
      </Stack.Item>
    </Stack>
  </Container>
);
