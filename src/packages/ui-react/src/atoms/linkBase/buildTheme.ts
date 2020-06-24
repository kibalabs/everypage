import { transparentize } from 'polished';

import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme } from '../../subatoms';
import { ILinkBaseTheme } from './theme';

export const buildLinkBaseThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, ILinkBaseTheme>>): ThemeMap<ILinkBaseTheme> => {
  const defaultLinkBaseTheme = mergeTheme<ILinkBaseTheme>({
    normal: {
      default: mergeTheme({
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
        }),
        linkBase: {
          opacity: '1',
        },
      }),
      hover: {
        background: {
          'background-color': transparentize(0.8, colors.brandPrimary),
        },
      },
      press: {
        background: {
          'background-color': transparentize(0.6, colors.brandPrimary),
        },
      },
      focus: {
        background: boxThemes.focussed,
      },
    },
    disabled: {
      default: {
        background: {
          'background-color': '#999999',
        },
      },
    },
  }, base?.default);

  const translucentLinkBaseTheme = mergeThemePartial<ILinkBaseTheme>({
    normal: {
    },
  }, base?.translucent);

  const imageLinkBaseTheme = mergeThemePartial<ILinkBaseTheme>({
    normal: {
      hover: {
        linkBase: {
          opacity: '0.8',
        },
      },
      press: {
        linkBase: {
          opacity: '0.6',
        },
      },
    },
  }, base?.translucent);

  return {
    default: defaultLinkBaseTheme,
    translucent: translucentLinkBaseTheme,
    image: imageLinkBaseTheme,
  };
}
