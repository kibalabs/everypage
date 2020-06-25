import { IBoxTheme } from '../box';
import { ThemeType } from '../../util';

export interface IPortalTheme extends ThemeType {
  background: IBoxTheme;
}
