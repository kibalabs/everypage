import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Markdown, Stack, Alignment, ResponsiveContainingView, TextAlignment, EqualGrid, Box, BulletText, BulletList, PaddingSize } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';

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
        <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
          {props.titleText && (
            <Stack.Item gutterSizeAfter={PaddingSize.None}>
              <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>}
            </Stack.Item>
          )}
          {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
          <Box mode='bordered' isFullHeight={true}>
            <EqualGrid childAlignment={Alignment.Fill} contentAlignment={Alignment.Start} shouldAddGutters={true} childSizeMedium={6} childSize={12}>
              {props.features.map((feature: IPricingFeatures1Feature, index: number): React.ReactElement => (
                <BulletList key={index}>
                  <BulletText text={feature.text} />
                </BulletList>
              ))}
            </EqualGrid>
          </Box>
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
PricingFeatures1.displayName = 'pricing-features-1';
PricingFeatures1.defaultProps = {
  boxMode: 'default',
};
