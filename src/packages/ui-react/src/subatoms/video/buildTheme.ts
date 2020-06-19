import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IVideoTheme } from './theme';

export const buildVideoThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, IVideoTheme>>): ThemeMap<IVideoTheme> => {
  const defaultVideoTheme: IVideoTheme = mergeTheme({
  }, base?.default);

  return {
    default: defaultVideoTheme,
  };
}
