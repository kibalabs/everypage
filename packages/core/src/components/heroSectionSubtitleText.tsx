import React from 'react';

import { getClassName } from '@kibalabs/core';
import { MarkdownText, TextAlignment } from '@kibalabs/ui-react';

interface IHeroSectionSubtitleTextProps {
  id?: string;
  className: string;
  text: string;
  alignment?: TextAlignment;
}

export const HeroSectionSubtitleText = (props: IHeroSectionSubtitleTextProps): React.ReactElement => {
  return (
    <MarkdownText
      id={props.id}
      className={getClassName(HeroSectionSubtitleText.displayName, props.className)}
      textVariant='header3-heroSectionSubtitle'
      textAlignment={props.alignment}
      source={props.text}
    />
  );
};
HeroSectionSubtitleText.defaultProps = {
  className: '',
};
HeroSectionSubtitleText.displayName = 'hero-section-title';
