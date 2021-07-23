import React from 'react';

import { getClassName } from '@kibalabs/core';
import { MarkdownText, TextAlignment } from '@kibalabs/ui-react';

interface ISectionSubtitleTextProps {
  id?: string;
  className: string;
  text: string;
  alignment?: TextAlignment;
}

export const SectionSubtitleText = (props: ISectionSubtitleTextProps): React.ReactElement => {
  return (
    <MarkdownText
      id={props.id}
      className={getClassName(SectionSubtitleText.displayName, props.className)}
      textVariant='sectionSubtitle'
      textAlignment={props.alignment}
      source={props.text}
    />
  );
};
SectionSubtitleText.defaultProps = {
  className: '',
};
SectionSubtitleText.displayName = 'section-subtitle';
