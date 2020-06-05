import { ThemeType, IButtonTheme, ILinkBaseTheme, IBoxTheme, ITextTheme, IImageTheme, IVideoTheme, IInputWrapperTheme, ILoadingSpinnerTheme, ILinkTheme } from '..';

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

export interface IDimensionGuide extends ThemeType {
  borderRadius: string;
  borderWidth: string;
  borderWidthNarrow: string;
  borderWidthWide: string;

  padding: string;
  paddingNarrow: string;
  paddingExtraNarrow: string;
  paddingExtraExtraNarrow: string;
  paddingWide: string;
  paddingExtraWide: string;
  paddingExtraExtraWide: string;
  paddingExtraExtraExtraWide: string;

  columnCount: number;
  gutterSize: string;

  screenWidthSmall: string;
  screenWidthMedium: string;
  screenWidthLarge: string;
  screenWidthExtraLarge: string;
  screenWidthMax: string;
}

export interface IFont extends ThemeType {
  url: string;
}

interface ThemeMap<Theme extends ThemeType> extends Record<string, Theme>, ThemeType {
  default: Theme;
};

export interface ITheme extends ThemeType {
  // Base
  colors: IColorGuide,
  dimensions: IDimensionGuide,
  fonts: Record<string, IFont>,

  // Subatoms
  boxes: ThemeMap<IBoxTheme>,
  texts: ThemeMap<ITextTheme>,
  images: ThemeMap<IImageTheme>,
  videos: ThemeMap<IVideoTheme>,
  loadingSpinners: ThemeMap<ILoadingSpinnerTheme>,

  // Atoms
  buttons: ThemeMap<IButtonTheme>,
  linkBases: ThemeMap<ILinkBaseTheme>,
  inputWrappers: ThemeMap<IInputWrapperTheme>,
  links: ThemeMap<ILinkTheme>,
}


/*
Every theme is composed of:

Mode (i.e. variant) - dark mode, customer specific etc (controlled from outside the component)
State - normal, disabled, collapsed etc (global to the element but contained within)
Action - hover, press, focus etc (something temporal)
Base - the actual things to be styled.

currently every branch has the entire stack printed into it
i.e. default.normal.hover has all the same properties as default.normal

an alternate strategy would be to have a base i.e. normal
onto which the others are drawn over when needed



normal Base + Action + State provides a "base" layer
where the other stylings can be applied on top

Normal

-> press + hover

-> collapsed + hover + focus

*/
