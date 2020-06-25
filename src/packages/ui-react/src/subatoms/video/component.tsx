import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, useBuiltTheme } from '../..';
import { IVideoTheme } from './theme';

export interface IStyledVideoProps {
  theme: IVideoTheme;
  isFullWidth: boolean;
  isFullHeight: boolean;
  isCenteredHorizontally: boolean;
  fitType: 'crop' | 'scale';
}

const StyledVideo = styled.video<IStyledVideoProps>`
  display: block;
  width: ${(props: IStyledVideoProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledVideoProps): string => (props.isFullHeight ? '100%' : 'auto')};
  margin-left: ${(props: IStyledVideoProps): string => (props.isCenteredHorizontally ? 'auto' : 'inherit')};
  margin-right: ${(props: IStyledVideoProps): string => (props.isCenteredHorizontally ? 'auto' : 'inherit')};
  max-width: 100%;
  max-height: 100%;
  object-fit: ${(props: IStyledVideoProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};
`;

export interface IVideoProps extends IComponentProps<IVideoTheme> {
  source: string;
  alternativeText: string;
  isFullWidth: boolean;
  isFullHeight: boolean;
  isCenteredHorizontally: boolean;
  fitType: 'crop' | 'scale';
}

export const Video = (props: IVideoProps): React.ReactElement => {
  const theme = props.theme || useBuiltTheme('videos', props.mode);
  return (
    <StyledVideo
      id={props.id}
      className={getClassName('video', props.className)}
      theme={theme}
      autoPlay={true}
      muted={true}
      playsInline={true}
      controls={false}
      loop={true}
      fitType={props.fitType}
      isFullWidth={props.isFullWidth}
      isFullHeight={props.isFullHeight}
      isCenteredHorizontally={props.isCenteredHorizontally}
    >
      <source src={props.source} />
      {props.alternativeText}
    </StyledVideo>
  );
};

Video.defaultProps = {
  ...defaultComponentProps,
  fitType: 'scale',
  isFullWidth: false,
  isFullHeight: false,
  isCenteredHorizontally: false,
};
