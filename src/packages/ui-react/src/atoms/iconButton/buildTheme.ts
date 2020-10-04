import { RecursivePartial } from '@kibalabs/core';

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
        }),
      },
      hover: {
        background: {
          'background-color': '$colors.brandPrimaryClear90',
        },
      },
      press: {
        background: {
          'background-color': '$colors.brandPrimaryClear80',
        },
      },
      focus: {
        background: boxThemes.focussed,
      },
    },
    disabled: {
      default: {
        background: {
          'background-color': '$colors.disabled',
        },
        text: {
          'color': '$colors.disabledText',
        },
      },
    },
  }, base?.default);

  const primaryIconButtonTheme = mergeThemePartial<IIconButtonTheme>({
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
          'background-color': '$colors.brandSecondaryDark10',
        },
      },
    },
  }, base?.primary);

  const secondaryIconButtonTheme = mergeThemePartial<IIconButtonTheme>({
    normal: {
      default: {
        background: {
          'border-color': '$colors.brandPrimary',
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
