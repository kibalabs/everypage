import { RecursivePartial } from '@kibalabs/core';
import { darken, transparentize } from 'polished';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
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
          'color': '$colors.brandPrimary',
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
          'background-color': '$colors.brandPrimary',
          'border-color': '$colors.brandPrimary',
        },
        text: {
          'color': '$colors.textOnBrand',
        },
      },
      hover: {
        background: {
          'background-color': '$colors.brandSecondary',
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
          'border-color': '$colors.brandPrimary',
        },
      },
    },
  }, base?.secondary);

  const largeButtonTheme = mergeThemePartial<IButtonTheme>({
    normal: {
      default: {
        background: {
          'padding': `${dimensions.paddingWide} ${dimensions.paddingExtraWide}`,
        },
        text: {
          'font-size': '1.2em',
        },
      },
    },
  }, base?.large);

  const smallButtonTheme = mergeThemePartial<IButtonTheme>({
    normal: {
      default: {
        background: {
          'padding': `${dimensions.paddingNarrow} ${dimensions.padding}`,
        },
        text: {
          'font-size': '0.8em',
        },
      },
    },
  }, base?.small);

  const cardButtonTheme = mergeThemePartial<IButtonTheme>({
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
    default: defaultButtonTheme,
    primary: primaryButtonTheme,
    secondary: secondaryButtonTheme,
    tertiary: defaultButtonTheme,
    large: largeButtonTheme,
    small: smallButtonTheme,
    card: cardButtonTheme,
  };
}
