import React from 'react';
import { NavBar1 } from './sections/navbar1';
import { HeroSignup1 } from './sections/heroSignup1';


interface SectionRendererProps {
  sectionJson: Record<string, any>;
}

export const SectionRenderer = (props: SectionRendererProps): React.ReactElement => {
  if (props.sectionJson.type === 'navbar-1') {
    return <NavBar1 {...props.sectionJson} />
  }
  if (props.sectionJson.type === 'hero-signup-1') {
    return <HeroSignup1 {...props.sectionJson} />
  }
  return null;
};
