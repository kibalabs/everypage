import React from 'react';
import styled from 'styled-components';

import { ThemeType, useTheme } from '../../theming';
import { IComponentProps, defaultComponentProps } from '../componentProps';


export interface IImageTheme extends ThemeType {
}

export interface IStyledImageProps {
  theme: IImageTheme;
  fitType: 'crop' | 'scale';
}

const StyledImage = styled.img<IStyledImageProps>`
  width: 100%;
  height: 100%;
  object-fit: ${(props: IStyledImageProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};
`;

export interface IImageProps extends IComponentProps<IImageTheme> {
  source: string;
  alternativeText: string;
  fitType: 'crop' | 'scale';
}

export const Image = (props: IImageProps): React.ReactElement => {
  const theme = props.theme || useTheme('images', props.mode);
  return (
    <StyledImage
      id={props.id}
      className={`image ${props.className}`}
      theme={theme}
      src={props.source}
      alt={props.alternativeText}
      fitType={props.fitType}
    />
  );
};

Image.defaultProps = {
  ...defaultComponentProps,
  fitType: 'scale',
};
