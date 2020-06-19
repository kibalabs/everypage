import { transparentize } from 'polished';

import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme } from '../../subatoms';
import { ILinkBaseTheme } from './theme';

export const buildLinkBaseThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, ILinkBaseTheme>>): ThemeMap<ILinkBaseTheme> => {
  const defaultLinkBaseTheme = mergeTheme<ILinkBaseTheme>({
    normal: {
      default: mergeTheme({
        background: mergeTheme(boxThemes.default, {
        }),
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
      focus: {
        background: boxThemes.focussed,
      },
    },
  }, base?.default);

  const translucentLinkBaseTheme = mergeThemePartial<ILinkBaseTheme>({
    normal: {
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
    },
  }, base?.translucent);

  return {
    default: defaultLinkBaseTheme,
    translucent: translucentLinkBaseTheme,
  };
}
