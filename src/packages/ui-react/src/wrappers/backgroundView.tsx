import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { useColors } from '../theming';
import { IColorGuide } from '../subatoms';
import { valueToCss } from '../util';

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

export interface IBackgroundViewProps extends IBackgroundConfig, ISingleAnyChildProps {
  id?: string;
  className: string;
  isFullHeight: boolean;
}

const getLayersCss = (backgroundLayers: IBackgroundLayer[], colors: IColorGuide): string => {
  return backgroundLayers.reverse().map((backgroundLayer: IBackgroundLayer): string => getLayerCss(backgroundLayer, colors)).join(', ');
}

const getLayerCss = (backgroundLayer: IBackgroundLayer, colors: IColorGuide): string => {
  let layers = [];
  // TODO(krish): this resolve doesn't do the "full resolution" thing for IE
  // TODO(krish): resolve values for linear and radial gradients too
  if (backgroundLayer.color) {
    layers.push(`linear-gradient(${valueToCss(backgroundLayer.color)}, ${valueToCss(backgroundLayer.color)})`);
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

interface IStyledBackgroundViewProps extends ISingleAnyChildProps {
  className: string;
  backgroundLayers: IBackgroundLayer[];
  colors: IColorGuide;
}

const withBackground = (Component: React.ComponentType<IStyledBackgroundViewProps>): React.ComponentType => styled(Component)<IStyledBackgroundViewProps>`
  background: ${(props: IStyledBackgroundViewProps): string => getLayersCss(props.backgroundLayers, props.colors)};
`;

const StyledBackgroundView = withBackground((props: IStyledBackgroundViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })))
});

export const BackgroundView = (props: IBackgroundViewProps): React.ReactElement => {
  const colors = useColors();
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
    <StyledBackgroundView
      className={getClassName(BackgroundView.displayName, props.className)}
      backgroundLayers={layers}
      colors={colors}
    >
      { props.children }
    </StyledBackgroundView>
  );
}

BackgroundView.defaultProps = {
  className: '',
  isFullHeight: true,
};
