import { math } from 'polished';

import { IDimensionGuide } from './theme';

export const buildDimensions = (base?: Partial<IDimensionGuide>): IDimensionGuide => {
  const fontSize = base?.fontSize || '16px';

  const borderRadius = base?.borderRadius || '0.5em';
  const borderWidth = base?.borderWidth || '1px';
  const borderWidthNarrow = base?.borderWidthNarrow || math(`${borderWidth} / 2`);
  const borderWidthWide = base?.borderWidthWide || math(`${borderWidth} * 2`);

  const padding = base?.padding || '0.5em';
  const paddingNarrow1 = base?.paddingNarrow || math(`${padding} / 2`);
  const paddingNarrow2 = base?.paddingNarrow2 || math(`${paddingNarrow1} / 2`);
  const paddingNarrow3 = base?.paddingNarrow3 || math(`${paddingNarrow2} / 2`);
  const paddingNarrow4 = base?.paddingNarrow4 || math(`${paddingNarrow3} / 2`);
  const paddingWide1 = base?.paddingWide || math(`${padding} * 2`);
  const paddingWide2 = base?.paddingWide2 || math(`${paddingWide1} * 2`);
  const paddingWide3 = base?.paddingWide3 || math(`${paddingWide2} * 2`);
  const paddingWide4 = base?.paddingWide4 || math(`${paddingWide3} * 2`);

  const columnCount = base?.columnCount || 12;
  const gutter = base?.gutter || padding;
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
    paddingNarrow: paddingNarrow1,
    paddingNarrow1: paddingNarrow1,
    paddingNarrow2: paddingNarrow2,
    paddingNarrow3: paddingNarrow3,
    paddingNarrow4: paddingNarrow4,
    paddingWide: paddingWide1,
    paddingWide1: paddingWide1,
    paddingWide2: paddingWide2,
    paddingWide3: paddingWide3,
    paddingWide4: paddingWide4,
    columnCount: columnCount,
    gutter: gutter,
    screenWidthSmall: screenWidthSmall,
    screenWidthMedium: screenWidthMedium,
    screenWidthLarge: screenWidthLarge,
    screenWidthExtraLarge: screenWidthExtraLarge,
    screenWidthMax: screenWidthMax,
  };
};
