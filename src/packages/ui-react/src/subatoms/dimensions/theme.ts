import { ThemeType } from '../../util';

export interface IDimensionGuide extends ThemeType {
  fontSize: string;

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

export enum ScreenSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra-large',
}

export const getScreenSize = (size: ScreenSize, theme: IDimensionGuide): string => {
  switch (size) {
    case ScreenSize.Small: {
      return theme.screenWidthSmall;
    }
    case ScreenSize.Medium: {
      return theme.screenWidthMedium;
    }
    case ScreenSize.Large: {
      return theme.screenWidthLarge;
    }
    case ScreenSize.ExtraLarge: {
      return theme.screenWidthExtraLarge;
    }
    default: {
      return '0';
    }
  }
};

export enum PaddingSize {
  None = 'none',
  Default = 'default',
  Narrow = 'narrow',
  ExtraNarrow = 'extra-narrow',
  ExtraExtraNarrow = 'extra-extra-narrow',
  Wide = 'wide',
  ExtraWide = 'extra-wide',
  ExtraExtraWide = 'extra-extra-wide',
  ExtraExtraExtraWide = 'extra-extra-extra-wide',
}

export const getPaddingSize = (size: PaddingSize, theme: IDimensionGuide): string => {
  switch (size) {
    case PaddingSize.Default: {
      return theme.padding;
    }
    case PaddingSize.Narrow: {
      return theme.paddingNarrow;
    }
    case PaddingSize.ExtraNarrow: {
      return theme.paddingExtraNarrow;
    }
    case PaddingSize.ExtraExtraNarrow: {
      return theme.paddingExtraExtraNarrow;
    }
    case PaddingSize.Wide: {
      return theme.paddingWide;
    }
    case PaddingSize.ExtraWide: {
      return theme.paddingExtraWide;
    }
    case PaddingSize.ExtraExtraWide: {
      return theme.paddingExtraExtraWide;
    }
    case PaddingSize.ExtraExtraExtraWide: {
      return theme.paddingExtraExtraExtraWide;
    }
    default: {
      return '0px';
    }
  }
};
