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
  Narrow = 'Narrow',
  ExtraNarrow = 'ExtraNarrow',
  ExtraExtraNarrow = 'ExtraExtraNarrow',
  Wide = 'Wide',
  ExtraWide = 'ExtraWide',
  ExtraExtraWide = 'ExtraExtraWide',
  ExtraExtraExtraWide = 'ExtraExtraExtraWide',
}

export const getPaddingSize = (size: PaddingSize, theme: IDimensionGuide): string => {
  if (size === PaddingSize.None) {
    return '0px';
  }
  if (size === PaddingSize.Default) {
    return theme.padding;
  }
  const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);
  const fieldName = size.startsWith('padding') ? size : `padding${capitalizedSize}`;
  if (fieldName in theme) {
    return theme[fieldName] as string;
  }
  console.error(`Failed to find padding size: ${size}`)
  return '0px';
};
