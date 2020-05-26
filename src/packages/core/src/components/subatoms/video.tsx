import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps, ThemeType, useTheme } from '..';


export interface IVideoTheme extends ThemeType {
}

export interface IStyledVideoProps {
  theme: IVideoTheme;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'scale';
}

const StyledVideo = styled.video<IStyledVideoProps>`
  width: ${(props: IStyledVideoProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledVideoProps): string => (props.isFullHeight ? '100%' : 'auto')};
  max-width: 100%;
  max-height: 100%;
  object-fit: ${(props: IStyledVideoProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};
`;

export interface IVideoProps extends IComponentProps<IVideoTheme> {
  source: string;
  alternativeText: string;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'scale';
}

export const Video = (props: IVideoProps): React.ReactElement => {
  const theme = props.theme || useTheme('videos', props.mode);
  return (
    <StyledVideo
      id={props.id}
      className={`video ${props.className}`}
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
  );
};

Video.defaultProps = {
  ...defaultComponentProps,
  fitType: 'scale',
  isFullWidth: false,
  isFullHeight: false,
};
