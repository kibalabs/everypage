import { IColorGuide, IDimensionGuide, buildTheme } from './theming';

const colors: IColorGuide = {
  brandPrimary: '#1C8F51',
  brandSecondary: '#1A6F6F',
  text: '#333',
  textOnBrand: '#f5f5f5',
  background: '#f5f5f5',
}

export const dimensions: IDimensionGuide = {
  borderRadius: '0.2em',
  borderWidth: '2px',
  borderWidthNarrow: '1px',
  borderWidthWide: '4px',

  padding: '1em',
  paddingNarrow: '0.5em',
  paddingExtraNarrow: '0.25em',
  paddingExtraExtraNarrow: '0.1em',
  paddingWide: '2em',
  paddingExtraWide: '4em',
  paddingExtraExtraWide: '8em',

  columnCount: 12,
  gutterSize: '0.5em',

  screenWidthSmall: '576px',
  screenWidthMedium: '768px',
  screenWidthLarge: '992px',
  screenWidthExtraLarge: '1200px',
  screenWidthMax: '1200px',
};

const defaultTheme = buildTheme(colors, dimensions);
export default defaultTheme;
