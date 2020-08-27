import { darken, invert, getLuminance } from 'polished';

import { IColorGuide } from './theme';

export const buildColors = (base?: Partial<IColorGuide>): IColorGuide => {
  const brandPrimary = base?.brandPrimary || '#333333';
  const brandSecondary = base?.brandSecondary || darken(0.2, brandPrimary);
  const background = base?.background || '#f5f5f5';
  const text = base?.text || getLuminance(background) > 0.5 ? '#222222' : '#eeeeee';
  const textOnBrand = base?.textOnBrand || getLuminance(brandPrimary) > 0.5 ? '#222222' : '#eeeeee';
  const disabled = base?.disabled || '#555555';

  return {
    ...base,

    brandPrimary: brandPrimary,
    brandSecondary: brandSecondary,
    background: background,
    text: text,
    textOnBrand: textOnBrand,
    disabled: disabled,
  };
};

export const buildAlternateColors = (colors: IColorGuide, base?: Record<string, IColorGuide>): Record<string, IColorGuide> => {
  const brandPrimaryInverse = base?.inverse?.brandPrimary || colors.brandPrimary;
  const brandSecondaryInverse = base?.inverse?.brandSecondary || colors.brandSecondary;
  const backgroundInverse = base?.inverse?.background || invert(colors.background);
  const textInverse = base?.inverse?.text || getLuminance(backgroundInverse) > 0.5 ? '#222222' : '#e5e5e5';
  const inverseColors: IColorGuide = {
    ...colors,
    ...base?.inverse,
    brandPrimary: brandPrimaryInverse,
    brandSecondary: brandSecondaryInverse,
    background: backgroundInverse,
    text: textInverse,
  };

  return {
    ...base,
    inverse: inverseColors,
  }
}
