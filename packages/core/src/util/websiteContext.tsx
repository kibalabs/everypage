import React from 'react';

import { merge, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { getMetaFromWebsite, IWebsite, IWebsiteMeta } from '../model';

// NOTE(krishan711): these get serialized into a string because there is no way (that I know of) to create a deep comparing context
export const WebsiteContext = React.createContext<string | null>(null);
export const WebsiteMetaContext = React.createContext<string | null>(null);

interface IWebsiteProviderProps extends ISingleAnyChildProps {
  website: IWebsite;
}

export const WebsiteProvider = (props: IWebsiteProviderProps): React.ReactElement => (
  <WebsiteContext.Provider value={JSON.stringify(props.website)}>
    <WebsiteMetaContext.Provider value={JSON.stringify(getMetaFromWebsite(props.website))}>
      {props.children}
    </WebsiteMetaContext.Provider>
  </WebsiteContext.Provider>
);

export function useWebsite(override?: RecursivePartial<IWebsite>): IWebsite {
  const website = React.useContext(WebsiteContext);
  if (!website) {
    throw Error('No website has been set!');
  }
  return merge(JSON.parse(website) as unknown as IWebsite, override);
}

export function useWebsiteMeta(override?: RecursivePartial<IWebsiteMeta>): IWebsiteMeta {
  const websiteMeta = React.useContext(WebsiteMetaContext);
  if (!websiteMeta) {
    throw Error('No website has been set!');
  }
  return merge(JSON.parse(websiteMeta) as unknown as IWebsiteMeta, override);
}
