import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IPortalTheme } from './theme';
import { IBoxTheme } from '../box';

export const buildPortalThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IPortalTheme>>): ThemeMap<IPortalTheme> => {
  const defaultPortalTheme = mergeTheme<IPortalTheme>({
    background: mergeTheme(boxThemes.default, boxThemes.transparent, {
      'box-shadow': '0px 8px 8px -6px rgba(0,0,0,0.15)',
    }),
  }, base?.default);

  return {
    ...base,
    default: defaultPortalTheme,
  };
}
