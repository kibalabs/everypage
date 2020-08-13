import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { IBoxTheme } from '../../subatoms';

export interface ILinePagerThemeBase extends ThemeType {
  background: IBoxTheme;
}

export interface ILinePagerThemeState extends ThemeType {
  default: ILinePagerThemeBase;
  hover: RecursivePartial<ILinePagerThemeBase>;
  press: RecursivePartial<ILinePagerThemeBase>;
  focus: RecursivePartial<ILinePagerThemeBase>;
}

export interface ILinePagerTheme extends ThemeType {
  normal: ILinePagerThemeState;
  active: RecursivePartial<ILinePagerThemeState>;
}
