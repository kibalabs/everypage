import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, EqualGrid, ITheme, KibaIcon, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveField, ResponsiveTextAlignmentView, Stack, TextAlignment, useTheme } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IFeatureGrid1Feature {
  title?: string;
  description?: string;
  iconId?: string;
}

interface IFeatureGrid1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxSizes?: ResponsiveField<number>;
  features?: IFeatureGrid1Feature[];
}

export const FeatureGrid1 = (props: IFeatureGrid1Props): React.ReactElement => {
  const theme: ITheme = useTheme();

  const sizes = { base: 12, small: 6, medium: 6, large: 4 };
  if (props.boxSizes) {
    sizes.base = props.boxSizes.base ? 12 / props.boxSizes.base : sizes.base;
    sizes.small = props.boxSizes.small ? 12 / props.boxSizes.small : sizes.small;
    sizes.medium = props.boxSizes.medium ? 12 / props.boxSizes.medium : sizes.medium;
    sizes.large = props.boxSizes.large ? 12 / props.boxSizes.large : sizes.large;
  }

  return (
    <Section {...props as ISectionProps} className={getClassName(FeatureGrid1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, extraLarge: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} contentAlignment={Alignment.Start} shouldAddGutters={true} childSizeResponsive={{ base: 6 }}>
              {props.features?.map((feature: IFeatureGrid1Feature, index: number): React.ReactElement => (
                <Stack key={index} direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
                  {feature.iconId && (
                    <KibaIcon variant='large-colored' iconId={feature.iconId} _color={theme.colors.background} />
                  )}
                  <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start} childAlignment={Alignment.Start} isFullWidth={true} paddingEnd={PaddingSize.Wide} shouldAddGutters={true}>
                    {feature.title && <MarkdownText textAlignment={TextAlignment.Left} textVariant='subtitle' source={feature.title} />}
                    {feature.description && <MarkdownText textAlignment={TextAlignment.Justify} source={feature.description} />}
                  </Stack>
                </Stack>
              ))}
            </EqualGrid>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};

FeatureGrid1.displayName = 'feature-grid-1';
FeatureGrid1.defaultProps = {};
