import { RecursivePartial } from '@kibalabs/core';
import { darken, transparentize } from 'polished';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../subatoms';
import { IIconButtonTheme } from './theme';

export const buildIconButtonThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IIconButtonTheme>>): ThemeMap<IIconButtonTheme> => {
  const defaultIconButtonTheme = mergeTheme<IIconButtonTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'padding': `${dimensions.padding} ${dimensions.padding}`,
          'background-color': 'transparent',
        }),
        text: mergeTheme(textThemes.default, {
          'color': colors.brandPrimary,
          'font-weight': '600',
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
    disabled: {
      default: {
        background: {
          'background-color': '#999999',
        },
        text: {
          'color': '#444444',
        },
      },
    },
  }, base?.default);

  const primaryIconButtonTheme = mergeThemePartial<IIconButtonTheme>({
    normal: {
      default: {
        background: {
          'background-color': colors.brandPrimary,
          'border-color': colors.brandPrimary,
        },
        text: {
          'color': colors.textOnBrand,
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

  const secondaryIconButtonTheme = mergeThemePartial<IIconButtonTheme>({
    normal: {
      default: {
        background: {
          'border-color': colors.brandPrimary,
        },
      },
    },
  }, base?.secondary);

  return {
    ...base,
    default: defaultIconButtonTheme,
    primary: primaryIconButtonTheme,
    secondary: secondaryIconButtonTheme,
    tertiary: defaultIconButtonTheme,
  };
}
