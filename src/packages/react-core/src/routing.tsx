import React from 'react';
import * as Reach from '@reach/router'

import { ErrorBoundary } from './errorBoundary';
import { IMultiChildProps } from './parentComponentProps';

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
    throw new Error('Cannot use useHistory since HistoryContext has not ben provided')
  }
  return history;
}

export interface IRouterAuthManager {
  getIsUserLoggedIn: () => boolean;
}

export const RouterAuthManagerContext = React.createContext<IRouterAuthManager | undefined>(undefined);

export const useRouterAuthManager = (): IRouterAuthManager => {
  const authManager = React.useContext(RouterAuthManagerContext);
  return authManager;
}

export interface IRouteProps<PagePropsType = {}> {
  path?: string;
  default?: boolean;
  uri?: string;
  redirectIfAuth?: string;
  redirectIfNoAuth?: string;
  page: React.ComponentType<PagePropsType>;
}

export const Route = (props: IRouteProps): React.ReactElement => {
  const params = Reach.useParams();
  const authManager = useRouterAuthManager();
  if (props.redirectIfNoAuth) {
    if (!authManager) {
      throw new Error('Cannot use redirectIfNoAuth since an authManager has not ben provided to the router');
    }
    if (!authManager.getIsUserLoggedIn()) {
      // TODO(krish): using history.navigate would be prefereable here but it didnt work, figure out why
      return <Reach.Redirect noThrow to={props.redirectIfNoAuth} />;
    }
  }
  if (props.redirectIfAuth) {
    if (!authManager) {
      throw new Error('Cannot use redirectIfAuth since an authManager has not ben provided to the router');
    }
    if (authManager.getIsUserLoggedIn()) {
      // TODO(krish): using history.navigate would be prefereable here but it didnt work, figure out why
      return <Reach.Redirect noThrow to={props.redirectIfAuth} />;
    }
  }
  return (
    <ErrorBoundary>
      <props.page {...params} />
    </ErrorBoundary>
  );
}

export interface IRouterProps extends IMultiChildProps<IRouteProps<any>> {
  authManager?: IRouterAuthManager;
}

export const Router = (props: IRouterProps): React.ReactElement => {
  const historyRef = React.useRef(Reach.createHistory(window));
  return (
    <HistoryProvider history={historyRef.current}>
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
