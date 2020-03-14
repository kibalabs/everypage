import React from 'react';
import styled from 'styled-components';

// import { useTheme, IDimensionsGuide } from '../themes';
import { ISingleAnyChildProps } from '../../util';


interface IBaseContainerProps {
  // theme: IDimensionsGuide;
  maxWidth: string;
  isFullHeight?: boolean;
}

const BaseContainer = styled.div<IBaseContainerProps>`
  width: 100%;
  max-width: ${(props: IBaseContainerProps): string => props.maxWidth};
  height: ${(props: IBaseContainerProps): string => (props.isFullHeight ? '100%' : 'auto')};
  max-height: 100%;
  margin-right: auto;
  margin-left: auto;
  overflow-y: auto;
`;

export interface IContainerProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  // theme?: IDimensionsGuide;
  isFullHeight: boolean;
}

export const Container = (props: IContainerProps): React.ReactElement => {
  // const theme = props.theme || useTheme('dimensions');
  return (
    <BaseContainer
      id={props.id}
      className={`container ${props.className}`}
      maxWidth={'1200px' /*theme.screenWidthMax*/}
      isFullHeight={props.isFullHeight}
    >
      {props.children}
    </BaseContainer>
  );
};

Container.displayName = 'Container';
Container.defaultProps = {
  className: '',
  isFullHeight: true,
};
