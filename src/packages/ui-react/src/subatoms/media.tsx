import React from 'react';

import { IComponentProps, defaultComponentProps, ThemeType } from '..';
import { Video, Image } from '.';


export interface IMediaTheme extends ThemeType {
}

export interface IStyledMediaProps {
  theme: IMediaTheme;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'scale';
}

export interface IMediaProps extends IComponentProps<IMediaTheme> {
  source: string;
  alternativeText: string;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'scale';
  isLazyLoadable: boolean;
}

export const Media = (props: IMediaProps): React.ReactElement => {
  const isVideo = (): boolean => {
    const fileExtension = props.source.split('.').pop().toLowerCase();
    return fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg';
  }

  return isVideo() ? (
    <Video {...props} />
  ) : (
    <Image {...props} />
  );
};

Media.defaultProps = {
  ...defaultComponentProps,
  fitType: 'scale',
  isFullWidth: false,
  isFullHeight: false,
  isLazyLoadable: true,
};
