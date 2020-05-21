import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps, ThemeType, useTheme } from '..';


export interface IImageTheme extends ThemeType {
}

export interface IStyledImageProps {
  theme: IImageTheme;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'scale';
}

const StyledImage = styled.img<IStyledImageProps>`
  width: ${(props: IStyledImageProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledImageProps): string => (props.isFullHeight ? '100%' : 'auto')};
  max-width: 100%;
  max-height: 100%;
  object-fit: ${(props: IStyledImageProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};
`;

const StyledVideo = styled.video<IStyledImageProps>`
  width: ${(props: IStyledImageProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledImageProps): string => (props.isFullHeight ? '100%' : 'auto')};
  max-width: 100%;
  max-height: 100%;
  object-fit: ${(props: IStyledImageProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};
`;

export interface IImageProps extends IComponentProps<IImageTheme> {
  source: string;
  alternativeText: string;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'scale';
}

export const Image = (props: IImageProps): React.ReactElement => {
  const theme = props.theme || useTheme('images', props.mode);

  const isVideo = (): boolean => {
    const fileExtension = props.source.split('.').pop().toLowerCase();
    return fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg';
  }

  return isVideo() ? (
    <StyledVideo
      id={props.id}
      className={`image ${props.className}`}
      theme={theme}
      autoPlay={true}
      muted={true}
      playsInline={true}
      controls={false}
      loop={true}
      fitType={props.fitType}
      isFullWidth={props.isFullWidth}
      isFullHeight={props.isFullHeight}
    >
      <source src={props.source} />
      {props.alternativeText}
    </StyledVideo>
  ) : (
    <StyledImage
      id={props.id}
      className={`image ${props.className}`}
      theme={theme}
      src={props.source}
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
};
