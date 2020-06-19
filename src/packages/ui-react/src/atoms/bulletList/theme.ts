import { ThemeType, RecursivePartial, CssTheme } from '../../util';

interface IBulletListOuterTheme extends CssTheme {
  'list-style-type': string;
  'margin': string;
}

export interface IBulletListThemeBase extends ThemeType {
  bulletList: IBulletListOuterTheme;
}

export interface IBulletListThemeState extends ThemeType {
  default: IBulletListThemeBase;
}

export interface IBulletListTheme extends ThemeType {
  normal: IBulletListThemeState;
}
