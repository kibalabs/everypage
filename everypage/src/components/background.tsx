import React from 'react';
import styled from 'styled-components';

import { useTheme, ISingleAnyChildProps, ThemeType } from '../util';
import { LayerContainer } from './layout';


export interface ILinearGradientTheme extends ThemeType {
  angle: number;
  startColor: string;
  endColor: string;
}

export interface IBackgroundTheme extends ThemeType {
  color?: string;
  linearGradient?: ILinearGradientTheme;
}

export interface IBackgroundProps extends ISingleAnyChildProps {
  theme?: IBackgroundTheme;
  mode?: string;
}

// const StyledColorBackground = styled.div<{theme: string}>`
// width: 100%;
// height: 100%;
// background-color: ${(props): string => props.theme};
// `;

const StyledLinearBackground = styled.div<{linearGradient: ILinearGradientTheme}>`
  width: 100%;
  height: 100%;
  background-image: ${(props): string => `linear-gradient(${props.linearGradient.angle}deg, ${props.linearGradient.startColor}, ${props.linearGradient.endColor})`};
`;

export const Background = (props: IBackgroundProps): React.ReactElement => {
  const theme = props.theme || useTheme<IBackgroundTheme>('backgrounds', props.mode);
  return (
      // {theme.linearGradient && (
        <LayerContainer>
          <StyledLinearBackground linearGradient={theme.linearGradient}>{ props.children }</StyledLinearBackground>
        </LayerContainer>
      // )}
  );
};

Background.defaultProps = {
  mode: 'brandLinearGradient',
}
