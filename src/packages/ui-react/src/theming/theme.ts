import { ThemeMap, ThemeType } from '../util';
import { IColorGuide } from '../subatoms/colors';
import { IDimensionGuide } from '../subatoms/dimensions';
import { IFont } from '../subatoms/fonts';
import { ITextTheme } from '../subatoms/text';
import { IBoxTheme } from '../subatoms/box';
import { IImageTheme } from '../subatoms/image';
import { IVideoTheme } from '../subatoms/video';
import { ILoadingSpinnerTheme } from '../subatoms/loadingSpinner';
import { IPortalTheme } from '../subatoms/portal';
import { IBulletListTheme } from '../atoms/bulletList';
import { IBulletTextTheme } from '../atoms/bulletText';
import { IButtonTheme } from '../atoms/button';
import { ILinkBaseTheme } from '../atoms/linkBase';
import { IIconButtonTheme } from '../atoms/iconButton';
import { IInputWrapperTheme } from '../atoms/inputWrapper';
import { ILinkTheme } from '../atoms/link';
import { IPrettyTextTheme } from '../atoms/prettyText';
import { IWebViewTheme } from '../atoms/webView';
import { ILinePagerTheme } from '../atoms/linePager';
import { IIconTheme } from '../subatoms/icon';

export interface ITheme extends ThemeType {
  // Base
  colors: IColorGuide,
  alternateColors: Record<string, IColorGuide>,
  dimensions: IDimensionGuide,
  fonts: Record<string, IFont>,

  // Subatoms
  boxes: ThemeMap<IBoxTheme>,
  texts: ThemeMap<ITextTheme>,
  icons: ThemeMap<IIconTheme>,
  images: ThemeMap<IImageTheme>,
  loadingSpinners: ThemeMap<ILoadingSpinnerTheme>,
  portals: ThemeMap<IPortalTheme>,
  videos: ThemeMap<IVideoTheme>,

  // Atoms
  bulletLists: ThemeMap<IBulletListTheme>,
  bulletTexts: ThemeMap<IBulletTextTheme>,
  buttons: ThemeMap<IButtonTheme>,
  linkBases: ThemeMap<ILinkBaseTheme>,
  iconButtons: ThemeMap<IIconButtonTheme>,
  inputWrappers: ThemeMap<IInputWrapperTheme>,
  links: ThemeMap<ILinkTheme>,
  prettyTexts: ThemeMap<IPrettyTextTheme>,
  webViews: ThemeMap<IWebViewTheme>,
  linePagers: ThemeMap<ILinePagerTheme>,
}
