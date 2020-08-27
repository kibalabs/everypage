import React from 'react';
import { RecursivePartial} from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { ITheme } from '..';
import { mergeTheme, ThemeType, ThemeValue } from '../util';
import { IColorGuide } from '../subatoms/colors';
import { IDimensionGuide } from '../subatoms/dimensions';

export const ThemeContext = React.createContext<ITheme | null>(null);

interface IThemeProviderProps extends ISingleAnyChildProps {
  theme: ITheme;
}

export const ThemeProvider = (props: IThemeProviderProps): React.ReactElement => {
  return (
    <ThemeContext.Provider value={props.theme}>
      <ColorProvider colors={props.theme.colors}>
        {props.children}
      </ColorProvider>
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

export function useBaseColors(): IColorGuide {
  const theme = useTheme();
  return theme.colors;
}

export function useAlternateColors(name?: string): Partial<IColorGuide> {
  if (name === undefined) {
    return useColors();
  }
  const theme = useTheme();
  if (name === 'default') {
    return theme.colors;
  }
  if (!(name in theme.alternateColors)) {
    console.error(`Unrecognized color mode requested: ${name}`);
    return theme.colors;
  }
  return theme.alternateColors[name];
}

export const ColorContext = React.createContext<IColorGuide | null>(null);

interface IColorProviderProps extends ISingleAnyChildProps {
  colors: IColorGuide;
}

export const ColorProvider = (props: IColorProviderProps): React.ReactElement => {
  return (
    <ColorContext.Provider value={props.colors}>
      {props.children}
    </ColorContext.Provider>
  );
}

export function useColors(): IColorGuide {
  let colors = React.useContext(ColorContext);
  if (!colors) {
    colors = useBaseColors();
  }
  return colors;
}

export const useBuiltTheme = <Theme extends ThemeType>(component: string, mode: string, override?: RecursivePartial<Theme>): Theme => {
  const theme = useTheme();
  const colors = useColors();
  const dimensions = useDimensions();
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
    let builtTheme = mergeTheme(componentThemes.default, ...themeParts);
    // Resolving reference values is only here because ie 11 doesn't support css vars
    if (isIe()) {
      builtTheme = resolveThemeValues(builtTheme, colors, dimensions);
    }
    return builtTheme;
  }, [theme, mode, override]);
}

const isIe = (): boolean => {
  return typeof document !== 'undefined' && !!document.documentMode;
}

const resolveThemeValues = (theme: ThemeType, colors: IColorGuide, dimensions: IDimensionGuide): ThemeType => {
  const derivedThemes = Object.keys(theme).reduce((currentMap: ThemeType, themeKey: string): ThemeType => {
    const value = theme[themeKey];
    let themeValue: ThemeValue;
    if (typeof value === 'string') {
      if (value.startsWith('$')) {
        const strippedValue = value.substring(1);
        const strippedValueParts = strippedValue.split('.');
        const referenceType = strippedValueParts[0];
        const referenceValue = strippedValueParts[1];
        if (referenceType === 'colors') {
          themeValue = colors[referenceValue];
        } else if (referenceType === 'dimensions') {
          themeValue = dimensions[referenceValue];
        } else {
          console.error(`Unknown reference used: ${referenceType} (${value})`)
          themeValue = value;
        }
      } else {
        themeValue = value;
      }
    } else if (typeof value === 'object') {
      themeValue = resolveThemeValues(value, colors, dimensions);
    }
    currentMap[themeKey] = themeValue;
    return currentMap;
  }, {});
  return derivedThemes;
}
