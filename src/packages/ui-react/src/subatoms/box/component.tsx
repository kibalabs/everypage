import React from 'react';
import styled from 'styled-components';
import { margin as calculateMargin } from 'polished';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IBoxTheme } from './theme';

interface IStyledBoxProps {
  theme: IBoxTheme;
  height: string;
  width: string;
  blockType: string;
  isScrollableVertically: boolean;
  isScrollableHorizontally: boolean;
}

const StyledBox = styled.div<IStyledBoxProps>`
  ${(props: IStyledBoxProps): string => themeToCss(props.theme)};
  height: ${(props: IStyledBoxProps): string => props.height};
  width: ${(props: IStyledBoxProps): string => props.width};
  display: ${(props: IStyledBoxProps): string => props.blockType};
  overflow-y: ${(props: IStyledBoxProps): string => (props.isScrollableVertically ? 'auto' : 'hidden')};
  overflow-x: ${(props: IStyledBoxProps): string => (props.isScrollableHorizontally ? 'auto' : 'hidden')};
  outline: none;
`;

interface IBoxProps extends IComponentProps<IBoxTheme>, ISingleAnyChildProps {
  height?: string;
  width?: string;
  isFullHeight: boolean;
  isFullWidth: boolean;
  isScrollableVertically: boolean;
  isScrollableHorizontally: boolean;
}

export const Box = (props: IBoxProps): React.ReactElement => {
  const theme = props.theme || useBuiltTheme('boxes', props.mode);
  let width = props.width || (props.isFullWidth ? `100%` : 'auto');
  let height = props.height || (props.isFullHeight ? `100%` : 'auto');
  const blockType = width === '100%' ? 'block' : 'inline-block';
  if (theme.margin) {
    const margin = calculateMargin(...theme.margin.split(' '));
    if (width === '100%') {
      width = `calc(100% - ${margin.marginLeft} - ${margin.marginRight})`;
    }
    if (height === '100%') {
      width = `calc(100% - ${margin.marginTop} - ${margin.marginBottom})`;
    }
  }
  return (
    <StyledBox
      id={props.id}
      className={getClassName('box', props.className)}
      theme={theme}
      height={height}
      width={width}
      blockType={blockType}
      isScrollableVertically={props.isScrollableVertically}
      isScrollableHorizontally={props.isScrollableHorizontally}
    >
      {props.children}
    </StyledBox>
  );
};

Box.defaultProps = {
  ...defaultComponentProps,
  isFullHeight: false,
  isFullWidth: true,
  isScrollableVertically: false,
  isScrollableHorizontally: false,
};
