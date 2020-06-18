import React from 'react';
import styled from 'styled-components';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

export interface IBackgroundLayer {
  color?: string;
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
  isFullHeight: boolean;
}

const getBackgroundCss = (backgroundLayer: IBackgroundLayer): string => {
  let output = '';
  if (backgroundLayer.color) {
    output += `background-color: ${backgroundLayer.color};`;
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
  width: 100%;
  height: 100%;
  ${(props) => getBackgroundCss(props.backgroundLayer)};
`;

// TOD0(krish): this doesn't use the id and classname passed in
export const Background = (props: IBackgroundProps): React.ReactElement => {
  let layers = props.layers || [];
  if (props.color || props.linearGradient || props.radialGradient || props.image || props.pattern || layers.length == 0) {
    layers.splice(0, 0, {
      color: props.color,
      linearGradient: props.linearGradient,
      radialGradient: props.radialGradient,
      image: props.image,
      pattern: props.pattern,
    });
  }
  let child: React.ReactElement = <React.Fragment>{props.children}</React.Fragment>;
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
  isFullHeight: true,
};
