import * as merge from 'deepmerge';

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

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends (object | undefined) ? RecursivePartial<T[P]> : T[P];
};

export type ThemeType = {
  [key: string]: Readonly<string | number | ThemeType | RecursivePartial<ThemeType>>;
}

export function mergeTheme<ThemeType>(baseTheme: ThemeType, themeValues?: RecursivePartial<ThemeType>, overrideTheme?: RecursivePartial<ThemeType>): ThemeType {
  // @ts-ignore
  return merge(merge(baseTheme, themeValues || {}), overrideTheme || {});
}
