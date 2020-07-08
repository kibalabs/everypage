import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

export interface IBackgroundLayer {
  color?: string;
  linearGradient?: string;
  radialGradient?: string;
  imageUrl?: string;
  patternImageUrl?: string;
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

const getLayersCss = (backgroundLayers: IBackgroundLayer[]): string => {
  const backgroundCssList = backgroundLayers.reverse().map((backgroundLayer: IBackgroundLayer): string => getLayerCss(backgroundLayer));
  return backgroundCssList.join(', ');
}

const getLayerCss = (backgroundLayer: IBackgroundLayer): string => {
  let layers = [];
  if (backgroundLayer.color) {
    layers.push(`linear-gradient(${backgroundLayer.color}, ${backgroundLayer.color})`);
  }
  if (backgroundLayer.linearGradient) {
    layers.push(`linear-gradient(${backgroundLayer.linearGradient})`);
  }
  if (backgroundLayer.radialGradient) {
    layers.push(`radial-gradient(${backgroundLayer.radialGradient})`);
  }
  if (backgroundLayer.imageUrl) {
    layers.push(`url(${backgroundLayer.imageUrl}) no-repeat center / cover`);
  }
  if (backgroundLayer.patternImageUrl) {
    layers.push(`url(${backgroundLayer.patternImageUrl}) repeat top left`);
  }
  return layers.join(', ');
}

interface IStyledBackgroundProps {
  backgroundLayers: IBackgroundLayer[];
}

const StyledBackground = styled.div<IStyledBackgroundProps>`
  width: 100%;
  height: 100%;
  background: ${(props: IStyledBackgroundProps): string => getLayersCss(props.backgroundLayers)};
`;

export const Background = (props: IBackgroundProps): React.ReactElement => {
  let layers = props.layers || [];
  if (props.color || props.linearGradient || props.radialGradient || props.imageUrl || props.patternImageUrl || layers.length == 0) {
    layers.splice(0, 0, {
      color: props.color,
      linearGradient: props.linearGradient,
      radialGradient: props.radialGradient,
      imageUrl: props.imageUrl,
      patternImageUrl: props.patternImageUrl,
    });
  }
  return (
    <StyledBackground
      id={props.id}
      className={getClassName(Background.displayName, props.className)}
      backgroundLayers={layers}
    >
      { props.children }
    </StyledBackground>
  );
}

Background.defaultProps = {
  className: '',
  isFullHeight: true,
};
Background.displayName = 'background';
