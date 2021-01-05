import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Box, BulletList, BulletText, Direction, EqualGrid, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

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
      <ResponsiveContainingView sizeResponsive={{ base: 10, medium: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Box variant='bordered' isFullHeight={true}>
              <EqualGrid childAlignment={Alignment.Fill} contentAlignment={Alignment.Start} shouldAddGutters={true} childSizeResponsive={{ base: 12, small: 6 }}>
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
};
