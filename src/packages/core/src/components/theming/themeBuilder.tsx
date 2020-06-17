import * as Polished from 'polished';

import { mergeTheme, mergeThemePartial, IButtonTheme, IBoxTheme, ITextTheme, IButtonThemeBase, ILinkBaseThemeBase, ILinkBaseTheme, IImageTheme, IVideoTheme, IInputWrapperTheme, IInputWrapperThemeBase, ILoadingSpinnerTheme, ILinkTheme, ILinkThemeBase, ITheme, IColorGuide, IDimensionGuide, IFont } from '..';
import { RecursivePartial } from './util';

const buildColors = (base: Partial<IColorGuide>): IColorGuide => {
  const brandPrimary = base.brandPrimary || '#333333';
  const brandSecondary = base.brandSecondary || Polished.darken(0.2, brandPrimary);
  const background = base.background || '#f5f5f5';
  const text = base.text || Polished.getLuminance(background) > 0.5 ? '#222222' : '#eeeeee';
  const textOnBrand = base.textOnBrand || Polished.getLuminance(brandPrimary) > 0.5 ? '#222222' : '#eeeeee';
  const disabled = base.disabled || '#555555';

  const brandPrimaryInverse = base.brandPrimaryInverse || brandPrimary;
  const brandSecondaryInverse = base.brandSecondaryInverse || brandSecondary;
  const backgroundInverse = base.backgroundInverse || Polished.invert(background);
  const textInverse = base.textInverse || Polished.getLuminance(backgroundInverse) > 0.5 ? '#222222' : '#e5e5e5';

  return {
    brandPrimary: brandPrimary,
    brandSecondary: brandSecondary,
    background: background,
    text: text,
    textOnBrand: textOnBrand,
    disabled: disabled,

    brandPrimaryInverse: brandPrimaryInverse,
    brandSecondaryInverse: brandSecondaryInverse,
    backgroundInverse: backgroundInverse,
    textInverse: textInverse,
  };
};

const buildDimensions = (base: Partial<IDimensionGuide>): IDimensionGuide => {
  const borderRadius = base.borderRadius || '0.25em';
  const borderWidth = base.borderWidth || '1px';
  const borderWidthNarrow = base.borderWidthNarrow || Polished.math(`${borderWidth} / 2`);
  const borderWidthWide = base.borderWidthWide || Polished.math(`${borderWidth} * 2`);

  const padding = base.padding || '0.5em';
  const paddingNarrow = base.paddingNarrow || Polished.math(`${padding} / 2`);
  const paddingExtraNarrow = base.paddingExtraNarrow || Polished.math(`${paddingNarrow} / 2`);
  const paddingExtraExtraNarrow = base.paddingExtraExtraNarrow || Polished.math(`${paddingExtraNarrow} / 2`);
  const paddingWide = base.paddingWide || Polished.math(`${padding} * 2`);
  const paddingExtraWide = base.paddingExtraWide || Polished.math(`${paddingWide} * 2`);
  const paddingExtraExtraWide = base.paddingExtraExtraWide || Polished.math(`${paddingExtraWide} * 2`);
  const paddingExtraExtraExtraWide = base.paddingExtraExtraExtraWide || Polished.math(`${paddingExtraExtraWide} * 2`);

  const columnCount = base.columnCount || 12;
  const gutterSize = base.gutterSize || padding;
  const screenWidthSmall = base.screenWidthSmall || '576px';
  const screenWidthMedium = base.screenWidthMedium || '768px';
  const screenWidthLarge = base.screenWidthLarge || '992px';
  const screenWidthExtraLarge = base.screenWidthExtraLarge || '1200px';
  const screenWidthMax = base.screenWidthMax || '1200px';

  return {
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    borderWidthNarrow: borderWidthNarrow,
    borderWidthWide: borderWidthWide,
    padding: padding,
    paddingNarrow: paddingNarrow,
    paddingExtraNarrow: paddingExtraNarrow,
    paddingExtraExtraNarrow: paddingExtraExtraNarrow,
    paddingWide: paddingWide,
    paddingExtraWide: paddingExtraWide,
    paddingExtraExtraWide: paddingExtraExtraWide,
    paddingExtraExtraExtraWide: paddingExtraExtraExtraWide,
    columnCount: columnCount,
    gutterSize: gutterSize,
    screenWidthSmall: screenWidthSmall,
    screenWidthMedium: screenWidthMedium,
    screenWidthLarge: screenWidthLarge,
    screenWidthExtraLarge: screenWidthExtraLarge,
    screenWidthMax: screenWidthMax,
  };
};

