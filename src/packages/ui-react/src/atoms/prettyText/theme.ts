import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { ITextTheme } from '../../subatoms';

export interface IPrettyTextThemeBase extends ThemeType {
  text: ITextTheme;
}

export interface IPrettyTextThemeState extends ThemeType {
  default: IPrettyTextThemeBase;
  emphasis: RecursivePartial<IPrettyTextThemeBase>;
  strong: RecursivePartial<IPrettyTextThemeBase>;
}

export interface IPrettyTextTheme extends ThemeType {
  normal: IPrettyTextThemeState;
}
