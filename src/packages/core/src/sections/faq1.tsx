import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid } from '../components';

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
    <Section
      id={props.id}
      className={props.className}
      background={props.background}
    >
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={1} sizeLarge={2}><div /></Grid.Item>
        <Grid.Item size={10} sizeLarge={8}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>
            {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            <Stack childAlignment={Alignment.Start} isFullWidth={true} shouldAddGutters={true}>
              {props.questions.map((question: IFaq1Question, index: number): React.ReactElement => (
                <React.Fragment key={index}>
                  {/* TODO(krish): use strong theme here */}
                  <MarkdownText mode='strong' alignment={TextAlignment.Left} text={question.questionText} />
                  <MarkdownText alignment={TextAlignment.Left} text={question.answerText} />
                </React.Fragment>
              ))}
              <Spacing />
            </Stack>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
Faq1.displayName = 'faq-1';
