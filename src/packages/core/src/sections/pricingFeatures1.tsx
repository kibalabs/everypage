import React from 'react';
import styled from 'styled-components';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid, Box, Text, Direction, Button } from '../components';

interface IPricingFeatures1Feature {
  text: string;
}

interface IPricingFeatures1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  features: IPricingFeatures1Feature[];
}

const FeatureList = styled.ul`
  list-style: none;
  height: 100%;
  width: 100%;
`;

const FeatureListItem = styled.li`
  &:before {
    content: "• ";
    display: inline-block;
    width: 1em;
  }
`;

export const PricingFeatures1 = (props: IPricingFeatures1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item sizeMedium={2} size={1}><div /></Grid.Item>
        <Grid.Item sizeMedium={8} size={10}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              {props.titleText && <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>}
              {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            </Stack>
            <Box mode='bordered' isFullHeight={true}>
              <FeatureList>
                <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
                  {props.features.map((feature: IPricingFeatures1Feature, index: number): React.ReactElement => (
                    <Grid.Item key={index} alignment={Alignment.Start} sizeMedium={6} size={12}>
                      <FeatureListItem><Text alignment={TextAlignment.Left}>{feature.text}</Text></FeatureListItem>
                    </Grid.Item>
                  ))}
                </Grid>
              </FeatureList>
            </Box>
            <Spacing mode='wide' />
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
PricingFeatures1.displayName = 'pricing-features-1';
PricingFeatures1.defaultProps = {
  boxMode: 'default',
};
