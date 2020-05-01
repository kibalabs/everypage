import React from 'react';
import * as ReactStatic from 'react-static';
import { IndexPage } from '@kibalabs/everypage-core';

const Index = (): React.ReactElement => {
  const siteData = ReactStatic.useSiteData();
  return (
    <IndexPage pageContent={siteData.pageContent} pageTheme={siteData.pageTheme} />
  );
};

export default Index;
