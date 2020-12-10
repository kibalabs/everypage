import React from 'react';
import { IndexPage } from '@kibalabs/everypage-core';

import pageContent from '../site.json';
import pageTheme from '../theme.json';

const siteData = { pageContent, pageTheme }

siteData.pageContent.buildHash = 'testing123-new';
siteData.pageContent.siteHost = 'test.evrpg.com';

export const Home = (): React.ReactElement => {
  return (
    <IndexPage pageContent={siteData.pageContent} pageTheme={siteData.pageTheme} />
  );
};

export default Home;