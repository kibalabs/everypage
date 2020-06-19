import React from 'react';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { ITheme, ThemeType } from '..';
import { mergeTheme } from '../util';
import { IColorGuide } from '../subatoms/colors';
import { IDimensionGuide } from '../subatoms/dimensions';

export const ThemeContext = React.createContext<ITheme | null>(null);
ThemeContext.xyz = Math.random();

interface IThemeProviderProps extends ISingleAnyChildProps {
  theme: ITheme;
}

export const ThemeProvider = (props: IThemeProviderProps): React.ReactElement => {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ITheme {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return theme;
}

export function useDimensions(): IDimensionGuide {
  const theme = useTheme();
  return theme.dimensions;
}

export function useColors(): IColorGuide {
  const theme = useTheme();
  return theme.colors;
}

export const useBuiltTheme = <Theme extends ThemeType>(component: string, mode: string): Theme => {
  const theme = useTheme();
  const componentThemes = theme[component];
  if (!componentThemes) {
    throw Error(`Could not find component ${component} in current theme. Valid keys are: ${Object.keys(theme)}`);
  }
  let builtTheme: Theme = componentThemes.default;
  let modes = mode.split('-');
  modes = modes.splice(modes.lastIndexOf('default') + 1);
  modes.forEach((mode: string): void => {
    if (!mode) {
      return;
    }
    const modeTheme = componentThemes[mode];
    if (!modeTheme) {
      console.error(`Failed for find mode ${mode} in ${component} themes`);
      return;
    }
    builtTheme = mergeTheme(builtTheme, componentThemes[mode]);
  });
  return builtTheme;
}
