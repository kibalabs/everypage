
export const getGridItemSizeCss = (totalColumnCount: number, gutterSize: string, columnCount: number, baseSize?: string): string => {
  let calcValue = baseSize ? `${baseSize} * (${(columnCount / totalColumnCount).toFixed(1)})` : `${(100.0 * columnCount / totalColumnCount).toFixed(1)}%`;
  if (gutterSize && gutterSize !== '0' && gutterSize !== '0px') {
    calcValue = `(${calcValue} - (2 * ${gutterSize}))`;
  }
  return `calc(${calcValue})`;
};
