import React from 'react';

import { Section, ISectionProps } from '.';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, Grid, EqualGrid, Box, BulletText, BulletList, PaddingSize } from '@kibalabs/ui-react';

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
        <Grid.Item sizeMedium={8} size={10}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true} gutterSizeStart={PaddingSize.Wide} gutterSizeEnd={PaddingSize.Wide}>
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              {props.titleText && <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>}
              {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            </Stack>
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
        </Grid.Item>
      </Grid>
    </Section>
  );
};
PricingFeatures1.displayName = 'pricing-features-1';
PricingFeatures1.defaultProps = {
  boxMode: 'default',
};
