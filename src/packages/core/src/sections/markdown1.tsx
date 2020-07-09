import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Alignment, Markdown, Spacing, TextAlignment, Stack, PaddingSize } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';

interface IMarkdown1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  markdownContent?: string;
}

export const Markdown1 = (props: IMarkdown1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(Markdown1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeLarge={8}>
        <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
          {props.titleText && <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>}
          {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
          {(props.titleText || props.subtitleText) && <Spacing mode={PaddingSize.Default} />}
          {props.markdownContent && <Markdown rootTextAlignment={TextAlignment.Left} source={props.markdownContent}/>}
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
Markdown1.displayName = 'markdown-1';
Markdown1.defaultProps = {
};
