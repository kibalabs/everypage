import React from 'react';

import { Root, addPrefetchExcludes } from 'react-static';

import siteContent from './site';
import { Attribution } from './sections/attribution';
import { SectionRenderer } from './sectionRenderer';


// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

const App = (): React.ReactElement => {
  return (
    <Root>
      { siteContent.sections.map((sectionJson: Record<string, any>): React.ReactElement => (
        <SectionRenderer sectionJson={sectionJson} />
      ))}
      <Attribution />
    </Root>
  )
}

export default App;
