import { darken, transparentize } from 'polished';

import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../subatoms';
import { IButtonTheme } from './theme';

export const buildButtonThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IButtonTheme>>): ThemeMap<IButtonTheme> => {
  const defaultButtonTheme = mergeTheme<IButtonTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
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

  const primaryButtonTheme = mergeThemePartial<IButtonTheme>({
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

  const secondaryButtonTheme = mergeThemePartial<IButtonTheme>({
    normal: {
      default: {
        background: {
          'border-color': colors.brandPrimary,
        },
      },
    },
  }, base?.secondary);

  return {
    default: defaultButtonTheme,
    primary: primaryButtonTheme,
    secondary: secondaryButtonTheme,
    tertiary: defaultButtonTheme,
  };
}
