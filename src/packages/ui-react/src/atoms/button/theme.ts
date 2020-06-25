import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { IBoxTheme, ITextTheme } from '../../subatoms';

export interface IButtonThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface IButtonThemeState extends ThemeType {
  default: IButtonThemeBase;
  hover: RecursivePartial<IButtonThemeBase>;
  press: RecursivePartial<IButtonThemeBase>;
  focus: RecursivePartial<IButtonThemeBase>;
}

export interface IButtonTheme extends ThemeType {
  normal: IButtonThemeState;
  disabled: RecursivePartial<IButtonThemeState>;
}
