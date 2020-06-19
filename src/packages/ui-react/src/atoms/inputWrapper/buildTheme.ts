import { lighten, darken } from 'polished';

import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../subatoms';
import { IInputWrapperTheme } from './theme';

export const buildInputWrapperThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IInputWrapperTheme>>): ThemeMap<IInputWrapperTheme> => {
  const defaultInputWrapperTheme = mergeTheme<IInputWrapperTheme>({
    normal: {
      default: {
        text: textThemes.default,
        errorText: mergeTheme(textThemes.default, {
          'color': 'red',
        }),
        placeholderText: mergeTheme(textThemes.default, {
          'color': '#AAAAAA',
        }),
        background: mergeTheme(boxThemes.default, {
          'background-color': 'white',
          'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
          'border-radius': dimensions.borderRadius,
          'border-width': dimensions.borderWidthNarrow,
          'border-color': darken(0.05, colors.background),
          'border-style': 'solid',
        }),
      },
      hover: {
        background: {
          'border-color': lighten(0.1, colors.brandPrimary),
        },
      },
      focus: {
        background: {
          'border-color': colors.brandPrimary,
        },
      },
    },
    error: {
      default: {
        background: {
          'background-color': lighten(0.9, 'red'),
          'border-color': 'red',
        }
      },
      hover: {
        background: {
          'background-color': lighten(0.9, 'red'),
          'border-color': 'red',
        }
      },
      focus: {
        background: {
          'background-color': lighten(0.9, 'red'),
          'border-color': 'red',
        }
      },
    },
    disabled: {
      default: {
        background: {
          'background-color': '#dddddd',
          'border-color': colors.disabled,
        }
      },
      hover: {
        background: {
          'background-color': '#dddddd',
          'border-color': colors.disabled,
        }
      },
      focus: {
        background: {
          'background-color': '#dddddd',
          'border-color': colors.disabled,
        }
      },
    },
  }, base?.default);

  return {
    default: defaultInputWrapperTheme,
  };
}
