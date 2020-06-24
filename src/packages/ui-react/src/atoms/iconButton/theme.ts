import { ThemeType, RecursivePartial } from '../../util';
import { IBoxTheme, ITextTheme } from '../../subatoms';

export interface IIconButtonThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface IIconButtonThemeState extends ThemeType {
  default: IIconButtonThemeBase;
  hover: RecursivePartial<IIconButtonThemeBase>;
  press: RecursivePartial<IIconButtonThemeBase>;
  focus: RecursivePartial<IIconButtonThemeBase>;
}

export interface IIconButtonTheme extends ThemeType {
  normal: IIconButtonThemeState;
  disabled: RecursivePartial<IIconButtonThemeState>;
}
