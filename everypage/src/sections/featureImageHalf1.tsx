import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Image, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, Direction } from '../components';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IFeatureImageHalf1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export const FeatureImageHalf1 = (props: IFeatureImageHalf1Props): React.ReactElement => {
  if (props.leftImageUrl && props.rightImageUrl) {
    throw new Error('Only one of {leftImageUrl, rightImageUrl} should be provided to feature-image-half-1')
  }

  return (
    <Section
      id={props.id}
      className={props.className}
      background={props.background}
    >
      <Stack direction={Direction.Vertical}>
        <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
        <Grid>
          { props.leftImageUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          { props.leftImageUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Image source={props.leftImageUrl} alternativeText={'hero-image'} />
            </Grid.Item>
          )}
          <Grid.Item size={1}><div /></Grid.Item>
          <Grid.Item size={10} sizeMedium={5}>
            <Stack direction={Direction.Vertical}>
              <MarkdownText mode='header' alignment={TextAlignment.Left} text={props.titleText}/>
              <Spacing mode={SpacingSize.ExtraWide} />
              <MarkdownText alignment={TextAlignment.Left} text={props.subtitleText}/>
              <Spacing mode={SpacingSize.ExtraExtraWide}/>
            </Stack>
          </Grid.Item>
          <Grid.Item size={1}><div /></Grid.Item>
          { props.rightImageUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Image source={props.rightImageUrl} alternativeText={'hero-image'} />
            </Grid.Item>
          )}
          { props.rightImageUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          <Grid.Item size={2} sizeMedium={0}><div /></Grid.Item>
          { props.leftImageUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Image source={props.leftImageUrl} alternativeText={'hero-image'} />
            </Grid.Item>
          )}
          { props.rightImageUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Image source={props.rightImageUrl} alternativeText={'hero-image'} />
            </Grid.Item>
          )}
        </Grid>
        <Spacing mode={SpacingSize.ExtraExtraWide}/>
      </Stack>
    </Section>
  );
};
FeatureImageHalf1.displayName = 'feature-image-half-1';
