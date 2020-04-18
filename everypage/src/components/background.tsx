import React from 'react';
import styled from 'styled-components';

import { ISingleAnyChildProps } from '../util';


export interface IBackgroundLayer {
  solidColor?: string;
  linearGradient?: string;
  radialGradient?: string;
  image?: string;
  pattern?: string;
}

// Allow someone to use a single background instead of specifying layers
export interface IBackgroundConfig extends IBackgroundLayer {
  layers?: IBackgroundLayer[];
}


export interface IBackgroundProps extends IBackgroundConfig, ISingleAnyChildProps {
  id?: string;
  className: string;
}

const getBackgroundCss = (backgroundLayer: IBackgroundLayer): string => {
  let output = '';
  if (backgroundLayer.solidColor) {
    output += `background-color: ${backgroundLayer.solidColor};`;
  }
  if (backgroundLayer.linearGradient) {
    output += `background-image: linear-gradient(${backgroundLayer.linearGradient});`;
  }
  if (backgroundLayer.radialGradient) {
    output += `background-image: radial-gradient(${backgroundLayer.radialGradient});`;
  }
  if (backgroundLayer.image) {
    output += `background-image: url(${backgroundLayer.image}); background-size: cover;`;
  }
  if (backgroundLayer.pattern) {
    output += `background-image: url(${backgroundLayer.pattern}); background-position: top left, center center; background-repeat: repeat, no-repeat; background-size: auto, cover;`;
  }
  return output;
}

const StyledBackground = styled.div<{backgroundLayer: IBackgroundLayer}>`
  ${(props) => getBackgroundCss(props.backgroundLayer)};
`;

export const Background = (props: IBackgroundProps): React.ReactElement => {
  let layers = props.layers || [];
  if (props.solidColor || props.linearGradient || props.radialGradient || props.image || props.pattern) {
    layers.splice(0, 0, {
      solidColor: props.solidColor,
      linearGradient: props.linearGradient,
      radialGradient: props.radialGradient,
      image: props.image,
      pattern: props.pattern,
    });
  }
  let child: React.ReactElement = <React.Fragment>{ props.children }</React.Fragment>;
  layers.reverse().forEach((backgroundLayer: IBackgroundLayer) => {
    child = (
      <StyledBackground
        className={'background-layer'}
        backgroundLayer={backgroundLayer}
      >
        { child }
      </StyledBackground>
    )
  });
  return child;
}

Background.defaultProps = {
  className: '',
};
