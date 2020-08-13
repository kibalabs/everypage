import { ThemeType } from '../../util';
import { IBoxTheme } from '../box';

export interface IImageTheme extends ThemeType {
  background: IBoxTheme;
}
