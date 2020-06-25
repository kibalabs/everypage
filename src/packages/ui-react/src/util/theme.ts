import { merge, mergePartial, RecursivePartial} from '@kibalabs/core';

export type CssTheme = {
  [key: string]: Readonly<string>
};

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
};

export interface ThemeMap<Theme extends ThemeType> extends Record<string, RecursivePartial<Theme> | Theme> {
  default: Theme;
};

export function mergeTheme<Theme extends ThemeType>(baseTheme: Theme, ...partialThemes: (RecursivePartial<Theme> | undefined)[]): Theme {
  return merge(baseTheme, ...partialThemes);
}

export function mergeThemePartial<Theme extends ThemeType>(...partialThemes: (RecursivePartial<Theme> | undefined)[]): RecursivePartial<Theme> {
  return mergePartial(...partialThemes);
}
