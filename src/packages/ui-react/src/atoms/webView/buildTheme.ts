import { RecursivePartial } from '@kibalabs/core';
import { darken, lighten } from 'polished';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme } from '../../subatoms';
import { IWebViewTheme } from './theme';

export const buildWebViewThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IWebViewTheme>>): ThemeMap<IWebViewTheme> => {
  const defaultWebViewTheme = mergeTheme<IWebViewTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, {
        }),
      },
    },
  }, base?.default);

  return {
    ...base,
    default: defaultWebViewTheme,
  };
}
