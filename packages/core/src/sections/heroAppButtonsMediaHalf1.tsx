import React from 'react';

import { ISectionProps } from '.';
import { HeroAppDownloadMediaHalf1 } from './heroAppDownloadMediaHalf1';

// TODO(krishan711): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroAppButtonsMediaHalf1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
  iosAppId?: string;
  androidAppId?: string;
  macAppId?: string;
  appButtonMode?: string;
  appButtonVariant?: string;
}

export const HeroAppButtonsMediaHalf1 = (props: IHeroAppButtonsMediaHalf1Props): React.ReactElement => {
  console.warn(`${HeroAppButtonsMediaHalf1.displayName} is now deprecated. Please use ${HeroAppDownloadMediaHalf1.displayName} instead.`);
  return (
    <HeroAppDownloadMediaHalf1 {...props} />
  );
};
HeroAppButtonsMediaHalf1.displayName = 'hero-app-buttons-media-half-1';
HeroAppButtonsMediaHalf1.defaultProps = {
};
