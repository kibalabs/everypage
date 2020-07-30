import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IVideoTheme } from './theme';

export const buildVideoThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, IVideoTheme>>): ThemeMap<IVideoTheme> => {
  const defaultVideoTheme = mergeTheme<IVideoTheme>({
  }, base?.default);

  return {
    ...base,
    default: defaultVideoTheme,
  };
}
