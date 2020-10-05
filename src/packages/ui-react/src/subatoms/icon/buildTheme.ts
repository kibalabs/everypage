import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, ThemeMap, mergeThemePartial } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IIconTheme } from './theme';
import { IBoxTheme } from '../box';

export const buildIconThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IIconTheme>>): ThemeMap<IIconTheme> => {
  const defaultIconTheme = mergeTheme<IIconTheme>({
    size: '1.3rem',
  }, base?.default);

  const smallIconTheme = mergeThemePartial<IIconTheme>({
    size: '0.75rem',
  });

  const largeIconTheme = mergeThemePartial<IIconTheme>({
    size: '2rem',
  });

  const extraLargeIconTheme = mergeThemePartial<IIconTheme>({
    size: '4rem',
  });

  const extraExtraLargeIconTheme = mergeThemePartial<IIconTheme>({
    size: '8rem',
  });

  const fullIconTheme = mergeThemePartial<IIconTheme>({
    size: '100%',
  });


  return {
    ...base,
    default: defaultIconTheme,
    smallIconTheme: smallIconTheme,
    largeIconTheme: largeIconTheme,
    extraLargeIconTheme: extraLargeIconTheme,
    extraExtraLargeIconTheme: extraExtraLargeIconTheme,
    fullIconTheme: fullIconTheme,
  };
}
