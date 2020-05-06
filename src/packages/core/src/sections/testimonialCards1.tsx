import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid, Box } from '../components';

interface ITestimonialCards1Card {
  text: string;
  author: string;
  url: string;
}

interface ITestimonialCards1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  cards?: ITestimonialCards1Card[];
}

export const TestimonialCards1 = (props: ITestimonialCards1Props): React.ReactElement => {
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
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>
              <Spacing mode='narrow' />
              {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            </Stack>
            <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
              {props.cards.map((card: ITestimonialCards1Card, index: number): React.ReactElement => (
                <Grid.Item key={index} size={4}>
                  <Box mode='card'>
                    <React.Fragment>
                      <MarkdownText alignment={TextAlignment.Left} text={card.text} />
                      <MarkdownText mode='note' alignment={TextAlignment.Left} text={card.author} />
                    </React.Fragment>
                  </Box>
                </Grid.Item>
              ))}
            </Grid>
            <Spacing />
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
TestimonialCards1.displayName = 'testimonial-cards-1';
