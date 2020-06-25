import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { IBoxTheme, ITextTheme } from '../../subatoms';

export interface ILinkThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface ILinkThemeState extends ThemeType {
  default: ILinkThemeBase;
  hover: RecursivePartial<ILinkThemeBase>;
}

export interface ILinkTheme extends ThemeType {
  normal: ILinkThemeState;
  disabled: RecursivePartial<ILinkThemeState>;
  visited: RecursivePartial<ILinkThemeState>;
}
