import { lighten, darken } from 'polished';

import { mergeTheme } from '.';
import { IButtonTheme, IBoxTheme, ITextTheme, IButtonThemeBase, IImageTheme, IInputWrapperTheme, IInputWrapperThemeBase, ILoadingSpinnerTheme, ILinkTheme, ILinkThemeBase } from '../components';
import { ITheme, IColorGuide, IDimensionGuide } from './theme';


export const buildTheme = (colors: IColorGuide, dimensions: IDimensionGuide): ITheme => {
  const textTheme: ITextTheme = {
    'font-size': '14px',
    'font-family': '"Montserrat", sans-serif',
    'font-weight': 'normal',
    'color': colors.text,
    'line-height': '1.6em',
  };

  const darkTextTheme = mergeTheme(textTheme, {
    'color': colors.textOnDark,
  });

  const headerTextTheme = mergeTheme(textTheme, {
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

  const focusableBorderBox: Partial<IBoxTheme> = {
    'border-color': 'transparent',
    'border-width': '2px',
    'border-style': 'solid',
  }

  const focusBorderBox: Partial<IBoxTheme> = {
    'border-color': lighten(0.3, 'black'),
    'border-width': '2px',
    'border-style': 'solid',
  }

  const defaultNormalPrimaryButtonTheme = mergeTheme<IButtonThemeBase>({
    background: mergeTheme(defaultBoxTheme, focusableBorderBox, {
      'background-color': colors.brandPrimary,
      'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
      'border-radius': '0.5em',
    }),
    text: mergeTheme(textTheme, {
      'color': colors.textOnBrand,
      'font-weight': '600',
    }),
  });
  console.log('defaultNormalPrimaryButtonTheme', defaultNormalPrimaryButtonTheme);

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
      'border-radius': '0.5em',
      'border-width': dimensions.borderWidthNarrow,
      'border-color': darken(0.05, colors.background),
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
  };

  const defaultLoadingSpinnerTheme: ILoadingSpinnerTheme = {
    'color': colors.brandPrimary,
  };

  const lightLoadingSpinnerTheme = mergeTheme<ILoadingSpinnerTheme>(defaultLoadingSpinnerTheme, {
    'color': 'white',
  });

  const darkLoadingSpinnerTheme = mergeTheme<ILoadingSpinnerTheme>(defaultLoadingSpinnerTheme, {
    'color': 'black',
  });

  const defaultNormalDefaultLinkTheme = mergeTheme<ILinkThemeBase>({
    text: mergeTheme<ITextTheme>(textTheme, {
      'color': colors.brandPrimary,
    }),
  });
  const defaultDisabledDefaultLinkTheme = mergeTheme<ILinkThemeBase>({
    text: mergeTheme<ITextTheme>(textTheme, {
      'color': colors.disabled,
    }),
  });

  const defaultVisitedDefaultLinkTheme = mergeTheme<ILinkThemeBase>({
    text: mergeTheme<ITextTheme>(textTheme, {
      'color': darken(0.1, colors.brandPrimary),
    }),
  });

  const defaultLinkTheme = mergeTheme<ILinkTheme>({
    normal: {
      default: defaultNormalDefaultLinkTheme,
      hover: mergeTheme<ILinkThemeBase>({
        text: mergeTheme<ITextTheme>(textTheme, {
          'color': darken(0.2, colors.brandPrimary),
        }),
      }),
    },
    disabled: {
      default: defaultDisabledDefaultLinkTheme,
      hover: defaultDisabledDefaultLinkTheme,
    },
    visited: {
      default: defaultVisitedDefaultLinkTheme,
      hover: mergeTheme<ILinkThemeBase>({
        text: mergeTheme<ITextTheme>(textTheme, {
          'color': darken(0.1, colors.brandPrimary),
        }),
      }),
    },
  });

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
      dark: darkTextTheme,
      header: headerTextTheme,
    },
    images: {
      default: defaultImageTheme,
    },
    loadingSpinners: {
      default: defaultLoadingSpinnerTheme,
      light: lightLoadingSpinnerTheme,
      dark: darkLoadingSpinnerTheme,
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
    links: {
      default: defaultLinkTheme,
    },
  };
};