export const buildFonts = (base: RecursivePartial<Record<string, IFont>>): Record<string, IFont> => {
  return Object.keys(base).reduce((current: Record<string, IFont>, name: string): Record<string, IFont> => {
    if (base[name] && base[name].url) {
      current[name] = {url: base[name].url.replace('//fonts.googleapis.com/', '//assets.evrpg.com/gfonts/')};
    }
    return current;
  }, {} as Record<string, IFont>);
}

export const buildTheme = (inputTheme?: RecursivePartial<ITheme>): ITheme => {
  const baseTheme = inputTheme || {}
  const colors = buildColors(baseTheme.colors || {});
  const dimensions = buildDimensions(baseTheme.dimensions || {});
  const fonts = buildFonts(baseTheme.fonts || {});

  const textTheme: ITextTheme = mergeTheme({
    'font-size': '16px',
    'font-family': '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Asans-serif',
    'font-weight': 'normal',
    'color': colors.text,
    'line-height': '1.5em',
    'text-decoration': 'none',
    'margin': '0',
  }, baseTheme.texts?.default);

  const inverseTextTheme = mergeThemePartial<ITextTheme>({
    'color': colors.textInverse,
  }, baseTheme.texts?.inverse);

  const inlineTextTheme = mergeThemePartial<ITextTheme>({
  }, baseTheme.texts?.inline);

  const paragraphTextTheme = mergeThemePartial<ITextTheme>({
    'margin': '0.5em 0',
  }, baseTheme.texts?.paragraph);

  const boldTextTheme = mergeThemePartial<ITextTheme>({
    'font-weight': 'bold',
  }, baseTheme.texts?.bold);

  const strongTextTheme = mergeThemePartial<ITextTheme>({
    'font-weight': 'bold',
  }, baseTheme.texts?.strong);

  const italicTextTheme = mergeThemePartial<ITextTheme>({
    'font-style': 'italic',
  }, baseTheme.texts?.italic);

  const emphasisTextTheme = mergeThemePartial<ITextTheme>({
    'font-style': 'italic',
  }, baseTheme.texts?.emphasis);

  const underlineTextTheme = mergeThemePartial<ITextTheme>({
    'text-decoration': 'underline',
  }, baseTheme.texts?.underline);

  const markTextTheme = mergeThemePartial<ITextTheme>({
  }, baseTheme.texts?.mark);

  const smallTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': 'smaller',
  }, baseTheme.texts?.small);

  const deletedTextTheme = mergeThemePartial<ITextTheme>({
    'text-decoration': 'line-through',
  }, baseTheme.texts?.deleted);

  const insertedTextTheme = mergeThemePartial<ITextTheme>({
    'text-decoration': 'underline',
  }, baseTheme.texts?.inserted);

  const subscriptTextTheme = mergeThemePartial<ITextTheme>({
    'vertical-align': 'sub',
    'font-size': 'smaller',
  }, baseTheme.texts?.subscript);

  const superscriptTextTheme = mergeThemePartial<ITextTheme>({
    'vertical-align': 'super',
    'font-size': 'smaller',
  }, baseTheme.texts?.superscript);

  // /////////////

  const headerTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '2.4em',
    'font-weight': 'bold',
    'color': '#171717',
    'margin': '0.67em 0',
    'line-height': '1.2em',
  }, baseTheme.texts?.header);

  const header1TextTheme = headerTextTheme;

  const titleTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '2.0em',
    'font-weight': 'bold',
    'color': '#171717',
    'margin': '0.67em 0',
    'line-height': '1.2em',
  }, baseTheme.texts?.title);

  const header2TextTheme = titleTextTheme;

  const subtitleTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.6em',
    'font-weight': 'bold',
    'color': '#171717',
    'margin': '0.5em 0',
    'line-height': '1.2em',
  }, baseTheme.texts?.subtitle);

  const header3TextTheme = subtitleTextTheme;

  const header4TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.4em',
    'font-weight': 'bold',
    'color': '#171717',
    'text-decoration': 'underline',
    'line-height': '1.2em',
    'margin': '0.4em 0',
  });

  const header5TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.2em',
    'font-weight': 'bold',
    'color': '#171717',
    'line-height': '1.2em',
    'margin': '0.3em 0',
  });

  const header6TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.1em',
    'font-weight': 'bold',
    'color': '#171717',
    'line-height': '1.2em',
    'margin': '0.2em 0',
  });

  const noteTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '0.8em',
    'color': '#777777',
  }, baseTheme.texts?.note);

  const supersizeTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '3em',
  }, baseTheme.texts?.supersize);

  const transparentBoxTheme: IBoxTheme = mergeTheme({
    'background-color': 'transparent',
    'border-radius': '0',
    'border-color': 'transparent',
    'border-style': 'solid',
    'border-width': '0',
    'box-shadow': 'none',
    'padding': '0',
    'margin': '0',
    'outline-style': 'solid',
    'outline-color': 'transparent',
    'outline-width': '0',
    'outline-offset': '0',
  }, baseTheme.boxes?.transparent);

  const defaultBoxTheme = mergeTheme(transparentBoxTheme, {
    'background-color': colors.background,
    'border-radius': dimensions.borderRadius,
    'padding': dimensions.padding,
  }, baseTheme.boxes?.default);

  const cardBoxTheme = mergeTheme(defaultBoxTheme, {
    'background-color': Polished.lighten(0.1, colors.background),
    'border-radius': dimensions.borderRadius,
    'border-color': Polished.darken(0.05, colors.background),
    'border-width': '1px',
    'box-shadow': '0px 8px 8px -6px rgba(0,0,0,0.15)',
    'margin': '0px 4px 12px 4px',
    'padding': `${dimensions.paddingExtraWide} ${dimensions.paddingExtraWide}`,
  }, baseTheme.boxes?.default);

  const borderedBoxTheme = mergeTheme(defaultBoxTheme, {
    'background-color': Polished.lighten(0.1, colors.background),
    'border-radius': dimensions.borderRadius,
    'border-color': Polished.darken(0.05, colors.background),
    'border-width': '1px',
    'padding': `${dimensions.paddingExtraWide} ${dimensions.paddingExtraWide}`,
  }, baseTheme.boxes?.default);

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
    'border-color': Polished.lighten(0.5, 'black'),
    'border-width': '2px',
    'border-style': 'solid',
  };

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
          'background-color': Polished.darken(0.1, colors.brandSecondary),
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
    background: mergeTheme(transparentBoxTheme, focusableBorderBox, {
      'border-radius': '0.5em',
      'padding': `${dimensions.padding}`,
    }),
  }, baseTheme.linkBases?.primary?.normal?.default);

  const primaryLinkBaseTheme = mergeTheme<ILinkBaseTheme>({
    normal: {
      default: defaultNormalPrimaryLinkBaseTheme,
      hover: {
        background: {
          'background-color': Polished.transparentize(0.8, colors.brandPrimary),
        },
      },
      press: {
        background: {
          'background-color': Polished.transparentize(0.6, colors.brandPrimary),
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
    background: mergeTheme(transparentBoxTheme, focusableBorderBox),
  }, baseTheme.linkBases?.transparent?.normal?.default);

  const transparentLinkBaseTheme = mergeTheme<ILinkBaseTheme>({
    normal: {
      default: defaultNormalTransparentLinkBaseTheme,
      hover: {
        // background: {
        //   'background-color': Polished.transparentize(0.8, colors.brandPrimary),
        // },
      },
      press: {
        // background: {
        //   'background-color': Polished.transparentize(0.6, colors.brandPrimary),
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
      'border-color': Polished.darken(0.05, colors.background),
      'border-style': 'solid',
    }),
  }, baseTheme.inputWrappers?.default?.normal?.default);

  const defaultInputWrapperTheme: IInputWrapperTheme = mergeTheme({
    normal: {
      default: defaultNormalDefaultInputWrapperThemeBase,
      hover: {
        background: {
          'border-color': Polished.lighten(0.1, colors.brandPrimary),
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
    text: mergeTheme<ITextTheme>(textTheme, {
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
      'color': Polished.darken(0.2, colors.brandPrimary),
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
          'color': Polished.lighten(0.2, colors.brandPrimaryInverse),
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
    boxes: {
      default: defaultBoxTheme,
      transparent: transparentBoxTheme,
      card: cardBoxTheme,
      bordered: borderedBoxTheme,
    },
    texts: {
      default: textTheme,
      paragraph: paragraphTextTheme,
      inline: inlineTextTheme,
      bold: boldTextTheme,
      strong: strongTextTheme,
      italic: italicTextTheme,
      emphasis: emphasisTextTheme,
      underline: underlineTextTheme,
      mark: markTextTheme,
      small: smallTextTheme,
      deleted: deletedTextTheme,
      inserted: insertedTextTheme,
      subscript: subscriptTextTheme,
      superscript: superscriptTextTheme,
      inverse: inverseTextTheme,
      header: headerTextTheme,
      title: titleTextTheme,
      subtitle: subtitleTextTheme,
      header1: header1TextTheme,
      header2: header2TextTheme,
      header3: header3TextTheme,
      header4: header4TextTheme,
      header5: header5TextTheme,
      header6: header6TextTheme,
      note: noteTextTheme,
      supersize: supersizeTextTheme,
    },
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
