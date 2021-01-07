import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, Grid, MarkdownText, PaddingSize, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyMedia, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

// TODO(krishan711): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IFeatureMediaHalf1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  bodyText?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
}

export const FeatureMediaHalf1 = (props: IFeatureMediaHalf1Props): React.ReactElement => {
  if (props.leftMediaUrl && props.rightMediaUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to feature-media-half-1');
  }

  return (
    <Section {...props as ISectionProps} className={getClassName(FeatureMediaHalf1.displayName, props.className)}>
      <Grid childAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={EverypagePaddingSize.SectionTop} paddingBottom={EverypagePaddingSize.SectionTop}>
        {props.leftMediaUrl && (<Grid.Item sizeResponsive={{ base: 0, medium: 1 }} />) }
        {props.leftMediaUrl && (
          <Grid.Item sizeResponsive={{ base: 0, medium: 4 }}>
            <LazyMedia isCenteredHorizontally={true} source={props.leftMediaUrl} alternativeText={'hero-media'} />
          </Grid.Item>
        )}
        <Grid.Item size={1} />
        <Grid.Item sizeResponsive={{ base: 10, medium: 5 }}>
          <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentResponsive={{ medium: TextAlignment.Left }}>
            <Stack direction={Direction.Vertical}>
              {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
              {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
              {props.bodyText && <Stack.Item gutterAfter={PaddingSize.Wide}><MarkdownText textAlignment={TextAlignment.Left} source={props.bodyText} /></Stack.Item>}
            </Stack>
          </ResponsiveTextAlignmentView>
        </Grid.Item>
        <Grid.Item size={1} />
        {props.rightMediaUrl && (
          <Grid.Item sizeResponsive={{ base: 0, medium: 4 }}>
            <LazyMedia isCenteredHorizontally={true} source={props.rightMediaUrl} alternativeText={'hero-media'} />
          </Grid.Item>
        )}
        {props.rightMediaUrl && (<Grid.Item sizeResponsive={{ base: 0, medium: 1 }} />) }
        {props.leftMediaUrl && (
          <Grid.Item sizeResponsive={{ base: 8, medium: 0 }}>
            <LazyMedia isCenteredHorizontally={true} source={props.leftMediaUrl} alternativeText={'hero-media'} />
          </Grid.Item>
        )}
        {props.rightMediaUrl && (
          <Grid.Item sizeResponsive={{ base: 8, medium: 0 }}>
            <LazyMedia isCenteredHorizontally={true} source={props.rightMediaUrl} alternativeText={'hero-media'} />
          </Grid.Item>
        )}
      </Grid>
    </Section>
  );
};
FeatureMediaHalf1.displayName = 'feature-media-half-1';
