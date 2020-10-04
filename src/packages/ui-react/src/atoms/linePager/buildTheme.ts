import { RecursivePartial } from '@kibalabs/core';
import { darken, transparentize } from 'polished';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme } from '../../subatoms';
import { ILinePagerTheme } from './theme';

export const buildLinePagerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, ILinePagerTheme>>): ThemeMap<ILinePagerTheme> => {
  const defaultLinePagerTheme = mergeTheme<ILinePagerTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'padding': dimensions.paddingNarrow3,
          'background-color': '#f0f0f0',
        }),
      },
      hover: {
        background: {
          'background-color': transparentize(0.9, colors.brandPrimary),
        },
      },
      press: {
        background: {
          'background-color': transparentize(0.8, colors.brandPrimary),
        },
      },
      focus: {
        background: boxThemes.focussed,
      },
    },
    active: {
      default: {
        background: {
          'background-color': colors.brandPrimary,
        },
      },
    },
  }, base?.default);

  const primaryLinePagerTheme = mergeThemePartial<ILinePagerTheme>({
    normal: {
      default: {
        background: {
          'background-color': colors.brandPrimary,
          'border-color': colors.brandPrimary,
        },
      },
      hover: {
        background: {
          'background-color': colors.brandSecondary,
        },
      },
      press: {
        background: {
          'background-color': darken(0.1, colors.brandSecondary),
        },
      },
    },
  }, base?.primary);

  const secondaryLinePagerTheme = mergeThemePartial<ILinePagerTheme>({
    normal: {
      default: {
        background: {
          'border-color': colors.brandPrimary,
        },
      },
    },
  }, base?.secondary);

  const largeLinePagerTheme = mergeThemePartial<ILinePagerTheme>({
    normal: {
      default: {
        background: {
          'padding': dimensions.padding,
        },
      },
    },
  }, base?.large);

  const smallLinePagerTheme = mergeThemePartial<ILinePagerTheme>({
    normal: {
      default: {
        background: {
          'padding': dimensions.paddingNarrow4,
        },
      },
    },
  }, base?.small);

  const cardLinePagerTheme = mergeThemePartial<ILinePagerTheme>({
    normal: {
      default: {
        background: {
          'box-shadow': boxThemes.card['box-shadow'],
          'margin': boxThemes.card['margin'],
        },
      },
    },
  }, base?.card);

  return {
    ...base,
    default: defaultLinePagerTheme,
    primary: primaryLinePagerTheme,
    secondary: secondaryLinePagerTheme,
    tertiary: defaultLinePagerTheme,
    large: largeLinePagerTheme,
    small: smallLinePagerTheme,
    card: cardLinePagerTheme,
  };
}
