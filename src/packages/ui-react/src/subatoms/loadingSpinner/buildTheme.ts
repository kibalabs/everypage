import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { ILoadingSpinnerTheme } from './theme';

export const buildLoadingSpinnerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, ILoadingSpinnerTheme>>): ThemeMap<ILoadingSpinnerTheme> => {
  const defaultLoadingSpinnerTheme = mergeTheme<ILoadingSpinnerTheme>({
    'color': colors.brandPrimary,
  }, base?.default);

  const lightLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    'color': 'white',
  }, base?.light);

  const darkLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    'color': 'black',
  }, base?.dark);

  return {
    ...base,
    default: defaultLoadingSpinnerTheme,
    light: lightLoadingSpinnerTheme,
    dark: darkLoadingSpinnerTheme,
  };
}
