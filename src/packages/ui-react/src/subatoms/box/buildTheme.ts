import { lighten, darken } from 'polished';

import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IBoxTheme } from './theme';

export const buildBoxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, IBoxTheme>>): ThemeMap<IBoxTheme> => {
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
  }, base?.transparent);

  const defaultBoxTheme = mergeTheme(transparentBoxTheme, {
    'background-color': colors.background,
    'border-radius': dimensions.borderRadius,
    'padding': dimensions.padding,
  }, base?.default);

  const cardBoxTheme = mergeTheme(defaultBoxTheme, {
    'background-color': lighten(0.1, colors.background),
    'border-radius': dimensions.borderRadius,
    'border-color': darken(0.05, colors.background),
    'border-width': '1px',
    'box-shadow': '0px 8px 8px -6px rgba(0,0,0,0.15)',
    'margin': '0px 4px 12px 4px',
    'padding': `${dimensions.paddingExtraWide} ${dimensions.paddingExtraWide}`,
  }, base?.default);

  const borderedBoxTheme = mergeTheme(defaultBoxTheme, {
    'background-color': lighten(0.1, colors.background),
    'border-radius': dimensions.borderRadius,
    'border-color': darken(0.05, colors.background),
    'border-width': '1px',
    'padding': `${dimensions.paddingExtraWide} ${dimensions.paddingExtraWide}`,
  }, base?.default);

  return {
    default: defaultBoxTheme,
    transparent: transparentBoxTheme,
    card: cardBoxTheme,
    bordered: borderedBoxTheme,
  };
}
