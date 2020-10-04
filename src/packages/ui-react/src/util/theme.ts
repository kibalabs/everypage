import { merge, mergePartial, RecursivePartial} from '@kibalabs/core';
import { camelCaseToKebabCase } from './stringUtil';

export type CssTheme = {
  [key: string]: Readonly<string>
};

export const valueToCss = (value: string): string => {
  if (value.startsWith('$')) {
    const strippedValue = value.substring(1);
    const strippedValueParts = strippedValue.split('.');
    const referenceType = strippedValueParts[0];
    const referenceValue = strippedValueParts[1];
    if (referenceType === 'colors') {
      return `var(--color-${camelCaseToKebabCase(referenceValue)})`;
    }
    if (referenceType === 'dimensions') {
      return `var(--dimension-${camelCaseToKebabCase(referenceValue)})`;
    }
    console.error(`Unknown reference used: ${referenceType} (${value})`)
  }
  return value;
}

export const themeToCss = (theme?: CssTheme): string => {
  if (!theme) {
    return '';
  }
  const output = Object.keys(theme).map((key: string): string => {
    return `${key}: ${valueToCss(theme[key])};`;
  });
  return output.join('\n');
};

export const colorsToCss = (colors: Record<string, string>): string => {
  const output = Object.keys(colors).map((colorKey: string): string => {
    return `--color-${camelCaseToKebabCase(colorKey)}: ${colors[colorKey]};`;
  });
  return output.join('\n');
}

export type ThemeValue = Readonly<string | number | ThemeType | RecursivePartial<ThemeType>>;

export type ThemeType = {
  [key: string]: ThemeValue;
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
