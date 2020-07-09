
export const getGridItemSizeCss = (totalColumnCount: number, gutterSize: string, columnCount: number): string => (
  `calc(${(100.0 * columnCount) / totalColumnCount}% - 2 * ${gutterSize})`
);
