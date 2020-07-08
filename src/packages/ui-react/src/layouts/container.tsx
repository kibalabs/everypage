import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { useDimensions } from '..';
import { IDimensionGuide } from '../subatoms';


interface IStyledContainerProps {
  theme: IDimensionGuide;
  isFullHeight: boolean;
  isMainContainer?: boolean;
}

const StyledContainer = styled.div<IStyledContainerProps>`
  width: 100%;
  max-width: ${(props: IStyledContainerProps): string => props.theme.screenWidthMax};
  height: ${(props: IStyledContainerProps): string => (props.isFullHeight ? '100%' : 'auto')};
  max-height: ${(props: IStyledContainerProps): string => (props.isMainContainer ? '100%' : 'auto')};
  margin-right: auto;
  margin-left: auto;
  overflow-y: ${(props: IStyledContainerProps): string => (props.isMainContainer ? 'auto' : 'visible')};
  padding-left: ${(props: IStyledContainerProps): string => props.theme.padding};
  padding-right: ${(props: IStyledContainerProps): string => props.theme.padding};
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
    <StyledContainer
      id={props.id}
      className={getClassName(Container.displayName, props.className)}
      theme={theme}
      isFullHeight={props.isFullHeight}
    >
      {props.children}
    </StyledContainer>
  );
};

Container.defaultProps = {
  className: '',
  isFullHeight: true,
  isMainContainer: true,
};
Container.displayName = 'container';
