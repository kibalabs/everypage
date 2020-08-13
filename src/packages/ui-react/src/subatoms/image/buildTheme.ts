import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, ThemeMap, mergeThemePartial } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IImageTheme } from './theme';
import { IBoxTheme } from '../box';

export const buildImageThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IImageTheme>>): ThemeMap<IImageTheme> => {
  const defaultImageTheme = mergeTheme<IImageTheme>({
    background: boxThemes.default,
  }, base?.default);

  const circularImageTheme = mergeThemePartial<IImageTheme>({
    background: {
      'border-radius': '50%',
    }
  }, base?.circular);

  const profileImageTheme = mergeThemePartial<IImageTheme>(circularImageTheme, base?.profile);

  return {
    ...base,
    default: defaultImageTheme,
    profile: profileImageTheme,
    circular: circularImageTheme,
  };
}
