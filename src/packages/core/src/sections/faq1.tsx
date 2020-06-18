import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid } from '@kibalabs/ui-react';

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
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={1} sizeLarge={2}><div /></Grid.Item>
        <Grid.Item size={10} sizeLarge={8}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>
            {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            <Stack childAlignment={Alignment.Start} isFullWidth={true} shouldAddGutters={true}>
              {props.questions.map((question: IFaq1Question, index: number): React.ReactElement => (
                <React.Fragment key={index}>
                  <MarkdownText mode='header5' alignment={TextAlignment.Left} text={question.questionText} />
                  <MarkdownText alignment={TextAlignment.Left} text={question.answerText} />
                </React.Fragment>
              ))}
              <Spacing />
            </Stack>
            <Spacing mode='wide' />
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
Faq1.displayName = 'faq-1';
