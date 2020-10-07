import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { ILoadingSpinnerTheme } from './theme';

export const buildLoadingSpinnerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, ILoadingSpinnerTheme>>): ThemeMap<ILoadingSpinnerTheme> => {
  const defaultLoadingSpinnerTheme = mergeTheme<ILoadingSpinnerTheme>({
    'color': '$colors.brandPrimary',
    'size': '2rem',
    'width': '0.25em',
  }, base?.default);

  const lightLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    'color': 'white',
  }, base?.light);

  const darkLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    'color': 'black',
  }, base?.dark);

  const smallLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    size: '1rem',
    width: '0.15rem',
  });

  const largeLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    size: '4rem',
    width: '0.5rem',
  });

  const extraLargeLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    size: '8rem',
    width: '1rem',
  });

  const fillLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    size: '100%',
  });

  return {
    ...base,
    default: defaultLoadingSpinnerTheme,
    light: lightLoadingSpinnerTheme,
    dark: darkLoadingSpinnerTheme,
    small: smallLoadingSpinnerTheme,
    large: largeLoadingSpinnerTheme,
    extraLarge: extraLargeLoadingSpinnerTheme,
    fill: fillLoadingSpinnerTheme,
  };
}
