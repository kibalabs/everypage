import { ThemeMap, ThemeType } from '../util';
import { IColorGuide } from '../subatoms/colors/theme';
import { IDimensionGuide } from '../subatoms/dimensions/theme';
import { IFont } from '../subatoms/fonts/theme';
import { ITextTheme } from '../subatoms/text/theme';
import { IBoxTheme } from '../subatoms/box/theme';
import { IImageTheme } from '../subatoms/image/theme';
import { IVideoTheme } from '../subatoms/video/theme';
import { ILoadingSpinnerTheme } from '../subatoms/loadingSpinner/theme';
import { IBulletListTheme } from '../atoms/bulletList/theme';
import { IBulletTextTheme } from '../atoms/bulletText/theme';
import { IButtonTheme } from '../atoms/button/theme';
import { ILinkBaseTheme } from '../atoms/linkBase/theme';
import { IInputWrapperTheme } from '../atoms/inputWrapper/theme';
import { ILinkTheme } from '../atoms/link/theme';

export interface ITheme extends ThemeType {
  // Base
  colors: IColorGuide,
  dimensions: IDimensionGuide,
  fonts: Record<string, IFont>,

  // Subatoms
  boxes: ThemeMap<IBoxTheme>,
  texts: ThemeMap<ITextTheme>,
  images: ThemeMap<IImageTheme>,
  videos: ThemeMap<IVideoTheme>,
  loadingSpinners: ThemeMap<ILoadingSpinnerTheme>,

  // Atoms
  bulletLists: ThemeMap<IBulletListTheme>,
  bulletTexts: ThemeMap<IBulletTextTheme>,
  buttons: ThemeMap<IButtonTheme>,
  linkBases: ThemeMap<ILinkBaseTheme>,
  inputWrappers: ThemeMap<IInputWrapperTheme>,
  links: ThemeMap<ILinkTheme>,
}
