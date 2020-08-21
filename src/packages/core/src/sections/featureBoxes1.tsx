import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, ResponsiveContainingView, EqualGrid, Box, Media, Direction, KibaIcon, useTheme, ITheme, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

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
      <ResponsiveContainingView size={10} sizeExtraLarge={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionTop}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={6} size={12}>
              {props.features.map((feature: IFeatureBoxes1Feature, index: number): React.ReactElement => (
                <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                  <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
                    {feature.mediaUrl && <Media source={feature.mediaUrl} alternativeText={feature.title} />}
                    {!feature.mediaUrl && feature.iconId && <KibaIcon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                    <Spacing mode={PaddingSize.Wide} />
                    {feature.title && <Stack.Item gutterSizeAfter={feature.description ? PaddingSize.Default : PaddingSize.None}><MarkdownText textAlignment={TextAlignment.Center} textMode='subtitle' source={feature.title} /></Stack.Item>}
                    {feature.description && <MarkdownText textAlignment={TextAlignment.Center} source={feature.description} />}
                  </Stack>
                </Box>
              ))}
            </EqualGrid>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
FeatureBoxes1.displayName = 'feature-boxes-1';
FeatureBoxes1.defaultProps = {
  boxMode: 'bordered',
};
