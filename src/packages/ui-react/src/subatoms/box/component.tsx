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
  box-sizing: border-box;
  ${(props: IStyledBoxProps): string => themeToCss(props.theme)};
  height: ${(props: IStyledBoxProps): string => props.height};
  width: ${(props: IStyledBoxProps): string => props.width};
  display: ${(props: IStyledBoxProps): string => props.blockType};
  overflow-y: ${(props: IStyledBoxProps): string => (props.isScrollableVertically ? 'auto' : 'initial')};
  overflow-x: ${(props: IStyledBoxProps): string => (props.isScrollableHorizontally ? 'auto' : 'initial')};
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
  // NOTE(krish): this is because width=100% (which is default) won't take margin into account.
  // It shouldn't be needed but kept here just in case
  // if (theme.margin) {
  //   const margin = calculateMargin(...theme.margin.split(' '));
  //   if (width === '100%') {
  //     width = `calc(100% - ${margin.marginLeft}px - ${margin.marginRight}px)`;
  //   }
  //   if (height === '100%') {
  //     width = `calc(100% - ${margin.marginTop}px - ${margin.marginBottom}px)`;
  //   }
  // }
  return (
    <StyledBox
      id={props.id}
      className={getClassName(Box.displayName, props.className)}
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
Box.displayName = 'box';
