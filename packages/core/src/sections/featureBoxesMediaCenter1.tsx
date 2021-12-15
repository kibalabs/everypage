import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, Grid, ITheme, KibaIcon, MarkdownText, Media, PaddingSize, ResponsiveHidingView, ResponsiveTextAlignmentView, ScreenSize, Stack, TextAlignment, useTheme } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface FeatureMediaCenter1Feature {
  title?: string;
  description?: string;
  iconId?: string;
}

interface IFeatureMediaCenter1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  mediaUrl?: string;
  features?: FeatureMediaCenter1Feature[];
}

export const FeatureMediaCenter1 = (props: IFeatureMediaCenter1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
  return (
    <Section {...props as ISectionProps} className={getClassName(FeatureMediaCenter1.displayName, props.className)}>
      <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
        <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
          {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
          {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
          <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
            <Grid.Item sizeResponsive={{ base: 10, medium: 4 }}>
              <Stack direction={Direction.Vertical} contentAlignment={Alignment.Fill} isFullHeight={true}>
                {props.features?.slice(0, Math.floor((props.features?.length || 0) / 2)).map((feature: FeatureMediaCenter1Feature, index: number): React.ReactElement => (
                  <Stack.Item key={index} gutterAfter={PaddingSize.Wide}>
                    <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentResponsive={{ medium: TextAlignment.Right }}>
                      <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} childAlignmentResponsive={{ base: Alignment.Center, medium: Alignment.Start }} shouldAddGutters={true} isFullWidth={true}>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon variant='extraLarge' iconId={feature.iconId} _color={theme.colors.brandPrimary} />}
                          </ResponsiveHidingView>
                        </Stack.Item>
                        <Stack.Item growthFactor={1} shrinkFactor={1}>
                          <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center} childAlignment={Alignment.Fill} shouldAddGutters={false} isFullWidth={true}>
                            {feature.title && <Stack.Item gutterAfter={feature.description ? PaddingSize.Default : PaddingSize.None}><MarkdownText textVariant='subtitle' source={feature.title} /></Stack.Item>}
                            {feature.description && <MarkdownText source={feature.description} />}
                          </Stack>
                        </Stack.Item>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon variant='large' iconId={feature.iconId} _color={theme.colors.brandPrimary} />}
                          </ResponsiveHidingView>
                        </Stack.Item>
                      </Stack>
                    </ResponsiveTextAlignmentView>
                  </Stack.Item>
                ))}
              </Stack>
            </Grid.Item>
            <Grid.Item sizeResponsive={{ base: 8, medium: 4 }} alignment={Alignment.Center}>
              {props.mediaUrl && <Media isCenteredHorizontally={true} source={props.mediaUrl} alternativeText={'hero-media'} />}
            </Grid.Item>
            <Grid.Item sizeResponsive={{ base: 10, medium: 4 }}>
              <Stack direction={Direction.Vertical} contentAlignment={Alignment.Fill} isFullHeight={true}>
                {props.features?.slice(Math.ceil((props.features?.length || 0) / 2), props.features?.length).map((feature: FeatureMediaCenter1Feature, index: number): React.ReactElement => (
                  <Stack.Item key={index} gutterAfter={PaddingSize.Wide}>
                    <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentResponsive={{ medium: TextAlignment.Left }}>
                      <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} childAlignmentResponsive={{ base: Alignment.Center, medium: Alignment.Start }} shouldAddGutters={true} isFullWidth={true}>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon variant='extraLarge' iconId={feature.iconId} _color={theme.colors.brandPrimary} />}
                          </ResponsiveHidingView>
                        </Stack.Item>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon variant='large' iconId={feature.iconId} _color={theme.colors.brandPrimary} />}
                          </ResponsiveHidingView>
                        </Stack.Item>
                        <Stack.Item growthFactor={1} shrinkFactor={1}>
                          <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center} childAlignment={Alignment.Fill} shouldAddGutters={false} isFullWidth={true}>
                            {feature.title && <Stack.Item gutterAfter={feature.description ? PaddingSize.Default : PaddingSize.None}><MarkdownText textVariant='subtitle' source={feature.title} /></Stack.Item>}
                            {feature.description && <MarkdownText source={feature.description} />}
                          </Stack>
                        </Stack.Item>
                      </Stack>
                    </ResponsiveTextAlignmentView>
                  </Stack.Item>
                ))}
              </Stack>
            </Grid.Item>
          </Grid>
        </Stack>
      </ResponsiveTextAlignmentView>
    </Section>
  );
};
FeatureMediaCenter1.displayName = 'feature-media-center-1';
