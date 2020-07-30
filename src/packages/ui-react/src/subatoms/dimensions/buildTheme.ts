import { math } from 'polished';

import { IDimensionGuide } from './theme';

export const buildDimensions = (base?: Partial<IDimensionGuide>): IDimensionGuide => {
  const fontSize = base?.fontSize || '16px';

  const borderRadius = base?.borderRadius || '0.5em';
  const borderWidth = base?.borderWidth || '1px';
  const borderWidthNarrow = base?.borderWidthNarrow || math(`${borderWidth} / 2`);
  const borderWidthWide = base?.borderWidthWide || math(`${borderWidth} * 2`);

  const padding = base?.padding || '0.5em';
  const paddingNarrow = base?.paddingNarrow || math(`${padding} / 2`);
  const paddingExtraNarrow = base?.paddingExtraNarrow || math(`${paddingNarrow} / 2`);
  const paddingExtraExtraNarrow = base?.paddingExtraExtraNarrow || math(`${paddingExtraNarrow} / 2`);
  const paddingWide = base?.paddingWide || math(`${padding} * 2`);
  const paddingExtraWide = base?.paddingExtraWide || math(`${paddingWide} * 2`);
  const paddingExtraExtraWide = base?.paddingExtraExtraWide || math(`${paddingExtraWide} * 2`);
  const paddingExtraExtraExtraWide = base?.paddingExtraExtraExtraWide || math(`${paddingExtraExtraWide} * 2`);

  const columnCount = base?.columnCount || 12;
  const gutterSize = base?.gutterSize || padding;
  const screenWidthSmall = base?.screenWidthSmall || '576px';
  const screenWidthMedium = base?.screenWidthMedium || '768px';
  const screenWidthLarge = base?.screenWidthLarge || '992px';
  const screenWidthExtraLarge = base?.screenWidthExtraLarge || '1200px';
  const screenWidthMax = base?.screenWidthMax || '1200px';

  return {
    ...base,
    fontSize: fontSize,
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    borderWidthNarrow: borderWidthNarrow,
    borderWidthWide: borderWidthWide,
    padding: padding,
    paddingNarrow: paddingNarrow,
    paddingExtraNarrow: paddingExtraNarrow,
    paddingExtraExtraNarrow: paddingExtraExtraNarrow,
    paddingWide: paddingWide,
    paddingExtraWide: paddingExtraWide,
    paddingExtraExtraWide: paddingExtraExtraWide,
    paddingExtraExtraExtraWide: paddingExtraExtraExtraWide,
    columnCount: columnCount,
    gutterSize: gutterSize,
    screenWidthSmall: screenWidthSmall,
    screenWidthMedium: screenWidthMedium,
    screenWidthLarge: screenWidthLarge,
    screenWidthExtraLarge: screenWidthExtraLarge,
    screenWidthMax: screenWidthMax,
  };
};
