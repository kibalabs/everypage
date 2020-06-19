import React from 'react';

import { Section, ISectionProps } from '.';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, Grid, Box, BulletText, BulletList } from '@kibalabs/ui-react';

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
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item sizeMedium={2} size={1}><div /></Grid.Item>
        <Grid.Item sizeMedium={8} size={10}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              {props.titleText && <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>}
              {props.subtitleText && <Markdown rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            </Stack>
            <Box mode='bordered' isFullHeight={true}>
              <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
                {props.features.map((feature: IPricingFeatures1Feature, index: number): React.ReactElement => (
                  <Grid.Item key={index} alignment={Alignment.Start} sizeMedium={6} size={12}>
                    <BulletList>
                      <BulletText text={feature.text} />
                    </BulletList>
                  </Grid.Item>
                ))}
              </Grid>
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
