import React from 'react';

import { Section, ISectionProps } from '.';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, Grid, EqualGrid, Box, Text, Direction, Button, BulletText, BulletList } from '@kibalabs/ui-react';

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

  const onCategoryStartButtonClicked = (categoryIndex: number): void => {
    window.open(props.categories[categoryIndex].buttonTarget, '_blank')
  }

  return (
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={10} sizeLarge={12}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
              {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            </Stack>
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={3} childSizeMedium={6} childSizeSmall={6} childSize={12}>
              {props.categories.map((category: IPricingTiers1Category, index: number): React.ReactElement => (
                <Box mode='bordered' isFullHeight={true} key={index}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true}>
                    <Text alignment={TextAlignment.Center} mode='strong'>{category.name}</Text>
                    <Text alignment={TextAlignment.Center} mode='supersize'>{category.cost}</Text>
                    <Text alignment={TextAlignment.Center} mode='note'>{category.costFrequency}</Text>
                    <Spacing mode='wide'/>
                    <Stack.Item alignment={Alignment.Start}>
                      <Text alignment={TextAlignment.Left}>{category.explanationText}</Text>
                    </Stack.Item>
                    <Spacing mode='narrow'/>
                    <Stack.Item alignment={Alignment.Start} growthFactor={1}>
                      <BulletList>
                        {category.features.map((feature: IPricingTiers1Feature, index: number): React.ReactElement => (
                          <BulletText key={index} text={feature.text} />
                        ))}
                      </BulletList>
                    </Stack.Item>
                    <Spacing mode='wide'/>
                    <Button mode={category.isPrimary ? 'primary' : 'secondary'} text={category.buttonText ? category.buttonText : 'Get Started'} onClicked={() => onCategoryStartButtonClicked(index)}/>
                  </Stack>
                </Box>
              ))}
            </EqualGrid>
            <Spacing mode='wide' />
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
PricingTiers1.displayName = 'pricing-tiers-1';
PricingTiers1.defaultProps = {
  boxMode: 'default',
};
