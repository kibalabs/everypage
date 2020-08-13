import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IImageTheme } from './theme';

export interface IStyledImageProps {
  theme: IImageTheme;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'scale';
}

const StyledImage = styled.img<IStyledImageProps>`
  ${(props: IStyledImageProps): string => themeToCss(props.theme.background)};
  display: block;
  pointer-events: none;
  width: ${(props: IStyledImageProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledImageProps): string => (props.isFullHeight ? '100%' : 'auto')};
  object-fit: ${(props: IStyledImageProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};

  &.lazyloaded, &.unlazy {
    max-width: 100%;
    max-height: 100%;
  }

  /* TODO(krish): should all things be like this? */
  &.centered {
    margin-left: auto;
    margin-right: auto;
  }
`;

export interface IImageProps extends IComponentProps<IImageTheme> {
  source: string;
  alternativeText: string;
  isFullWidth: boolean;
  isFullHeight: boolean;
  isCenteredHorizontally: boolean;
  fitType: 'crop' | 'scale';
  isLazyLoadable: boolean;
}

export const Image = (props: IImageProps): React.ReactElement => {
  const theme = useBuiltTheme('images', props.mode, props.theme);
  return (
    <StyledImage
      id={props.id}
      className={getClassName(Image.displayName, props.className, props.isLazyLoadable ? 'lazyload' : 'unlazy', props.isCenteredHorizontally && 'centered')}
      theme={theme}
      src={props.isLazyLoadable ? undefined : props.source}
      data-src={props.source}
      alt={props.alternativeText}
      fitType={props.fitType}
      isFullWidth={props.isFullWidth}
      isFullHeight={props.isFullHeight}
    />
  );
};

Image.defaultProps = {
  ...defaultComponentProps,
  fitType: 'scale',
  isFullWidth: false,
  isFullHeight: false,
  isCenteredHorizontally: false,
  isLazyLoadable: true,
};
Image.displayName = 'image';
