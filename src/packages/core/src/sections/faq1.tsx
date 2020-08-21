import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Stack, Alignment, Direction, TextAlignment, ResponsiveContainingView, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IFaq1Question {
  questionText: string;
  answerText: string;
}

interface IFaq1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  questions?: IFaq1Question[];
}

export const Faq1 = (props: IFaq1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(Faq1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeLarge={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} shouldAddGutters={true} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionTop}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            {props.questions.map((question: IFaq1Question, index: number): React.ReactElement => (
              <React.Fragment key={index}>
                <Stack.Item gutterSizeAfter={PaddingSize.Narrow}>
                  <MarkdownText textMode='header6' textAlignment={TextAlignment.Left} source={question.questionText} />
                </Stack.Item>
                <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}>
                  <MarkdownText textAlignment={TextAlignment.Left} source={question.answerText} />
                </Stack.Item>
              </React.Fragment>
            ))}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
Faq1.displayName = 'faq-1';
