import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { IBoxTheme } from '../../subatoms';

export interface IWebViewThemeBase extends ThemeType {
  background: IBoxTheme;
}

export interface IWebViewThemeState extends ThemeType {
  default: IWebViewThemeBase;
}

export interface IWebViewTheme extends ThemeType {
  normal: IWebViewThemeState;
}
