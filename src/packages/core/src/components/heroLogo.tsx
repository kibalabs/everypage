import React from 'react';
import { ResponsiveContainingView, Image } from '@kibalabs/ui-react';

interface IHeroLogoProps {
  logoImageUrl: string;
}

export const HeroLogo = (props: IHeroLogoProps): React.ReactElement => {
  return (
    <ResponsiveContainingView size={12} sizeMedium={10}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' /></ResponsiveContainingView>
  );
};

HeroLogo.displayName = 'hero-logo';
HeroLogo.defaultProps = {
};
