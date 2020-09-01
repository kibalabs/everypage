import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Direction, Markdown, Stack, PaddingSize, ResponsiveTextAlignmentView, TextAlignment } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IMarkdown1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  markdownContent?: string;
}

export const Markdown1 = (props: IMarkdown1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(Markdown1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeLarge={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            {props.markdownContent && <Markdown source={props.markdownContent}/>}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
Markdown1.displayName = 'markdown-1';
Markdown1.defaultProps = {
};
