import { ThemeType } from '.';
import { IButtonTheme, IBoxTheme, ITextTheme } from '../components';

export interface IColorGuide extends ThemeType {
  brandPrimary: string,
  brandSecondary: string,
  text: string,
  textOnBrand: string,
  background: string,
}

export interface IDimensionGuide extends ThemeType {
  borderRadius: string,
  borderWidth: string,
  borderWidthNarrow: string,
  borderWidthWide: string,

  padding: string,
  paddingNarrow: string,
  paddingExtraNarrow: string,
  paddingExtraExtraNarrow: string,
  paddingWide: string,
  paddingExtraWide: string,
  paddingExtraExtraWide: string,

  columnCount: number,
  gutterSize: string,

  screenWidthSmall: string,
  screenWidthMedium: string,
  screenWidthLarge: string,
  screenWidthExtraLarge: string,
  screenWidthMax: string,
}

interface ThemeMap<Theme extends ThemeType> extends Record<string, Theme>, ThemeType {
  default: Theme;
};

export interface ITheme extends ThemeType {
  colors: IColorGuide,
  dimensions: IDimensionGuide,
  boxes: ThemeMap<IBoxTheme>,
  texts: ThemeMap<ITextTheme>,
  buttons: ThemeMap<IButtonTheme>,
}
