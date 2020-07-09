import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, ResponsiveContainingView, EqualGrid, Box, Media, Direction, KibaIcon, useTheme, ITheme, PaddingSize } from '@kibalabs/ui-react';

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
      <ResponsiveContainingView size={10} sizeLarge={12}>
        <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
          <Stack.Item gutterSizeAfter={PaddingSize.None}>
            <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
          </Stack.Item>
          {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
          <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={6} size={12}>
            {props.features.map((feature: IFeatureBoxes1Feature, index: number): React.ReactElement => (
              <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
                  {feature.mediaUrl && <Media source={feature.mediaUrl} alternativeText={feature.title} />}
                  {!feature.mediaUrl && feature.iconId && <KibaIcon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                  <Spacing direction={Direction.Vertical} mode='wide' />
                  {feature.title && <Markdown rootTextAlignment={TextAlignment.Center} rootTextMode='subtitle' source={feature.title} />}
                  <Spacing direction={Direction.Vertical} mode='narrow' />
                  {feature.description && <Markdown rootTextAlignment={TextAlignment.Center} source={feature.description} />}
                </Stack>
              </Box>
            ))}
          </EqualGrid>
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
FeatureBoxes1.displayName = 'feature-boxes-1';
FeatureBoxes1.defaultProps = {
  boxMode: 'bordered',
};
