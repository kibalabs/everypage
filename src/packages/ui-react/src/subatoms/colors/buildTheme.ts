import { darken, invert, getLuminance } from 'polished';

import { IColorGuide } from './theme';

export const buildColors = (base?: Partial<IColorGuide>): IColorGuide => {
  const brandPrimary = base?.brandPrimary || '#333333';
  const brandSecondary = base?.brandSecondary || darken(0.2, brandPrimary);
  const background = base?.background || '#f5f5f5';
  const text = base?.text || getLuminance(background) > 0.5 ? '#222222' : '#eeeeee';
  const textOnBrand = base?.textOnBrand || getLuminance(brandPrimary) > 0.5 ? '#222222' : '#eeeeee';
  const disabled = base?.disabled || '#555555';

  const brandPrimaryInverse = base?.brandPrimaryInverse || brandPrimary;
  const brandSecondaryInverse = base?.brandSecondaryInverse || brandSecondary;
  const backgroundInverse = base?.backgroundInverse || invert(background);
  const textInverse = base?.textInverse || getLuminance(backgroundInverse) > 0.5 ? '#222222' : '#e5e5e5';

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
