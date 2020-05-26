import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Media, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, Direction, Alignment } from '../components';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IFeatureMediaHalf1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
}

export const FeatureMediaHalf1 = (props: IFeatureMediaHalf1Props): React.ReactElement => {
  if (props.leftMediaUrl && props.rightMediaUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to feature-media-half-1')
  }

  return (
    <Section {...props as ISectionProps}>
      <Stack direction={Direction.Vertical}>
        <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
        <Grid childAlignment={Alignment.Center}>
          { props.leftMediaUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          { props.leftMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media source={props.leftMediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item size={1}><div /></Grid.Item>
          <Grid.Item size={10} sizeMedium={5}>
            <Stack direction={Direction.Vertical}>
              <MarkdownText mode='title' alignment={TextAlignment.Left} text={props.titleText}/>
              <Spacing mode={SpacingSize.Wide} />
              <MarkdownText alignment={TextAlignment.Left} text={props.subtitleText}/>
              <Spacing mode={SpacingSize.Wide}/>
            </Stack>
          </Grid.Item>
          <Grid.Item size={1}><div /></Grid.Item>
          { props.rightMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media source={props.rightMediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          <Grid.Item size={2} sizeMedium={0}><div /></Grid.Item>
          { props.leftMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media source={props.leftMediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media source={props.rightMediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
        </Grid>
        <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
      </Stack>
    </Section>
  );
};
FeatureMediaHalf1.displayName = 'feature-media-half-1';
