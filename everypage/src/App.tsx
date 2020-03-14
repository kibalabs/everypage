import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import { Root, addPrefetchExcludes } from 'react-static';

import siteContent from './site';
import { Attribution } from './sections/attribution';
import { SectionRenderer } from './sectionRenderer';
import { Stack, IStackItemProps } from 'components/layout';


// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

export const GlobalCss = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap');

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

const StyledApp = styled.div`

`;

const App = (): React.ReactElement => {
  const stackItems: React.ReactElement<IStackItemProps>[] = siteContent.sections.map((sectionJson: Record<string, any>, index: number): React.ReactElement<IStackItemProps> => (
    <Stack.Item key={index}><SectionRenderer sectionJson={sectionJson} /></Stack.Item>
  ));
  stackItems.push(
    <Stack.Item key={siteContent.sections.length + 1}>
      <Attribution />
    </Stack.Item>
  );
  return (
    <StyledApp>
      <GlobalCss />
      <Root>
        <Stack>{ stackItems }</Stack>
      </Root>
    </StyledApp>
  )
}

export default App;
