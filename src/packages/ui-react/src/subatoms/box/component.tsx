import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IBoxTheme } from './theme';

interface IStyledBoxProps {
  theme: IBoxTheme;
  height: string;
  width: string;
  blockType: string;
}

const StyledBox = styled.div<IStyledBoxProps>`
  box-sizing: border-box;
  height: ${(props: IStyledBoxProps): string => props.height};
  width: ${(props: IStyledBoxProps): string => props.width};
  display: ${(props: IStyledBoxProps): string => props.blockType};
  .scrollableVertically {
    overflow-y: auto;
  }

  .scrollableHorizontally {
    overflow-x: auto;
  }

  ${(props: IStyledBoxProps): string => themeToCss(props.theme)};
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
  const theme = useBuiltTheme('boxes', props.mode, props.theme);
  let width = props.width || (props.isFullWidth ? '100%' : 'auto');
  let height = props.height || (props.isFullHeight ? '100%' : 'auto');
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
      className={getClassName(Box.displayName, props.className, props.isScrollableVertically && 'scrollableVertically', props.isScrollableHorizontally && 'scrollableHorizontally')}
      theme={theme}
      height={height}
      width={width}
      blockType={blockType}
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
