import React from 'react';
import styled from 'styled-components';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid, Box, Text, Direction, Button } from '../components';

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

const FeatureList = styled.ul`
  list-style: none;
`;

const FeatureListItem = styled.li`
  &:before {
    content: "• ";
    display: inline-block;
    width: 1em;
  }
`;

export const PricingTiers1 = (props: IPricingTiers1Props): React.ReactElement => {
  if (props.categories.length > 4) {
    throw new Error('You can only add up to 4 pricing categories');
  }
  if (props.categories.length == 0) {
    throw new Error('You need at least 1 pricing category');
  }
  const categorySizeLarge = Math.max(3, Math.min(12, Math.floor(12 / props.categories.length)));
  const categorySizeMedium = Math.max(6, Math.min(12, Math.floor(12 / props.categories.length)));
  const categorySizeSmall = Math.max(6, Math.min(6, Math.floor(12 / props.categories.length)));

  const onCategoryStartButtonClicked = (categoryIndex: number): void => {
    window.open(props.categories[categoryIndex].buttonTarget, '_blank')
  }

  return (
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={1} sizeLarge={0}><div /></Grid.Item>
        <Grid.Item size={10} sizeLarge={12}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>
              <Spacing mode='narrow' />
              {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            </Stack>
            <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
              {props.categories.map((category: IPricingTiers1Category, index: number): React.ReactElement => (
                <Grid.Item key={index} sizeLarge={categorySizeLarge} sizeMedium={categorySizeMedium} sizeSmall={categorySizeSmall} size={12}>
                  <Box mode='bordered' isFullHeight={true}>
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
                        <FeatureList>
                          {category.features.map((feature: IPricingTiers1Feature, index: number): React.ReactElement => (
                            <FeatureListItem key={index}><Text alignment={TextAlignment.Left}>{feature.text}</Text></FeatureListItem>
                          ))}
                        </FeatureList>
                      </Stack.Item>
                      <Spacing mode='wide'/>
                      <Button mode={category.isPrimary ? 'primary' : 'secondary'} text={category.buttonText ? category.buttonText : 'Get Started'} onClicked={() => onCategoryStartButtonClicked(index)}/>
                    </Stack>
                  </Box>
                </Grid.Item>
              ))}
            </Grid>
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
