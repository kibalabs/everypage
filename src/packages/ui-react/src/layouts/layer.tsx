import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';

const StyledLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
StyledLayer.displayName = 'layer';

const StyledLayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface ILayerContainerProps extends IMultiAnyChildProps {
  id?: string;
  className: string;
}

export const LayerContainer = (props: ILayerContainerProps): React.ReactElement => {
  const children = React.Children.toArray(props.children).filter((child: React.ReactNode): boolean => child !== null);
  return (
    <StyledLayerContainer
      id={props.id}
      className={getClassName(LayerContainer.displayName, props.className)}
    >
      { children.map((child: React.ReactNode, index: number): React.ReactElement => (
        <StyledLayer
          id={props.id && `${props.id}-layer-${index}`}
          className={getClassName(StyledLayer.displayName, props.className)}
          key={index}
        >
          {child}
        </StyledLayer>
      ))}
    </StyledLayerContainer>
  );
};

LayerContainer.defaultProps = {
  className: '',
};
LayerContainer.displayName = 'layer-container';
