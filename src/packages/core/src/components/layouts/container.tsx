import React from 'react';
import styled from 'styled-components';

import { useTheme, IDimensionGuide } from '..';
import { ISingleAnyChildProps } from '../../util';


interface IBaseContainerProps {
  theme: IDimensionGuide;
  isFullHeight?: boolean;
}

const BaseContainer = styled.div<IBaseContainerProps>`
  width: 100%;
  max-width: ${(props: IBaseContainerProps): string => props.theme.screenWidthMax};
  height: ${(props: IBaseContainerProps): string => (props.isFullHeight ? '100%' : 'auto')};
  max-height: 100%;
  margin-right: auto;
  margin-left: auto;
  overflow-y: auto;
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
  const theme = props.theme || useTheme<IDimensionGuide>('dimensions');
  return (
    <BaseContainer
      id={props.id}
      className={`container ${props.className}`}
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
};