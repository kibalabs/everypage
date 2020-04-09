import React from 'react';
import styled from 'styled-components';

import { Root } from 'react-static';

import siteContent from './site';
import theme from './theme';

import { ThemeProvider } from './theming'
import { resetCss, GlobalCss, GlobalHead } from './util';
import { Attribution } from './sections/attribution';
import { SectionRenderer } from './sectionRenderer';
import { Stack, IStackItemProps } from './components/layouts';


// Any routes that start with 'dynamic' will be treated as non-static routes
// addPrefetchExcludes(['dynamic']);

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
      <GlobalCss
        theme={theme}
        resetCss={resetCss}
      />
      <GlobalHead
        title={siteContent.title}
        description={siteContent.description}
        fontUrls={[
          'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900',
        ]}
      />
      <Root>
        <ThemeProvider theme={theme}>
          <Stack>{ stackItems }</Stack>
        </ThemeProvider>
      </Root>
    </StyledApp>
  )
}

export default App;
