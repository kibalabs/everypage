import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, ITextTheme } from '../../subatoms';
import { IBulletTextTheme } from './theme';

export const buildBulletTextThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, base: RecursivePartial<Record<string, IBulletTextTheme>>): ThemeMap<IBulletTextTheme> => {
  const defaultBulletTextTheme = mergeTheme<IBulletTextTheme>({
    normal: {
      default: {
          text: mergeTheme(textThemes.default, {
        }),
        bullet: {
          color: colors.text,
          content: '"•"',
          margin: `0 ${dimensions.padding} 0 -${dimensions.padding}`,
          'font-weight': 'bold',
        }
      },
    },
  }, base?.default);

  return {
    ...base,
    default: defaultBulletTextTheme,
  };
}
