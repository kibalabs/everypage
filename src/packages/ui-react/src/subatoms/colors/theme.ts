import { ThemeType } from '../../util';

export interface IColorGuide extends ThemeType {
  brandPrimary: string;
  brandSecondary: string;
  background: string;
  text: string;
  textOnBrand: string;
  disabled: string;

  brandPrimaryInverse: string;
  brandSecondaryInverse: string;
  backgroundInverse: string;
  textInverse: string;
}
