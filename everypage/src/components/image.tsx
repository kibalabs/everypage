import React from 'react';
import styled from 'styled-components';

// import { useTheme } from '../themes';
// import { IAtomProps, defaultAtomProps } from './atomProps';
// import { ThemeType } from '../util';


// export interface IImageThemeStatusAction extends ThemeType {
// }

// export interface IImageThemeStatus extends ThemeType {
//   default: IImageThemeStatusAction;
// }

// export interface IImageTheme extends ThemeType {
//   normal: IImageThemeStatus;
// }

export interface IStyledImageProps {
  // theme: IImageTheme;
  fitType: 'crop' | 'scale';
}

const StyledImage = styled.img<IStyledImageProps>`
  width: 100%;
  height: 100%;
  object-fit: ${(props: IStyledImageProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};
`;

export interface IImageProps {//extends IAtomProps<IImageTheme> {
  source: string;
  alternativeText: string;
  fitType: 'crop' | 'scale';
}

export const Image = (props: IImageProps): React.ReactElement => {
  // const theme = props.theme || useTheme('images', props.mode);
  return (
    <StyledImage
      // id={props.id}
      // className={`image ${props.className}`}
      // theme={theme}
      src={props.source}
      alt={props.alternativeText}
      fitType={props.fitType}
    />
  );
};

Image.displayName = 'Image';
Image.defaultProps = {
  // ...defaultAtomProps,
  fitType: 'scale',
};
