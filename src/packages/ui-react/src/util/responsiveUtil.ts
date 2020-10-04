
export const getGridItemSizeCss = (totalColumnCount: number, gutter: string, columnCount: number, baseSize?: string): string => {
  let calcValue = baseSize ? `${baseSize} * (${(columnCount / totalColumnCount).toFixed(1)})` : `${(100.0 * columnCount / totalColumnCount).toFixed(1)}%`;
  if (gutter && gutter !== '0' && gutter !== '0px') {
    calcValue = `(${calcValue} - (2 * ${gutter}))`;
  }
  return `calc(${calcValue})`;
};
