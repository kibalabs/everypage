import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid, Box, Image, Direction, Ionicon, useTheme, ITheme } from '../components';

interface IFeatureBoxes1Feature {
  title?: string;
  description?: string;
  imageUrl?: string;
  iconId?: string;
}

interface IFeatureBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  features?: IFeatureBoxes1Feature[];
}

export const FeatureBoxes1 = (props: IFeatureBoxes1Props): React.ReactElement => {
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
              {props.features.map((feature: IFeatureBoxes1Feature, index: number): React.ReactElement => (
                <Grid.Item key={index} sizeLarge={4} sizeMedium={6} sizeSmall={12}>
                  <Box mode='bordered' isFullHeight={true}>
                    <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true}>
                      <Spacing direction={Direction.Vertical} mode='wide' />
                      {feature.imageUrl && <Image source={feature.imageUrl} alternativeText={feature.title} />}
                      {!feature.imageUrl && feature.iconId && <Ionicon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                      <Spacing direction={Direction.Vertical} mode='wide' />
                      {feature.title && <MarkdownText alignment={TextAlignment.Center} mode='subtitle' text={feature.title} />}
                      <Spacing direction={Direction.Vertical} mode='narrow' />
                      {feature.description && <MarkdownText alignment={TextAlignment.Center} text={feature.description} />}
                      <Spacing direction={Direction.Vertical} mode='wide' />
                      <Stack.Item growthFactor={1}><div /></Stack.Item>
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
FeatureBoxes1.displayName = 'feature-boxes-1';
