import { IDimensionGuide } from '../subatoms';

export const getGridItemSizeCss = (totalColumnCount: number, gutter: string, columnCount: number, baseSize?: string): string => {
  let calcValue = baseSize ? `${baseSize} * (${(columnCount / totalColumnCount).toFixed(1)})` : `${(100.0 * columnCount / totalColumnCount).toFixed(1)}%`;
  if (gutter && gutter !== '0' && gutter !== '0px') {
    calcValue = `(${calcValue} - (2 * ${gutter}))`;
  }
  return `calc(${calcValue})`;
};

export const getResponsiveCss = (screenWidth: string, css: string): string => {
  return `@media (min-width: ${screenWidth}) { ${css} }`;
}

export interface ResponsiveField<FieldType> {
  base?: FieldType;
  small?: FieldType;
  medium?: FieldType;
  large?: FieldType;
  extraLarge?: FieldType;
}

export type CssConverter<FieldType> = (field: FieldType) => string;

export const fieldToResponsiveCss = <FieldType>(directionResponsive: ResponsiveField<FieldType>, theme: IDimensionGuide, cssConversion: CssConverter<FieldType>): string => {
  const output = [];
  if (directionResponsive?.base) {
    output.push(cssConversion(directionResponsive?.base));
  }
  if (directionResponsive?.small) {
    output.push(getResponsiveCss(theme.screenWidthSmall, cssConversion(directionResponsive.small)));
  }
  if (directionResponsive?.medium) {
    output.push(getResponsiveCss(theme.screenWidthMedium, cssConversion(directionResponsive.medium)));
  }
  if (directionResponsive?.large) {
    output.push(getResponsiveCss(theme.screenWidthLarge, cssConversion(directionResponsive.large)));
  }
  if (directionResponsive?.extraLarge) {
    output.push(getResponsiveCss(theme.screenWidthExtraLarge, cssConversion(directionResponsive.extraLarge)));
  }
  return output.join('\n');
}
