import React from 'react';

import { Section, ISectionProps } from '.';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, Grid, EqualGrid, Box, KibaIcon, Direction, useTheme, ITheme, Link } from '@kibalabs/ui-react';

interface ITestimonialBoxes1Box {
  text: string;
  author: string;
  url?: string;
  type?: string;
}

interface ITestimonialBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxes?: ITestimonialBoxes1Box[];
}

const getIcon = (boxType: string, brandColor: string): React.ReactElement => {
  if (boxType === 'producthunt') {
    return <KibaIcon _color='#DA552F' iconId={'remix-product-hunt-fill'} />;
  }
  if (boxType === 'twitter') {
    return <KibaIcon _color='#1DA1F2' iconId='ion-logo-twitter' />;
  }
  return <KibaIcon _color={brandColor} iconId={'ion-chatbox'} />;
}

export const TestimonialBoxes1 = (props: ITestimonialBoxes1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
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
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={12}>
              {props.boxes.map((box: ITestimonialBoxes1Box, index: number): React.ReactElement => (
                <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true}>
                      { getIcon(box.type, theme.colors.brandPrimary) }
                      <Spacing direction={Direction.Horizontal} mode='default' />
                      <Link destination={box.url} text={box.author} isEnabled={!!box.url} />
                    </Stack>
                    <Spacing direction={Direction.Vertical} mode='narrow' />
                    <Stack.Item growthFactor={1} shrinkFactor={1}>
                      <Markdown rootTextAlignment={TextAlignment.Left} source={box.text} />
                    </Stack.Item>
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
TestimonialBoxes1.displayName = 'testimonial-boxes-1';
TestimonialBoxes1.defaultProps = {
  boxMode: 'bordered',
};
