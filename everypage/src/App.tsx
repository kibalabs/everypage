import React from 'react';
import styled from 'styled-components';

import { Root } from 'react-static';

import siteContent from './site';
import { GlobalCss } from './globalCss';
import { GlobalHead } from './globalHead';
import { Attribution } from './sections/attribution';
import { SectionRenderer } from './sectionRenderer';
import { Stack, IStackItemProps } from './components/layout';


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
      <GlobalCss />
      <GlobalHead
        title={siteContent.title}
        description={siteContent.description}
        fontUrls={[
          'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap',
        ]}
      />
      <Root>
        <Stack>{ stackItems }</Stack>
      </Root>
    </StyledApp>
  )
}

export default App;
