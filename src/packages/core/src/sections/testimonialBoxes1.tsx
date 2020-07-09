import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Markdown, Stack, Alignment, ResponsiveContainingView, TextAlignment, EqualGrid, Box, KibaIcon, Direction, useTheme, ITheme, Link, PaddingSize } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';

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
    <Section {...props as ISectionProps} className={getClassName(TestimonialBoxes1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeLarge={12}>
        <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
            <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
            {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
          </Stack>
          <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={12}>
            {props.boxes.map((box: ITestimonialBoxes1Box, index: number): React.ReactElement => (
              <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                  <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} shouldAddGutters={true}>
                    { getIcon(box.type, theme.colors.brandPrimary) }
                    <Link destination={box.url} text={box.author} isEnabled={!!box.url} />
                  </Stack>
                  <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeBefore={PaddingSize.Narrow}>
                    <Markdown rootTextAlignment={TextAlignment.Left} source={box.text} />
                  </Stack.Item>
                </Stack>
              </Box>
            ))}
          </EqualGrid>
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
TestimonialBoxes1.displayName = 'testimonial-boxes-1';
TestimonialBoxes1.defaultProps = {
  boxMode: 'bordered',
};
