import React from 'react';
import styled from 'styled-components';
import * as Polished from 'polished';

import { IComponentProps, defaultComponentProps, themeToCss, CssTheme, useTheme } from '..';
import { ISingleAnyChildProps } from '../../util';


export interface IBoxTheme extends CssTheme {
  'background-color': string;
  'border-radius': string;
  'border-color': string;
  'border-width': string;
  'border-style': string;
  'padding': string;
  'box-shadow': string;
  'margin': string;
  'outline-style': string;
  'outline-color': string;
  'outline-width': string;
  'outline-offset': string;
}

interface IStyledBoxProps {
  theme: IBoxTheme;
  height: string;
  width: string;
  blockType: string;
  shouldAllowScrollingVertically: boolean;
  shouldAllowScrollingHorizontally: boolean;
}

const StyledBox = styled.div<IStyledBoxProps>`
  ${(props: IStyledBoxProps): string => themeToCss(props.theme)};
  height: ${(props: IStyledBoxProps): string => props.height};
  width: ${(props: IStyledBoxProps): string => props.width};
  display: ${(props: IStyledBoxProps): string => props.blockType};
  overflow-y: ${(props: IStyledBoxProps): string => (props.shouldAllowScrollingVertically ? 'auto' : 'hidden')};
  overflow-x: ${(props: IStyledBoxProps): string => (props.shouldAllowScrollingHorizontally ? 'auto' : 'hidden')};
  outline: none;
`;

interface IBoxProps extends IComponentProps<IBoxTheme>, ISingleAnyChildProps {
  height?: string;
  width?: string;
  isFullHeight: boolean;
  isFullWidth: boolean;
  shouldAllowScrollingVertically: boolean;
  shouldAllowScrollingHorizontally: boolean;
}

export const Box = (props: IBoxProps): React.ReactElement => {
  const theme = props.theme || useTheme('boxes', props.mode);
  let width = props.width || (props.isFullWidth ? `100%` : 'auto');
  let height = props.height || (props.isFullHeight ? `100%` : 'auto');
  const blockType = width === '100%' ? 'block' : 'inline-block';
  if (theme.margin) {
    const margin = Polished.margin(...theme.margin.split(' '));
    console.log('margin', margin);
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
      className={`box ${props.className}`}
      theme={theme}
      height={height}
      width={width}
      blockType={blockType}
      shouldAllowScrollingVertically={props.shouldAllowScrollingVertically}
      shouldAllowScrollingHorizontally={props.shouldAllowScrollingHorizontally}
    >
      {props.children}
    </StyledBox>
  );
};

Box.defaultProps = {
  ...defaultComponentProps,
  isFullHeight: false,
  isFullWidth: true,
  shouldAllowScrollingVertically: false,
  shouldAllowScrollingHorizontally: false,
};
