import { darken, invert, getLuminance, lighten, transparentize } from 'polished';

import { IColorGuide } from './theme';

function padZeros(num: number, places: number) {
  var numString = num.toString();
  while (numString.length < places) {
    numString = '0' + numString;
  }
  return numString;
}

export const buildColors = (base?: Partial<IColorGuide>): IColorGuide => {
  const brandPrimary = base?.brandPrimary || '#333333';
  const brandSecondary = base?.brandSecondary || darken(0.2, brandPrimary);
  const background = base?.background || '#f5f5f5';
  const text = base?.text || getLuminance(background) > 0.5 ? '#222222' : '#eeeeee';
  const textOnBrand = base?.textOnBrand || getLuminance(brandPrimary) > 0.5 ? '#222222' : '#eeeeee';
  const disabled = base?.disabled || '#777777';
  const disabledText = base?.disabledText || '#444444';
  const error = base?.error || '#ff0033';
  const success = base?.success || '#22bb33';


  const colors = {
    ...base,
    brandPrimary: brandPrimary,
    brandSecondary: brandSecondary,
    background: background,
    text: text,
    textOnBrand: textOnBrand,
    disabled: disabled,
    disabledText: disabledText,
    error: error,
    success: success,
  };

  return expandColors(colors);
};

export const buildAlternateColors = (colors: IColorGuide, base?: Record<string, Partial<IColorGuide>>): Record<string, IColorGuide> => {
  const inverseBase = base?.inverse;
  const brandPrimary = inverseBase?.brandPrimary || colors.brandPrimary;
  const brandSecondary = inverseBase?.brandSecondary || colors.brandSecondary;
  const background = inverseBase?.background || invert(colors.background);
  const text = inverseBase?.text || getLuminance(background) > 0.5 ? '#222222' : '#eeeeee';
  const textOnBrand = inverseBase?.textOnBrand || getLuminance(brandPrimary) > 0.5 ? '#222222' : '#eeeeee';
  const disabled = inverseBase?.disabled || colors.disabled;
  const disabledText = inverseBase?.disabledText || colors.disabledText;
  const error = inverseBase?.error || colors.error;
  const success = inverseBase?.success || colors.success;

  const inverseColors: IColorGuide = {
    ...colors,
    ...base?.inverse,
    brandPrimary: brandPrimary,
    brandSecondary: brandSecondary,
    background: background,
    text: text,
    textOnBrand: textOnBrand,
    disabled: disabled,
    disabledText: disabledText,
    error: error,
    success: success,
  };

  return {
    ...base,
    inverse: expandColors(inverseColors),
  }
}

const expandColors = (colors: IColorGuide, base?: IColorGuide): IColorGuide => {
  const values = [0.05, 0.10, 0.20, 0.25, 0.50, 0.75, 0.80, 0.90, 0.95]
  const expandedColors = Object.keys(colors).reduce((extendedColors: Partial<IColorGuide>, colorKey: string): Partial<IColorGuide> => {
    if (/\d+/.test(colorKey.slice(colorKey.length - 1))) {
      // Don't expand any colors that end in a number
      return extendedColors;
    }
    values.forEach((value: number): void => {
      const valueNumber = padZeros(value * 100, 2);
      const valueKeyLight = `${colorKey}Light${valueNumber}`;
      extendedColors[valueKeyLight] = base?.[valueKeyLight] || lighten(value, colors[colorKey]);
      const valueKeyDark = `${colorKey}Dark${valueNumber}`;
      extendedColors[valueKeyDark] = base?.[valueKeyDark] || darken(value, colors[colorKey]);
      const valueKeyClear = `${colorKey}Clear${valueNumber}`;
      extendedColors[valueKeyClear] = base?.[valueKeyClear] || transparentize(value, colors[colorKey]);
    });
    return extendedColors;
  }, {});
  return {...colors, ...expandedColors};
}
