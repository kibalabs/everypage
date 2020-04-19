import { IColorGuide, IDimensionGuide, buildTheme } from './theming';

const colors: IColorGuide = {
  // brandPrimary: '#1C8F51',
  // brandSecondary: '#1A6F6F',
  brandPrimary: '#5C258D',
  brandSecondary: '#4389A2',
  text: '#333',
  textOnBrand: '#f5f5f5',
  textOnDark: '#f5f5f5',
  background: '#f5f5f5',
  backgroundDark: '#151515',
  disabled: '#333333',
}

export const dimensions: IDimensionGuide = {
  borderRadius: '0.2em',
  borderWidth: '2px',
  borderWidthNarrow: '1px',
  borderWidthWide: '4px',

  padding: '0.5em',
  paddingNarrow: '0.25em',
  paddingExtraNarrow: '0.125em',
  paddingExtraExtraNarrow: '0.0625em',
  paddingWide: '1em',
  paddingExtraWide: '2em',
  paddingExtraExtraWide: '4em',
  paddingExtraExtraExtraWide: '8em',

  columnCount: 12,
  gutterSize: '0.5em',

  screenWidthSmall: '576px',
  screenWidthMedium: '768px',
  screenWidthLarge: '992px',
  screenWidthExtraLarge: '1200px',
  screenWidthMax: '1200px',
};

export const defaultTheme = buildTheme(colors, dimensions);
export default defaultTheme;
