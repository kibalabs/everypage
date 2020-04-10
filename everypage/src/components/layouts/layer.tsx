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
}

export const LayerContainer = (props: ILayerContainerProps): React.ReactElement => {
  const children = React.Children.toArray(props.children).filter((child: React.ReactNode): boolean => child !== null);
  return (
    <StyledLayerContainer>
      { children.map((child: React.ReactNode, index: number): React.ReactElement => (
        <StyledLayer key={index}>
          {child}
        </StyledLayer>
      ))}
    </StyledLayerContainer>
  );
};

LayerContainer.defaultProps = {
};
