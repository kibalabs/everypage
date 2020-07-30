import React from 'react';
import { getClassName } from '@kibalabs/core'
import { MarkdownText, TextAlignment } from '@kibalabs/ui-react'

interface IHeroSectionTitleTextProps {
  id?: string;
  className: string;
  text: string;
  alignment?: TextAlignment;
}

export const HeroSectionTitleText = (props: IHeroSectionTitleTextProps): React.ReactElement => {
  return (
    <MarkdownText
      id={props.id}
      className={getClassName(HeroSectionTitleText.displayName, props.className)}
      textMode='header1-heroSectionTitle'
      textAlignment={props.alignment}
      source={props.text}
    />
  )
}
HeroSectionTitleText.defaultProps = {
  className: '',
};
HeroSectionTitleText.displayName = 'hero-section-title';
