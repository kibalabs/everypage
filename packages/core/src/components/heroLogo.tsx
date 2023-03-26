import React from 'react';

import { IImageProps, Image, ResponsiveContainingView } from '@kibalabs/ui-react';

interface IHeroLogoProps extends Partial<IImageProps> {
  source: string;
}

export const HeroLogo = (props: IHeroLogoProps): React.ReactElement => {
  return (
    <ResponsiveContainingView sizeResponsive={{ base: 12, medium: 10 }}>
      <Image isFullWidth={true} alternativeText='logo' {...props} />
    </ResponsiveContainingView>
  );
};

HeroLogo.displayName = 'hero-logo';
HeroLogo.defaultProps = {
};
