import { lighten, darken } from 'polished';

import { mergeTheme } from '.';
import { IButtonTheme, IBoxTheme, ITextTheme, IButtonThemeBase, IImageTheme, IInputWrapperTheme, IInputWrapperThemeBase } from '../components';
import { ITheme, IColorGuide, IDimensionGuide } from './theme';


export const buildTheme = (colors: IColorGuide, dimensions: IDimensionGuide): ITheme => {
  const textTheme: ITextTheme = {
    'font-size': '14px',
    'font-family': '"Montserrat", sans-serif',
    'font-weight': 'normal',
    'color': colors.text,
    'line-height': '1.6em',
  };

  const headerTextTheme: ITextTheme = mergeTheme(textTheme, {
    'font-size': '2.5em',
    'font-weight': '700',
    'color': '#171717',
    'line-height': '1.2em',
  });

  const transparentBoxTheme: IBoxTheme = {
    'background-color': 'transparent',
    'border-radius': '0',
    'border-color': 'transparent',
    'border-style': 'solid',
    'border-width': '0',
    'box-shadow': 'none',
    'padding': '0',
    'outline-style': 'solid',
    'outline-color': 'transparent',
    'outline-width': '0',
    'outline-offset': '0',
  };

  const defaultBoxTheme = mergeTheme(transparentBoxTheme, {
    'background-color': colors.background,
    'border-radius': dimensions.borderRadius,
    'padding': dimensions.padding,
  });

  const defaultImageTheme: IImageTheme = {
  }

  const defaultNormalPrimaryButtonTheme = mergeTheme<IButtonThemeBase>({
    background: mergeTheme(defaultBoxTheme, {
      'background-color': colors.brandPrimary,
      'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
      'border-radius': '3em',
    }),
    text: mergeTheme(textTheme, {
      'color': colors.textOnBrand,
      'font-weight': '600',
    }),
  });

  const focusBorderBox: Partial<IBoxTheme> = {
    'outline-color': colors.brandPrimary,
    'outline-offset': '0.1em',
    'outline-width': '2px',
    'outline-style': 'solid',
  }

  const primaryButtonTheme = mergeTheme<IButtonTheme>({
    normal: {
      default: defaultNormalPrimaryButtonTheme,
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
      focus: {
        background: focusBorderBox,
      },
    },
    disabled: {
      default: mergeTheme(defaultNormalPrimaryButtonTheme, {
        background: {
          'background-color': '#999999',
        },
        text: {
          'color': '#444444',
        },
      }),
      hover: {},
      press: {},
      focus: {
        background: focusBorderBox,
      },
    },
  });

  const secondaryButtonTheme: IButtonTheme = primaryButtonTheme;
  const tertiaryButtonTheme: IButtonTheme = primaryButtonTheme;

  const defaultNormalInputWrapperThemeBase: IInputWrapperThemeBase = {
    text: textTheme,
    errorText: mergeTheme(textTheme, {
      'color': '#ff0000',
    }),
    placeholderText: mergeTheme(textTheme, {
      'color': '#AAAAAA',
    }),
    background: mergeTheme(transparentBoxTheme, {
      'background-color': 'white',
      'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
      'border-radius': '3em',
      'border-width': dimensions.borderWidthNarrow,
      'border-color': darken(0.1, colors.background),
      'border-style': 'solid',
    }),
  }

  const defaultInputWrapperTheme: IInputWrapperTheme = {
    normal: {
      default: defaultNormalInputWrapperThemeBase,
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
      default: defaultNormalInputWrapperThemeBase,
      hover: defaultNormalInputWrapperThemeBase,
      focus: defaultNormalInputWrapperThemeBase,
    },
    disabled: {
      default: defaultNormalInputWrapperThemeBase,
      hover: defaultNormalInputWrapperThemeBase,
      focus: defaultNormalInputWrapperThemeBase,
    },
  }

  return {
    colors: colors,
    dimensions: dimensions,
    boxes: {
      default: defaultBoxTheme,
      transparent: transparentBoxTheme,
    },
    texts: {
      default: textTheme,
      text: textTheme,
      header: headerTextTheme,
    },
    images: {
      default: defaultImageTheme,
    },
    buttons: {
      default: secondaryButtonTheme,
      primary: primaryButtonTheme,
      secondary: secondaryButtonTheme,
      tertiary: tertiaryButtonTheme,
    },
    inputWrappers: {
      default: defaultInputWrapperTheme,
    },
  };
};
