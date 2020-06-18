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
