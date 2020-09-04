import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Grid, Media, PaddingSize, TextAlignment, Stack, Direction, Alignment, ResponsiveTextAlignmentView, useTheme, ITheme, KibaIcon, Box, ResponsiveView, ScreenSize } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
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
  boxMode?: string;
  features?: FeatureMediaCenter1Feature[];
}

export const FeatureMediaCenter1 = (props: IFeatureMediaCenter1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
  return (
    <Section {...props as ISectionProps} className={getClassName(FeatureMediaCenter1.displayName, props.className)}>
      <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
        <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
          {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
          {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
          <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
            <Grid.Item size={10} sizeMedium={4}>
              <Stack direction={Direction.Vertical} contentAlignment={Alignment.Fill} isFullHeight={true}>
                {props.features.slice(0, Math.floor(props.features.length / 2)).map((feature: FeatureMediaCenter1Feature, index: number): React.ReactElement => (
                  <Stack.Item key={index} gutterSizeAfter={PaddingSize.Wide}>
                    <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentMedium={TextAlignment.Right}>
                      <Stack direction={Direction.Vertical} directionMedium={Direction.Horizontal} childAlignment={Alignment.Center} childAlignmentMedium={Alignment.Start} shouldAddGutters={true} isFullWidth={true}>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveView hiddenAbove={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                          </ResponsiveView>
                        </Stack.Item>
                        <Stack.Item growthFactor={1} shrinkFactor={1}>
                          <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center} childAlignment={Alignment.Fill} shouldAddGutters={false} isFullWidth={true}>
                            {feature.title && <Stack.Item gutterSizeAfter={feature.description ? PaddingSize.Default : PaddingSize.None}><MarkdownText textMode='subtitle' source={feature.title} /></Stack.Item>}
                            {feature.description && <MarkdownText source={feature.description} />}
                          </Stack>
                        </Stack.Item>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveView hiddenBelow={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon size='large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                          </ResponsiveView>
                        </Stack.Item>
                      </Stack>
                    </ResponsiveTextAlignmentView>
                  </Stack.Item>
                ))}
              </Stack>
            </Grid.Item>
            <Grid.Item size={8} sizeMedium={4} alignment={Alignment.Center}>
              <Media isCenteredHorizontally={true} source={props.mediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
            <Grid.Item size={10} sizeMedium={4}>
              <Stack direction={Direction.Vertical} contentAlignment={Alignment.Fill} isFullHeight={true}>
                {props.features.slice(Math.ceil(props.features.length / 2), props.features.length).map((feature: FeatureMediaCenter1Feature, index: number): React.ReactElement => (
                  <Stack.Item key={index} gutterSizeAfter={PaddingSize.Wide}>
                    <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentMedium={TextAlignment.Left}>
                      <Stack direction={Direction.Vertical} directionMedium={Direction.Horizontal} childAlignment={Alignment.Center} childAlignmentMedium={Alignment.Start} shouldAddGutters={true} isFullWidth={true}>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveView hiddenAbove={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                          </ResponsiveView>
                        </Stack.Item>
                        <Stack.Item shrinkFactor={0}>
                          <ResponsiveView hiddenBelow={ScreenSize.Medium}>
                            {feature.iconId && <KibaIcon size='large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                          </ResponsiveView>
                        </Stack.Item>
                        <Stack.Item growthFactor={1} shrinkFactor={1}>
                          <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center} childAlignment={Alignment.Fill} shouldAddGutters={false} isFullWidth={true}>
                            {feature.title && <Stack.Item gutterSizeAfter={feature.description ? PaddingSize.Default : PaddingSize.None}><MarkdownText textMode='subtitle' source={feature.title} /></Stack.Item>}
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