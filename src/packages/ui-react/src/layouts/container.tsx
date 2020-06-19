import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { useDimensions } from '..';
import { IDimensionGuide } from '../subatoms';


interface IBaseContainerProps {
  theme: IDimensionGuide;
  isFullHeight: boolean;
  isMainContainer: boolean;
}

const BaseContainer = styled.div<IBaseContainerProps>`
  width: 100%;
  max-width: ${(props: IBaseContainerProps): string => props.theme.screenWidthMax};
  height: ${(props: IBaseContainerProps): string => (props.isFullHeight ? '100%' : 'auto')};
  max-height: ${(props: IBaseContainerProps): string => (props.isMainContainer ? '100%' : 'auto')};
  margin-right: auto;
  margin-left: auto;
  overflow-y: ${(props: IBaseContainerProps): string => (props.isMainContainer ? 'auto' : 'visible')};
  padding-left: ${(props: IBaseContainerProps): string => props.theme.padding};
  padding-right: ${(props: IBaseContainerProps): string => props.theme.padding};
`;

export interface IContainerProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  theme?: IDimensionGuide;
  isFullHeight: boolean;
}

export const Container = (props: IContainerProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <BaseContainer
      id={props.id}
      className={getClassName('container', props.className)}
      theme={theme}
      isFullHeight={props.isFullHeight}
    >
      {props.children}
    </BaseContainer>
  );
};

Container.defaultProps = {
  className: '',
  isFullHeight: true,
  isMainContainer: true,
};
