import React from 'react';

import { merge, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IWebsite } from '../model';

export const WebsiteContext = React.createContext<IWebsite | null>(null);

interface IWebsiteProviderProps extends ISingleAnyChildProps {
  website: IWebsite;
}

export const WebsiteProvider = (props: IWebsiteProviderProps): React.ReactElement => (
  <WebsiteContext.Provider value={props.website}>
    {props.children}
  </WebsiteContext.Provider>
);

export function useWebsite(override: RecursivePartial<IWebsite>): IWebsite {
  const website = React.useContext(WebsiteContext);
  if (!website) {
    throw Error('No website has been set!');
  }
  return merge(website, override);
}
