import { ThemeType, RecursivePartial, CssTheme } from '../../util';
import { ITextTheme } from '../../subatoms';

interface IBulletTheme extends CssTheme {
  'content': string;
  'color': string;
  'margin': string;
  'font-weight': string;
}

export interface IBulletTextThemeBase extends ThemeType {
  text: ITextTheme;
  bullet: IBulletTheme;
}

export interface IBulletTextThemeState extends ThemeType {
  default: IBulletTextThemeBase;
}

export interface IBulletTextTheme extends ThemeType {
  normal: IBulletTextThemeState;
}
