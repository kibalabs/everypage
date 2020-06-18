import * as merge from 'deepmerge';

import { RecursivePartial } from './typing';

export type CssTheme = Record<string, Readonly<string>>;

export const themeToCss = (theme?: CssTheme): string => {
  if (!theme) {
    return '';
  }
  const output: string[] = [];
  Object.keys(theme).forEach((key: string): void => {
    output.push(`${key}: ${theme[key]};`);
  });
  return output.join('\n');
};

export type ThemeType = {
  [key: string]: Readonly<string | number | ThemeType | RecursivePartial<ThemeType>>;
}

export interface ThemeMap<Theme extends ThemeType> extends Record<string, RecursivePartial<Theme> | Theme> {
  default: Theme;
};

export function mergeTheme<Theme extends ThemeType>(baseTheme: Theme, themeValues?: RecursivePartial<Theme>, overrideTheme?: RecursivePartial<Theme>): Theme {
  // @ts-ignore
  return merge(merge(baseTheme, themeValues || {}), overrideTheme || {});
}

export function mergeThemePartial<Theme extends ThemeType>(themeValues?: RecursivePartial<Theme>, overrideTheme?: RecursivePartial<Theme>): RecursivePartial<Theme> {
  // @ts-ignore
  return merge(themeValues || {}, overrideTheme || {});
}
