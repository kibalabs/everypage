import { ThemeType, RecursivePartial } from '../../util';
import { IBoxTheme, ITextTheme } from '../../subatoms';

export interface IInputWrapperThemeBase extends ThemeType {
  text: ITextTheme;
  errorText: ITextTheme;
  placeholderText: ITextTheme;
  background: IBoxTheme;
}

export interface IInputWrapperThemeState extends ThemeType {
  default: IInputWrapperThemeBase;
  hover: RecursivePartial<IInputWrapperThemeBase>;
  focus: RecursivePartial<IInputWrapperThemeBase>;
}

export interface IInputWrapperTheme extends ThemeType {
  normal: IInputWrapperThemeState;
  error: RecursivePartial<IInputWrapperThemeState>;
  disabled: RecursivePartial<IInputWrapperThemeState>;
}
