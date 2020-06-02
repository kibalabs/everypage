import React from 'react';
import * as Reach from '@reach/router'

import { ErrorBoundary } from './errorBoundary';
import { IMultiChildProps } from './parentComponentProps';

export interface IRouterAuthManager {
  getIsUserLoggedIn: () => boolean;
}

export interface IRouteProps<PagePropsType = {}> {
  path?: string;
  default?: boolean;
  uri?: string;
  redirectIfNoAuth?: string;
  page: React.ComponentType<PagePropsType>;
}

export const Route = (props: IRouteProps): React.ReactElement => {
  const params = Reach.useParams()
  return (
    <ErrorBoundary>
      <props.page {...params} />
    </ErrorBoundary>
  );
}

export type IHistory = Reach.History;

export const HistoryContext = React.createContext<IHistory | null>(null);

interface IHistoryProviderProps {
  history: IHistory;
  children: React.ReactChild;
}

export const HistoryProvider = (props: IHistoryProviderProps): React.ReactElement => (
  <HistoryContext.Provider value={props.history}>
    <Reach.LocationProvider history={props.history}>
      {props.children}
    </Reach.LocationProvider>
  </HistoryContext.Provider>
);

export const useHistory = (): IHistory => {
  const history = React.useContext(HistoryContext);
  if (!history) {
    throw new Error('Cannot use useHistory since HistoryContext has not ben provided above in the hierarchy')
  }
  return history;
}

export const RouterAuthManagerContext = React.createContext<IRouterAuthManager | undefined>(undefined);

export interface IRouterProps extends IMultiChildProps<IRouteProps<any>> {
  authManager?: IRouterAuthManager;
}

export const Router = (props: IRouterProps): React.ReactElement => {
  const history = Reach.createHistory(window);
  return (
    <HistoryProvider history={history}>
      <RouterAuthManagerContext.Provider value={props.authManager}>
        <Reach.Router style={{width: '100%', height: '100%'}}>
          { props.children }
        </Reach.Router>
      </RouterAuthManagerContext.Provider>
    </HistoryProvider>
  )
}

export interface ILinkProps {
  target: string;
  text: string;
}

export const Link = (props: ILinkProps): React.ReactElement => {
  return (
    <Reach.Link to={props.target}>{props.text}</Reach.Link>
  )
}
