import { merge, mergePartial, RecursivePartial} from '@kibalabs/core';
import { camelCaseToKebabCase } from './stringUtil';

export type CssTheme = {
  [key: string]: Readonly<string>
};

export const resolveValue = (value: string): string => {
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
  const output: string[] = [];
  Object.keys(theme).forEach((key: string): void => {
    output.push(`${key}: ${resolveValue(theme[key])};`);
  });
  return output.join('\n');
};

export const colorsToCss = (colors: Record<string, string>): string => {
  const colorsCss = Object.keys(colors).reduce((css: string, colorKey: string): string => {
    css += `--color-${camelCaseToKebabCase(colorKey)}: ${colors[colorKey]};`
    return css;
  }, '');
  return colorsCss;
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
