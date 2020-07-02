import React from 'react';
import { LocalStorageClient } from '@kibalabs/core';

import { EverypageClient } from './everypageClient';
import { AuthManager } from './authManager';
import { IConsoleConfig } from './consoleConfig';


export interface IGlobals {
  everypageClient: EverypageClient;
  authManager: AuthManager;
  localStorageClient: LocalStorageClient;
  consoleConfig: IConsoleConfig;
}

export const GlobalsContext = React.createContext<IGlobals | null>(null);

interface IGlobalsProviderProps {
  globals: IGlobals;
  children: React.ReactChild;
}

export const GlobalsProvider = (props: IGlobalsProviderProps): React.ReactElement => (
  <GlobalsContext.Provider value={props.globals}>
    {props.children}
  </GlobalsContext.Provider>
);

export const useGlobals = (): IGlobals => {
  const globals = React.useContext(GlobalsContext);
  if (!globals) {
    throw new Error('Cannot use useGlobals since globals has not ben provided above in the hierarchy')
  }
  return globals;
}
