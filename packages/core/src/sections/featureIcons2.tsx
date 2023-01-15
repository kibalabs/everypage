import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Box, Direction, EqualGrid, ITheme, KibaIcon, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveField, ResponsiveTextAlignmentView, Stack, TextAlignment, useTheme } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IFeatureIcons2Feature {
  title?: string;
  description?: string;
  iconId?: string;
}

interface IFeatureIcons2Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxSizes?: ResponsiveField<number>;
  features?: IFeatureIcons2Feature[];
}

export const FeatureIcons2 = (props: IFeatureIcons2Props): React.ReactElement => {
  const theme: ITheme = useTheme();

  const sizes = { base: 12, small: 12, medium: 6, large: 4 };
  if (props.boxSizes) {
    sizes.base = props.boxSizes.base ? 12 / props.boxSizes.base : sizes.base;
    sizes.small = props.boxSizes.small ? 12 / props.boxSizes.small : sizes.small;
    sizes.medium = props.boxSizes.medium ? 12 / props.boxSizes.medium : sizes.medium;
    sizes.large = props.boxSizes.large ? 12 / props.boxSizes.large : sizes.large;
  }

  return (
    <Section {...props as ISectionProps} className={getClassName(FeatureIcons2.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, extraLarge: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <EqualGrid contentAlignment={Alignment.Start} shouldAddGutters={true} childSizeResponsive={sizes}>
              {props.features?.map((feature: IFeatureIcons2Feature, index: number): React.ReactElement => (
                <Stack key={index} direction={Direction.Vertical} contentAlignment={Alignment.Start} childAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} paddingBottom={PaddingSize.Wide}>
                  <Box variant='iconHolder' isFullWidth={false}>
                    <KibaIcon iconId={feature.iconId || 'ion-list'} _color={theme.colors.textOnBrand} />
                  </Box>
                  {feature.title && <MarkdownText textAlignment={TextAlignment.Left} textVariant='subtitle' source={feature.title} />}
                  {feature.description && <MarkdownText textAlignment={TextAlignment.Left} source={feature.description} />}
                </Stack>
              ))}
            </EqualGrid>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};

FeatureIcons2.displayName = 'feature-icons-2';
FeatureIcons2.defaultProps = {
  paddingTop: EverypagePaddingSize.SectionTop,
  paddingBottom: EverypagePaddingSize.SectionBottom,
};
