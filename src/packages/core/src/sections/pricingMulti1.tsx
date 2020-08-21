import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Stack, Alignment, TextAlignment, ResponsiveContainingView, EqualGrid, Box, Text, Direction, Button, BulletText, BulletList, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IPricingTiers1Feature {
  text: string;
}

interface IPricingTiers1Category {
  name: string;
  cost: string;
  costFrequency: string;
  explanationText: string;
  isPrimary?: boolean;
  buttonText?: string;
  buttonTarget: string;
  features: IPricingTiers1Feature[];
}

interface IPricingTiers1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  categories?: IPricingTiers1Category[];
}

export const PricingTiers1 = (props: IPricingTiers1Props): React.ReactElement => {
  if (props.categories.length > 4) {
    throw new Error('You can only add up to 4 pricing categories');
  }
  if (props.categories.length == 0) {
    throw new Error('You need at least 1 pricing category');
  }

  return (
    <Section {...props as ISectionProps} className={getClassName(PricingTiers1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionTop}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={6} childSize={12}>
              {props.categories.map((category: IPricingTiers1Category, index: number): React.ReactElement => (
                <Box mode='bordered' isFullHeight={true} key={index}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true}>
                    <Text alignment={TextAlignment.Center} mode='strong'>{category.name}</Text>
                    <Text alignment={TextAlignment.Center} mode='supersize'>{category.cost}</Text>
                    <Text alignment={TextAlignment.Center} mode='note'>{category.costFrequency}</Text>
                    <Stack.Item alignment={Alignment.Start} gutterSizeBefore={PaddingSize.Wide} gutterSizeAfter={PaddingSize.Narrow}>
                      <Text alignment={TextAlignment.Left}>{category.explanationText}</Text>
                    </Stack.Item>
                    <Stack.Item alignment={Alignment.Start} growthFactor={1} gutterSizeAfter={PaddingSize.Wide}>
                      <ResponsiveTextAlignmentView alignment={TextAlignment.Left}>
                        <BulletList>
                          {category.features.map((feature: IPricingTiers1Feature, index: number): React.ReactElement => (
                            <BulletText key={index} text={feature.text} />
                          ))}
                        </BulletList>
                      </ResponsiveTextAlignmentView>
                    </Stack.Item>
                    <Button isFullWidth={true} mode={category.isPrimary ? 'primary' : 'secondary'} text={category.buttonText ? category.buttonText : 'Get Started'} target={category.buttonTarget}/>
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
PricingTiers1.displayName = 'pricing-tiers-1';
PricingTiers1.defaultProps = {
  boxMode: 'default',
};
