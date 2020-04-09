import { darken } from 'polished';

import { mergeTheme } from '.';
import { IButtonTheme, IBoxTheme, ITextTheme, IButtonThemeStatusAction } from '../components';
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
  };

  const defaultBoxTheme = mergeTheme(transparentBoxTheme, {
    'background-color': colors.background,
    'border-radius': dimensions.borderRadius,
    'padding': dimensions.padding,
  });

  const defaultNormalPrimaryButtonTheme = mergeTheme<IButtonThemeStatusAction>({
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

  const defaultDisabledPrimaryButtonTheme = mergeTheme(defaultNormalPrimaryButtonTheme, {
    background: {
      'background-color': '#999999',
    },
    text: {
      'color': '#444444',
    },
  });

  const primaryButtonTheme = mergeTheme<IButtonTheme>({
    normal: {
      default: defaultNormalPrimaryButtonTheme,
      hover: mergeTheme(defaultNormalPrimaryButtonTheme, {
        background: {
          'background-color': colors.brandSecondary,
        },
      }),
      press: mergeTheme(defaultNormalPrimaryButtonTheme, {
        background: {
          'background-color': darken(0.1, colors.brandSecondary),
        },
      }),
    },
    disabled: {
      default: defaultDisabledPrimaryButtonTheme,
      hover: defaultDisabledPrimaryButtonTheme,
      press: defaultDisabledPrimaryButtonTheme,
    },
  });

  const secondaryButtonTheme: IButtonTheme = primaryButtonTheme;
  const tertiaryButtonTheme: IButtonTheme = primaryButtonTheme;

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
    buttons: {
      default: secondaryButtonTheme,
      primary: primaryButtonTheme,
      secondary: secondaryButtonTheme,
      tertiary: tertiaryButtonTheme,
    },
  };
};
