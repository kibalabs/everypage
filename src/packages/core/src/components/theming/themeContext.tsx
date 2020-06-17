import React from 'react';

import { ITheme, ThemeType } from '..';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import { mergeTheme } from './util';
import { IDimensionGuide, IColorGuide } from './theme';

export const ThemeContext = React.createContext<ITheme | null>(null);

interface IThemeProviderProps extends ISingleAnyChildProps {
  theme: ITheme;
}

export const ThemeProvider = (props: IThemeProviderProps): React.ReactElement => (
  <ThemeContext.Provider value={props.theme}>
    {props.children}
  </ThemeContext.Provider>
);

export function useTheme(): ITheme {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return theme;
}

export function useDimensions(): IDimensionGuide {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return theme.dimensions;
}

export function useColors(): IColorGuide {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
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
    builtTheme = mergeTheme(builtTheme, componentThemes[mode]);
  });
  return builtTheme;
}
