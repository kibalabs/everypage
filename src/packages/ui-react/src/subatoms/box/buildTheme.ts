import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../../subatoms/colors';
import { IDimensionGuide } from '../../subatoms/dimensions';
import { IBoxTheme } from './theme';

export const buildBoxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, IBoxTheme>>): ThemeMap<IBoxTheme> => {
  const defaultBoxTheme = mergeTheme<IBoxTheme>({
    'background-color': 'transparent',
    'border-radius': dimensions.borderRadius,
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
  }, base?.default);

  const transparentBoxTheme = mergeThemePartial<IBoxTheme>({
    'background-color': 'transparent',
    'padding': dimensions.padding,
  }, base?.transparent);

  const paddedBoxTheme = mergeThemePartial<IBoxTheme>({
    'background-color': '$colors.background',
    'padding': dimensions.padding,
  }, base?.padded);

  const cardBoxTheme = mergeThemePartial<IBoxTheme>({
    'background-color': '$colors.backgroundLight10',
    'border-color': '$colors.backgroundDark05',
    'border-width': dimensions.borderWidth,
    'box-shadow': '0px 8px 8px -6px rgba(0,0,0,0.15)',
    'margin': '0px 4px 12px 4px',
    'padding': `${dimensions.paddingWide2} ${dimensions.paddingWide2}`,
  }, base?.card);

  const borderedBoxTheme = mergeThemePartial<IBoxTheme>({
    'background-color': '$colors.backgroundLight10',
    'border-color': '$colors.backgroundDark05',
    'border-width': dimensions.borderWidth,
    'padding': `${dimensions.paddingWide2} ${dimensions.paddingWide2}`,
  }, base?.bordered);

  const focusableBoxTheme = mergeThemePartial<IBoxTheme>({
    'border-color': 'transparent',
    'border-width': '2px',
    'border-style': 'solid',
  }, base?.focusable);

  const focussedBoxTheme = mergeThemePartial<IBoxTheme>({
    'border-color': '$colors.backgroundDark50',
  }, base?.focussed);

  return {
    ...base,
    default: defaultBoxTheme,
    transparent: transparentBoxTheme,
    padded: paddedBoxTheme,
    card: cardBoxTheme,
    bordered: borderedBoxTheme,
    focusable: focusableBoxTheme,
    focussed: focussedBoxTheme,
  };
}
