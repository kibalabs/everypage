import React from 'react';
import { RecursivePartial} from '@kibalabs/core';
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

export const useBuiltTheme = <Theme extends ThemeType>(component: string, mode: string, override?: RecursivePartial<Theme>): Theme => {
  const theme = useTheme();
  return React.useMemo((): Theme => {
    const componentThemes = theme[component];
    if (!componentThemes) {
      throw Error(`Could not find component ${component} in current theme. Valid keys are: ${Object.keys(theme)}`);
    }
    let modes = mode.split('-').filter((modePart: string): boolean => modePart.length > 0);
    const themeParts = modes.splice(modes.lastIndexOf('default') + 1).reduce((value: RecursivePartial<Theme>[], mode: string): RecursivePartial<Theme>[] => {
      const modeTheme = componentThemes[mode];
      if (modeTheme) {
        value.push(modeTheme);
      } else {
        console.error(`Failed to find mode ${mode} in ${component} themes`);
      }
      return value;
    }, []);
    if (override) {
      themeParts.push(override);
    }
    const builtTheme = mergeTheme(componentThemes.default, ...themeParts);
    return builtTheme;
  }, [theme, mode, override]);
}
