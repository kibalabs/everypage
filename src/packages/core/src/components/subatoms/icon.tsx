import React from 'react';
import styled from 'styled-components';


interface IIconProps {
  size?: 'default' | 'small' | 'large' | 'full';
  _color?: string;
}

interface IBaseIconProps extends IIconProps {
  svgContent: string;
  contentOriginX: number;
  contentOriginY: number;
  contentHeight: number;
  contentWidth: number;
}

interface IStyledBaseIconProps {
  color?: string;
  size: 'default' | 'small' | 'large' | 'full';
}

const getSize = (size: string): string => {
  switch (size) {
    case 'small': {
      return '0.75em';
    }
    case 'large': {
      return '2em';
    }
    case 'full': {
      return '100%';
    }
    default: {
      return '1.3em';
    }
  }
}

const StyledBaseIcon = styled.svg<IStyledBaseIconProps>`
  fill: ${(props: IStyledBaseIconProps): string => props.color ? props.color : 'currentColor'};
  width: ${(props: IStyledBaseIconProps): string => getSize(props.size)};
  height: ${(props: IStyledBaseIconProps): string => getSize(props.size)};
`;


export const BaseIcon = (props: IBaseIconProps): React.ReactElement => {
  return (
    <StyledBaseIcon
      size={props.size}
      color={props._color}
      viewBox={`${props.contentOriginX} ${props.contentOriginY} ${props.contentHeight} ${props.contentWidth}`}
      width={props.contentWidth}
      height={props.contentHeight}
      dangerouslySetInnerHTML={{ __html: props.svgContent }}
    />
  );
};

BaseIcon.defaultProps = {
  contentOriginX: 0,
  contentOriginY: 0,
};

export const CloseIcon = (props: IIconProps): React.ReactElement => {
  return (
    <BaseIcon
      size={props.size}
      _color={props._color}
      contentWidth={24}
      contentHeight={24}
      svgContent='<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>'
    />
  );
}

export const AddIcon = (props: IIconProps): React.ReactElement => {
  return (
    <BaseIcon
      size={props.size}
      _color={props._color}
      contentWidth={24}
      contentHeight={24}
      svgContent='<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/>'
    />
  );
}

export const DragHandleIcon = (props: IIconProps): React.ReactElement => {
  return (
    <BaseIcon
      size={props.size}
      _color={props._color}
      contentWidth={24}
      contentHeight={24}
      svgContent='<path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>'
    />
  );
}

export const TwitterIcon = (props: IIconProps): React.ReactElement => {
  return (
    <BaseIcon
      size={props.size}
      _color={props._color}
      contentWidth={400}
      contentHeight={400}
      svgContent='<path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/>'
    />
  );
}

export const ProductHuntIcon = (props: IIconProps): React.ReactElement => {
  return (
    <BaseIcon
      size={props.size}
      _color={props._color}
      contentWidth={48}
      contentHeight={48}
      svgContent='<path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44.0001 24 44.0001C35.0457 44.0001 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM26.6667 28.0001L21 28.0001V34.0001H17V14.0001L26.6668 14.0002V14.0001C30.5328 14.0001 33.6667 17.1342 33.6667 21.0001C33.6667 24.8661 30.5327 28.0001 26.6667 28.0001Z" /><path d="M26.6667 18.0001L21 18.0002V24.0002H26.6667V24.0001C28.3235 24.0001 29.6666 22.657 29.6666 21.0001C29.6666 19.3433 28.3235 18.0002 26.6667 18.0001Z"/>'
    />
  );
}

export const ChatIcon = (props: IIconProps): React.ReactElement => {
  return (
    <BaseIcon
      size={props.size}
      _color={props._color}
      contentWidth={48}
      contentHeight={48}
      svgContent='<path d="M10.5252 41.6092H7.83634L9.73765 39.6051C10.7628 38.5245 11.403 37.1191 11.5751 35.5944C7.18495 32.5577 5 28.1583 5 23.5463C5 15.0376 12.4193 6.39078 24.0387 6.39078C36.3482 6.39078 42.9487 14.3475 42.9487 22.8008C42.9487 31.3099 36.2784 39.2613 24.0387 39.2613C21.8946 39.2613 19.6572 38.9596 17.6596 38.406C15.7687 40.4504 13.2067 41.6092 10.5252 41.6092V41.6092Z"/>'
    />
  );
}
