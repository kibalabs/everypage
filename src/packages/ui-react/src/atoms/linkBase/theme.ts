import { ThemeType, RecursivePartial } from '../../util';
import { IBoxTheme } from '../../subatoms';

export interface ILinkBaseThemeBase extends ThemeType {
  background: IBoxTheme;
}

export interface ILinkBaseThemeState extends ThemeType {
  default: ILinkBaseThemeBase;
  hover: RecursivePartial<ILinkBaseThemeBase>;
  press: RecursivePartial<ILinkBaseThemeBase>;
  focus: RecursivePartial<ILinkBaseThemeBase>;
}

export interface ILinkBaseTheme extends ThemeType {
  normal: ILinkBaseThemeState;
  disabled: RecursivePartial<ILinkBaseThemeState>;
}
