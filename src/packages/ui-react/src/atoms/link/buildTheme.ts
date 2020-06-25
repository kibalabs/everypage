import { RecursivePartial } from '@kibalabs/core';
import { darken, lighten } from 'polished';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../subatoms';
import { ILinkTheme } from './theme';

export const buildLinkThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, ILinkTheme>>): ThemeMap<ILinkTheme> => {
  const defaultLinkTheme = mergeTheme<ILinkTheme>({
    normal: {
      default: {
        text: mergeTheme(textThemes.default, {
          'color': colors.brandPrimary,
          'text-decoration': 'underline',
        }),
        background: mergeTheme(boxThemes.default, {
        }),
      },
      hover: {
        text: {
          'color': colors.brandSecondary,
        },
      },
    },
    disabled: {
      default: {
        text: {
          'color': colors.disabled,
        },
      },
    },
    visited: {
      default: {
        text: {
          'color': darken(0.2, colors.brandPrimary),
        },
      },
    },
  }, base?.default);

  const inverseLinkTheme = mergeThemePartial<ILinkTheme>({
    normal: {
      default: {
        text: {
          'color': colors.brandPrimaryInverse,
        }
      },
      hover: {
        text: {
          'color': colors.brandSecondaryInverse,
        },
      },
    },
    visited:  {
      default: {
        text: {
          'color': lighten(0.2, colors.brandPrimaryInverse),
        }
      },
      hover: {
        text: {
          'color': colors.brandSecondaryInverse,
        },
      },
    },
  }, base?.inverse);

  return {
    default: defaultLinkTheme,
    inverse: inverseLinkTheme,
  };
}
