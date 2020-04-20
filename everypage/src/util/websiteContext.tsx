import React from 'react';

import { IWebsite, ISingleAnyChildProps } from './';

export const WebsiteContext = React.createContext<IWebsite | null>(null);

interface IWebsiteProviderProps extends ISingleAnyChildProps {
  website: IWebsite;
}

export const WebsiteProvider = (props: IWebsiteProviderProps): React.ReactElement => (
  <WebsiteContext.Provider value={props.website}>
    {props.children}
  </WebsiteContext.Provider>
);

export function useWebsite(): IWebsite {
  const website = React.useContext(WebsiteContext);
  if (!website) {
    throw Error('No website has been set!');
  }
  return website;
}
