import React from 'react';
import styled from 'styled-components';

export interface IStyledImageProps {
  fitType: 'crop' | 'scale';
}

const StyledImage = styled.img<IStyledImageProps>`
  width: 100%;
  height: 100%;
  object-fit: ${(props: IStyledImageProps): string => (props.fitType === 'crop' ? 'cover' : 'fill')};
`;

export interface IImageProps {
  source: string;
  alternativeText: string;
  fitType: 'crop' | 'scale';
}

export const Image = (props: IImageProps): React.ReactElement => {
  return (
    <StyledImage
      src={props.source}
      alt={props.alternativeText}
      fitType={props.fitType}
    />
  );
};

Image.displayName = 'Image';
Image.defaultProps = {
  fitType: 'scale',
};
