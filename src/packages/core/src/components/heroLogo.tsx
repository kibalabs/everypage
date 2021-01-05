import React from 'react';

import { Image, ResponsiveContainingView } from '@kibalabs/ui-react';

interface IHeroLogoProps {
  source: string;
}

export const HeroLogo = (props: IHeroLogoProps): React.ReactElement => {
  return (
    <ResponsiveContainingView sizeResponsive={{ base: 12, medium: 10 }}><Image source={props.source} isFullWidth={true} alternativeText='logo' /></ResponsiveContainingView>
  );
};

HeroLogo.displayName = 'hero-logo';
HeroLogo.defaultProps = {
};
