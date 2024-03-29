import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Direction, Markdown, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IMarkdown1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  markdownContent?: string;
}

export const Markdown1 = (props: IMarkdown1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(Markdown1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, large: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <ResponsiveTextAlignmentView alignment={TextAlignment.Left}>
              {props.markdownContent && <Markdown source={props.markdownContent} />}
            </ResponsiveTextAlignmentView>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
Markdown1.displayName = 'markdown-1';
Markdown1.defaultProps = {
  paddingTop: EverypagePaddingSize.SectionTop,
  paddingBottom: EverypagePaddingSize.SectionBottom,
};
