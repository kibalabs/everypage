import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, Grid, EqualGrid, Box, Media, Direction, KibaIcon, useTheme, ITheme, PaddingSize } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';

interface IFeatureBoxes1Feature {
  title?: string;
  description?: string;
  mediaUrl?: string;
  iconId?: string;
}

interface IFeatureBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  features?: IFeatureBoxes1Feature[];
}

export const FeatureBoxes1 = (props: IFeatureBoxes1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
  return (
    <Section {...props as ISectionProps} className={getClassName(FeatureBoxes1.displayName, props.className)}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={10} sizeLarge={12}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true} gutterSizeStart={PaddingSize.Wide} gutterSizeEnd={PaddingSize.Wide}>
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
              <Spacing mode='narrow' />
              {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            </Stack>
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={6} size={12}>
              {props.features.map((feature: IFeatureBoxes1Feature, index: number): React.ReactElement => (
                <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} gutterSizeStart={PaddingSize.Wide} gutterSizeEnd={PaddingSize.Wide}>
                    {feature.mediaUrl && <Media source={feature.mediaUrl} alternativeText={feature.title} />}
                    {!feature.mediaUrl && feature.iconId && <KibaIcon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                    <Spacing direction={Direction.Vertical} mode='wide' />
                    {feature.title && <Markdown rootTextAlignment={TextAlignment.Center} rootTextMode='subtitle' source={feature.title} />}
                    <Spacing direction={Direction.Vertical} mode='narrow' />
                    {feature.description && <Markdown rootTextAlignment={TextAlignment.Center} source={feature.description} />}
                    <Stack.Item growthFactor={1} />
                  </Stack>
                </Box>
              ))}
            </EqualGrid>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
FeatureBoxes1.displayName = 'feature-boxes-1';
FeatureBoxes1.defaultProps = {
  boxMode: 'bordered',
};
