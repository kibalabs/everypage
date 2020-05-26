import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid, Box, TwitterIcon, ChatIcon, ProductHuntIcon, Direction, useTheme, ITheme, Link } from '../components';

interface ITestimonialBoxes1Box {
  text: string;
  author: string;
  url?: string;
  type?: string;
}

interface ITestimonialBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxes?: ITestimonialBoxes1Box[];
}

const getBoxIcon = (boxType: string, brandColor: string): React.ReactElement => {
  if (boxType === 'producthunt') {
    return <ProductHuntIcon _color='#DA552F'/>;
  }
  if (boxType === 'twitter') {
    return <TwitterIcon _color='#1DA1F2'/>;
  }
  return <ChatIcon _color={brandColor}/>;
}

export const TestimonialBoxes1 = (props: ITestimonialBoxes1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
  return (
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={1} sizeLarge={0}><div /></Grid.Item>
        <Grid.Item size={10} sizeLarge={12}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>
              <Spacing mode='narrow' />
              {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            </Stack>
            <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
              {props.boxes.map((box: ITestimonialBoxes1Box, index: number): React.ReactElement => (
                <Grid.Item key={index} sizeLarge={4} sizeMedium={6} sizeSmall={12}>
                  <Box mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                    <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true}>
                        { getBoxIcon(box.type, theme.colors.brandPrimary) }
                        <Spacing direction={Direction.Horizontal} mode='narrow' />
                        <Link destination={box.url} text={box.author} isEnabled={!!box.url} />
                      </Stack>
                      <Spacing direction={Direction.Vertical} mode='narrow' />
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <MarkdownText alignment={TextAlignment.Left} text={box.text} />
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
TestimonialBoxes1.displayName = 'testimonial-boxes-1';
TestimonialBoxes1.defaultProps = {
  boxMode: 'bordered',
};
