import React from 'react';
import styled from 'styled-components';

import { IMultiAnyChildProps } from '../../util';

const StyledLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

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
      className={`layer-container ${props.className}`}
    >
      { children.map((child: React.ReactNode, index: number): React.ReactElement => (
        <StyledLayer
          id={props.id && `${props.id}-layer-${index}`}
          className={`layer ${props.className}`}
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
