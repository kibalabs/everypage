import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { ILoadingSpinnerTheme } from './theme';

export const buildLoadingSpinnerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, ILoadingSpinnerTheme>>): ThemeMap<ILoadingSpinnerTheme> => {
  const defaultLoadingSpinnerTheme: ILoadingSpinnerTheme = mergeTheme({
    'color': colors.brandPrimary,
  }, base?.default);

  const lightLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    'color': 'white',
  }, base?.light);

  const darkLoadingSpinnerTheme = mergeThemePartial<ILoadingSpinnerTheme>({
    'color': 'black',
  }, base?.dark);

  return {
    default: defaultLoadingSpinnerTheme,
    light: lightLoadingSpinnerTheme,
    dark: darkLoadingSpinnerTheme,
  };
}
