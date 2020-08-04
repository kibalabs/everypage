import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Text, Spacing, Stack, Alignment, TextAlignment, ResponsiveContainingView, Grid, Media, Direction, KibaIcon, useTheme, ITheme, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';

interface IFeatureSteps1Feature {
  title?: string;
  description?: string;
  mediaUrl?: string;
  iconId?: string;
}

interface IFeatureSteps1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  features?: IFeatureSteps1Feature[];
}

export const FeatureSteps1 = (props: IFeatureSteps1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
  return (
    <Section {...props as ISectionProps} className={getClassName(FeatureSteps1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeExtraLarge={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraWide}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Grid childAlignment={Alignment.Center} shouldAddGutters={true}>
              {props.features.map((feature: IFeatureSteps1Feature, index: number): React.ReactElement => (
                <React.Fragment key={index}>
                  <Grid.Item size={1} />
                  <Grid.Item alignment={Alignment.Center} size={4} sizeMedium={index % 2 === 0 ? 2 : 0}>
                    {feature.mediaUrl && <Media isCenteredHorizontally={true} source={feature.mediaUrl} alternativeText={'media'} />}
                    {!feature.mediaUrl && feature.iconId && <KibaIcon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                  </Grid.Item>
                  {index % 2 === 0 && <Grid.Item size={1} />}
                  <Grid.Item size={7}>
                    <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentMedium={TextAlignment.Left}>
                      <Stack direction={Direction.Vertical}>
                        <Spacing mode={PaddingSize.Wide}/>
                        {feature.title && (
                          <Stack.Item gutterSizeAfter={PaddingSize.Default}>
                            <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} shouldAddGutters={true}>
                              <Text mode='header5-inline'>{index + 1}.</Text>
                              <MarkdownText textMode={'header5'} source={feature.title}/>
                            </Stack>
                          </Stack.Item>
                        )}
                        {feature.description && <Stack.Item gutterSizeAfter={PaddingSize.Wide}><MarkdownText source={feature.description}/></Stack.Item>}
                      </Stack>
                    </ResponsiveTextAlignmentView>
                  </Grid.Item>
                  {index % 2 === 1 && <Grid.Item size={1} />}
                  <Grid.Item alignment={Alignment.Center} size={0} sizeMedium={index % 2 === 1 ? 2 : 0}>
                    {feature.mediaUrl && <Media isCenteredHorizontally={true} source={feature.mediaUrl} alternativeText={'media'} />}
                    {!feature.mediaUrl && feature.iconId && <KibaIcon size='extra-large' iconId={feature.iconId} _color={theme.colors.brandPrimary}/>}
                  </Grid.Item>
                  <Grid.Item size={1} />
                </React.Fragment>
              ))}
            </Grid>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
FeatureSteps1.displayName = 'feature-steps-1';
FeatureSteps1.defaultProps = {
  boxMode: 'bordered',
};
