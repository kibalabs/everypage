import { merge, RecursivePartial } from '@kibalabs/core';

import { ITheme } from '.';
import { buildColors } from '../subatoms/colors';
import { buildDimensions } from '../subatoms/dimensions';
import { buildFonts } from '../subatoms/fonts';
import { buildTextThemes } from '../subatoms/text';
import { buildBoxThemes } from '../subatoms/box';
import { buildImageThemes } from '../subatoms/image';
import { buildLoadingSpinnerThemes } from '../subatoms/loadingSpinner';
import { buildPortalThemes } from '../subatoms/portal';
import { buildVideoThemes } from '../subatoms/video';
import { buildBulletListThemes } from '../atoms/bulletList';
import { buildBulletTextThemes } from '../atoms/bulletText';
import { buildButtonThemes } from '../atoms/button';
import { buildIconButtonThemes } from '../atoms/iconButton';
import { buildInputWrapperThemes } from '../atoms/inputWrapper';
import { buildLinkThemes } from '../atoms/link';
import { buildLinkBaseThemes } from '../atoms/linkBase';
import { buildPrettyTextThemes } from '../atoms/prettyText';

export const buildTheme = (inputTheme?: RecursivePartial<ITheme>): ITheme => {
  const colors = buildColors(inputTheme?.colors);
  const dimensions = buildDimensions(inputTheme?.dimensions);
  const fonts = buildFonts(inputTheme?.fonts);

  const textThemes = buildTextThemes(colors, dimensions, inputTheme?.texts);
  const boxThemes = buildBoxThemes(colors, dimensions, inputTheme?.boxes);
  const imageThemes = buildImageThemes(colors, dimensions, inputTheme?.images);
  const loadingSpinnerThemes = buildLoadingSpinnerThemes(colors, dimensions, inputTheme?.loadingSpinners);
  const portalThemes = buildPortalThemes(colors, dimensions, boxThemes, inputTheme?.portals);
  const videoThemes = buildVideoThemes(colors, dimensions, inputTheme?.videos);

  const buttonThemes = buildButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.buttons);
  const bulletListThemes = buildBulletListThemes(colors, dimensions, inputTheme?.bulletLists);
  const bulletTextThemes = buildBulletTextThemes(colors, dimensions, textThemes, inputTheme?.bulletTexts);
  const iconButtonThemes = buildIconButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.iconButtons);
  const inputWrapperThemes = buildInputWrapperThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.inputWrappers);
  const linkBaseThemes = buildLinkBaseThemes(colors, dimensions, boxThemes, inputTheme?.linkBases);
  const linkThemes = buildLinkThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.links);
  const prettyTextThemes = buildPrettyTextThemes(colors, dimensions, textThemes, inputTheme?.prettyTexts);

  return merge<ITheme>({
    // Base
    colors: colors,
    dimensions: dimensions,
    fonts: fonts,

    // Subatoms
    boxes: boxThemes,
    texts: textThemes,
    images: imageThemes,
    loadingSpinners: loadingSpinnerThemes,
    portals: portalThemes,
    videos: videoThemes,

    // Atoms
    bulletLists: bulletListThemes,
    bulletTexts: bulletTextThemes,
    buttons: buttonThemes,
    iconButtons: iconButtonThemes,
    inputWrappers: inputWrapperThemes,
    linkBases: linkBaseThemes,
    links: linkThemes,
    prettyTexts: prettyTextThemes,
  }, inputTheme, {
    // NOTE(krish): this is here so the font replacement doesn't get overridden
    fonts: fonts,
  });
};
