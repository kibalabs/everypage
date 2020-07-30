import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IImageTheme } from './theme';

export const buildImageThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, IImageTheme>>): ThemeMap<IImageTheme> => {
  const defaultImageTheme = mergeTheme<IImageTheme>({
  }, base?.default);

  return {
    ...base,
    default: defaultImageTheme,
  };
}
