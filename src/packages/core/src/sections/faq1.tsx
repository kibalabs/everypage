import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, ResponsiveContainingView, PaddingSize } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';

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
        <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
          <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
          {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
          {props.questions.map((question: IFaq1Question, index: number): React.ReactElement => (
            <React.Fragment key={index}>
              <Stack.Item alignment={Alignment.Start} gutterSizeAfter={PaddingSize.None}>
                <Markdown rootTextMode='header5' rootTextAlignment={TextAlignment.Left} source={question.questionText} />
              </Stack.Item>
              <Stack.Item alignment={Alignment.Start}>
                <Markdown rootTextAlignment={TextAlignment.Left} source={question.answerText} />
              </Stack.Item>
            </React.Fragment>
          ))}
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
Faq1.displayName = 'faq-1';
