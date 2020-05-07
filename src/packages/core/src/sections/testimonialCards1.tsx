import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid, Box, TwitterIcon, ChatIcon, ProductHuntIcon, Direction, useTheme, ITheme, Link } from '../components';

interface ITestimonialCards1Card {
  text: string;
  author: string;
  url?: string;
  type?: string;
}

interface ITestimonialCards1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  cards?: ITestimonialCards1Card[];
}

const getCardIcon = (cardType: string, brandColor: string): React.ReactElement => {
  if (cardType === 'producthunt') {
    return <ProductHuntIcon _color='#DA552F'/>;
  }
  if (cardType === 'twitter') {
    return <TwitterIcon _color='#1DA1F2'/>;
  }
  return <ChatIcon _color={brandColor}/>;
}

export const TestimonialCards1 = (props: ITestimonialCards1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
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
            <Grid childAlignment={Alignment.Fill} shouldAddGutters={false}>
              {props.cards.map((card: ITestimonialCards1Card, index: number): React.ReactElement => (
                <Grid.Item key={index} sizeLarge={4} sizeMedium={6} sizeSmall={12}>
                  <Box mode='card'>
                    <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true}>
                        { getCardIcon(card.type, theme.colors.brandPrimary) }
                        <Spacing direction={Direction.Horizontal} mode='narrow' />
                        <Link destination={card.url} text={card.author} isEnabled={!!card.url} />
                      </Stack>
                      <Spacing direction={Direction.Vertical} mode='narrow' />
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <MarkdownText alignment={TextAlignment.Left} text={card.text} />
                      </Stack.Item>
                    </Stack>
                  </Box>
                </Grid.Item>
              ))}
            </Grid>
            <Spacing mode='wide' />
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
TestimonialCards1.displayName = 'testimonial-cards-1';
