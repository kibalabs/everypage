import React from 'react';
import { useSiteData } from 'react-static';
import { IndexPage } from '@kibalabs/everypage-core';

const Index = (): React.ReactElement => {
  const siteData = useSiteData();
  return (
    <IndexPage pageContent={siteData.pageContent} pageTheme={siteData.pageTheme} />
  );
};

export default Index;
