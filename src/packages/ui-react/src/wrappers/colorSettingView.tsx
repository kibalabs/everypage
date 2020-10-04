import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from './wrapperProps';
import { ColorProvider, useAlternateColors } from '../theming';
import { IColorGuide } from '../subatoms';
import { colorsToCss } from '../util';

interface IStyledColorSettingViewProps extends IWrapperProps {
  colors: Partial<IColorGuide>;
}

const withColorSettingView = (Component: React.ComponentType<IStyledColorSettingViewProps>): React.ComponentType => styled(Component)<IStyledColorSettingViewProps>`
  ${(props: IStyledColorSettingViewProps): string => colorsToCss(props.colors)};
`;

const StyledColorSettingView = withColorSettingView((props: IStyledColorSettingViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })))
});

export interface IColorSettingViewProps extends IWrapperProps {
  theme?: Partial<IColorGuide>;
  variant?: string;
}

export const ColorSettingView = (props: IColorSettingViewProps): React.ReactElement => {
  const colors = props.theme || useAlternateColors(props.variant);

  return (
    <ColorProvider colors={colors}>
      <StyledColorSettingView
        className={getClassName(ColorSettingView.displayName, props.className)}
        colors={colors}
      >
        {props.children}
      </StyledColorSettingView>
    </ColorProvider>
  );
};

ColorSettingView.defaultProps = {
  ...defaultWrapperProps,
};
ColorSettingView.displayName = 'color-setting-view';
