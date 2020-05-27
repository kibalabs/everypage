import React from 'react';
import * as Reach from '@reach/router'

import { ErrorBoundary } from './errorBoundary';
import { IMultiChildProps } from './parentComponentProps';

export interface IRouteProps<PagePropsType = {}> {
  path?: string;
  default?: boolean;
  uri?: string;
  page: React.ComponentType<PagePropsType>;
}

export const Route = (props: IRouteProps): React.ReactElement => {
  const params = Reach.useParams()
  return (
    <ErrorBoundary><props.page {...params} /></ErrorBoundary>
  );
}

export interface IRouterProps extends IMultiChildProps<IRouteProps<any>> {
}

export const Router = (props: IRouterProps): React.ReactElement => {
  return (
    <Reach.Router style={{width: '100%', height: '100%'}}>
      { props.children }
    </Reach.Router>
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
