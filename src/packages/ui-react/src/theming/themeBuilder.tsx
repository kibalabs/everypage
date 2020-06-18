import { lighten, darken, transparentize } from 'polished';

import { RecursivePartial } from '../util';
import { buildColors } from '../subatoms/colors';
import { buildDimensions } from '../subatoms/dimensions';
import { buildFonts } from '../subatoms/fonts';
import { ITextTheme, buildTextThemes } from '../subatoms/text';
import { IBoxTheme, buildBoxThemes } from '../subatoms/box';
import { mergeTheme, IButtonTheme, IButtonThemeBase, ILinkBaseThemeBase, ILinkBaseTheme, IImageTheme, IVideoTheme, IInputWrapperTheme, IInputWrapperThemeBase, ILoadingSpinnerTheme, ILinkTheme, ILinkThemeBase, ITheme, IFont } from '..';

export const buildTheme = (inputTheme?: RecursivePartial<ITheme>): ITheme => {
  const baseTheme = inputTheme || {};
  const colors = buildColors(baseTheme.colors);
  const dimensions = buildDimensions(baseTheme.dimensions);
  const fonts = buildFonts(baseTheme.fonts);

  const textThemes = buildTextThemes(colors, dimensions, baseTheme.texts);
  const boxThemes = buildBoxThemes(colors, dimensions, baseTheme.boxes);

  const defaultImageTheme: IImageTheme = mergeTheme({
  }, baseTheme.images?.default);

  const defaultVideoTheme: IVideoTheme = mergeTheme({
  }, baseTheme.videos?.default);

  const focusableBorderBox: Partial<IBoxTheme> = {
    'border-color': 'transparent',
    'border-width': '2px',
    'border-style': 'solid',
  };

  const focusBorderBox: Partial<IBoxTheme> = {
    'border-color': lighten(0.5, 'black'),
    'border-width': '2px',
    'border-style': 'solid',
  };

  const defaultNormalPrimaryButtonTheme = mergeTheme<IButtonThemeBase>({
    background: mergeTheme(boxThemes.default, focusableBorderBox, {
      'background-color': colors.brandPrimary,
      'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
      'border-radius': '0.5em',
    }),
    text: mergeTheme(textThemes.default, {
      'color': colors.textOnBrand,
      'font-weight': '600',
    }),
  }, baseTheme.buttons?.primary?.normal?.default);

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
  }, baseTheme.buttons?.primary);

  const secondaryButtonTheme: IButtonTheme = mergeTheme(primaryButtonTheme, baseTheme.buttons?.secondary);
  const tertiaryButtonTheme: IButtonTheme = mergeTheme(primaryButtonTheme, baseTheme.buttons?.tertiary);

  const defaultNormalPrimaryLinkBaseTheme = mergeTheme<ILinkBaseThemeBase>({
    background: mergeTheme(boxThemes.transparent, focusableBorderBox, {
      'border-radius': '0.5em',
      'padding': `${dimensions.padding}`,
    }),
  }, baseTheme.linkBases?.primary?.normal?.default);

  const primaryLinkBaseTheme = mergeTheme<ILinkBaseTheme>({
    normal: {
      default: defaultNormalPrimaryLinkBaseTheme,
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
        background: focusBorderBox,
      },
    },
    disabled: {
      default: mergeTheme(defaultNormalPrimaryLinkBaseTheme, {
        background: {
          'background-color': '#999999',
        },
      }),
      hover: {},
      press: {},
      focus: {
        background: focusBorderBox,
      },
    },
  }, baseTheme.linkBases?.primary);

  const secondaryLinkBaseTheme: ILinkBaseTheme = mergeTheme(primaryLinkBaseTheme, baseTheme.linkBases?.secondary);
  const tertiaryLinkBaseTheme: ILinkBaseTheme = mergeTheme(primaryLinkBaseTheme, baseTheme.linkBases?.tertiary);

  const defaultNormalTransparentLinkBaseTheme = mergeTheme<ILinkBaseThemeBase>({
    background: mergeTheme(boxThemes.transparent, focusableBorderBox),
  }, baseTheme.linkBases?.transparent?.normal?.default);

  const transparentLinkBaseTheme = mergeTheme<ILinkBaseTheme>({
    normal: {
      default: defaultNormalTransparentLinkBaseTheme,
      hover: {
        // background: {
        //   'background-color': transparentize(0.8, colors.brandPrimary),
        // },
      },
      press: {
        // background: {
        //   'background-color': transparentize(0.6, colors.brandPrimary),
        // },
      },
      focus: {
        background: focusBorderBox,
      },
    },
    disabled: {
      default: mergeTheme(defaultNormalTransparentLinkBaseTheme, {
        background: {
          'background-color': '#999999',
        },
      }),
      hover: {},
      press: {},
      focus: {
        background: focusBorderBox,
      },
    },
  }, baseTheme.linkBases?.transparent);

  const defaultNormalDefaultInputWrapperThemeBase: IInputWrapperThemeBase = mergeTheme({
    text: textThemes.default,
    errorText: mergeTheme(textThemes.default, {
      'color': '#ff0000',
    }),
    placeholderText: mergeTheme(textThemes.default, {
      'color': '#AAAAAA',
    }),
    background: mergeTheme(boxThemes.default, {
      'background-color': 'white',
      'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
      'border-radius': '0.5em',
      'border-width': dimensions.borderWidthNarrow,
      'border-color': darken(0.05, colors.background),
      'border-style': 'solid',
    }),
  }, baseTheme.inputWrappers?.default?.normal?.default);

  const defaultInputWrapperTheme: IInputWrapperTheme = mergeTheme({
    normal: {
      default: defaultNormalDefaultInputWrapperThemeBase,
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
      default: defaultNormalDefaultInputWrapperThemeBase,
      hover: defaultNormalDefaultInputWrapperThemeBase,
      focus: defaultNormalDefaultInputWrapperThemeBase,
    },
    disabled: {
      default: defaultNormalDefaultInputWrapperThemeBase,
      hover: defaultNormalDefaultInputWrapperThemeBase,
      focus: defaultNormalDefaultInputWrapperThemeBase,
    },
  }, baseTheme.inputWrappers?.default);

  const defaultLoadingSpinnerTheme: ILoadingSpinnerTheme = mergeTheme({
    'color': colors.brandPrimary,
  }, baseTheme.loadingSpinners?.default);

  const lightLoadingSpinnerTheme = mergeTheme<ILoadingSpinnerTheme>(defaultLoadingSpinnerTheme, {
    'color': 'white',
  }, baseTheme.loadingSpinners?.light);

  const darkLoadingSpinnerTheme = mergeTheme<ILoadingSpinnerTheme>(defaultLoadingSpinnerTheme, {
    'color': 'black',
  }, baseTheme.loadingSpinners?.dark);

  const defaultNormalDefaultLinkTheme = mergeTheme<ILinkThemeBase>({
    text: mergeTheme<ITextTheme>(textThemes.default, {
      'color': colors.brandPrimary,
      'text-decoration': 'underline',
    }),
  }, baseTheme.links?.default?.normal?.default);

  const defaultDisabledDefaultLinkTheme = mergeTheme(defaultNormalDefaultLinkTheme, {
    text: {
      'color': colors.disabled,
    },
  }, baseTheme.links?.default?.disabled?.default);

  const defaultVisitedDefaultLinkTheme = mergeTheme(defaultNormalDefaultLinkTheme, {
    text: {
      'color': darken(0.2, colors.brandPrimary),
    },
  }, baseTheme.links?.default?.visited?.default);

  const defaultLinkTheme = mergeTheme<ILinkTheme>({
    normal: {
      default: defaultNormalDefaultLinkTheme,
      hover: {
        text: {
          'color': colors.brandSecondary,
        },
      },
    },
    disabled: {
      default: defaultDisabledDefaultLinkTheme,
      hover: defaultDisabledDefaultLinkTheme,
    },
    visited: {
      default: defaultVisitedDefaultLinkTheme,
      hover: {
        text: {
          'color': colors.brandSecondary,
        },
      },
    },
  }, baseTheme.links?.default);

  const inverseLinkTheme = mergeTheme<ILinkTheme>(defaultLinkTheme, {
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
  }, baseTheme.links?.inverse);

  return {
    colors: colors,
    dimensions: dimensions,
    fonts: fonts,
    boxes: boxThemes,
    texts: textThemes,
    images: {
      default: defaultImageTheme,
    },
    videos: {
      default: defaultVideoTheme,
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
    linkBases: {
      default: secondaryLinkBaseTheme,
      primary: primaryLinkBaseTheme,
      secondary: secondaryLinkBaseTheme,
      tertiary: tertiaryLinkBaseTheme,
      transparent: transparentLinkBaseTheme,
    },
    inputWrappers: {
      default: defaultInputWrapperTheme,
    },
    links: {
      default: defaultLinkTheme,
      inverse: inverseLinkTheme,
    },
  };
};
