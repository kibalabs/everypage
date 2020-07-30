import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Stack, Alignment, ResponsiveContainingView, Direction, EqualGrid, Box, BulletText, BulletList, PaddingSize, ResponsiveTextAlignmentView, TextAlignment } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';

interface IPricingFeatures1Feature {
  text: string;
}

interface IPricingFeatures1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  features: IPricingFeatures1Feature[];
}

export const PricingFeatures1 = (props: IPricingFeatures1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(PricingFeatures1.displayName, props.className)}>
      <ResponsiveContainingView sizeMedium={8} size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Box mode='bordered' isFullHeight={true}>
              <EqualGrid childAlignment={Alignment.Fill} contentAlignment={Alignment.Start} shouldAddGutters={true} childSizeSmall={6} childSize={12}>
                {props.features.map((feature: IPricingFeatures1Feature, index: number): React.ReactElement => (
                  <ResponsiveTextAlignmentView key={index} alignment={TextAlignment.Left}>
                    <BulletList>
                      <BulletText text={feature.text} />
                    </BulletList>
                  </ResponsiveTextAlignmentView>
                ))}
              </EqualGrid>
            </Box>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
PricingFeatures1.displayName = 'pricing-features-1';
PricingFeatures1.defaultProps = {
  boxMode: 'default',
};
