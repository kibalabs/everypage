import React from 'react';

import { getClassName } from '@kibalabs/core';
import { MarkdownText, TextAlignment } from '@kibalabs/ui-react';

interface ISectionTitleTextProps {
  id?: string;
  className: string;
  text: string;
  alignment?: TextAlignment;
}

export const SectionTitleText = (props: ISectionTitleTextProps): React.ReactElement => {
  return (
    <MarkdownText
      id={props.id}
      className={getClassName(SectionTitleText.displayName, props.className)}
      textVariant='header2-sectionTitle'
      textAlignment={props.alignment}
      source={props.text}
    />
  );
};
SectionTitleText.defaultProps = {
  className: '',
};
SectionTitleText.displayName = 'section-title';
