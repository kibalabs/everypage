import React from 'react';
import { IndexPage, IWebsite } from '@kibalabs/everypage-core';
import { ITheme } from '@kibalabs/ui-react';

interface IPageProps {
  pageContent: IWebsite;
  pageTheme: ITheme;
}

export const Page = (props: IPageProps): React.ReactElement => {
  return (
    <IndexPage isRehydrating={true} pageContent={props.pageContent} pageTheme={props.pageTheme} />
  );
};

export default Page;
