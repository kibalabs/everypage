import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Stack, Alignment, ResponsiveContainingView, Text, TextAlignment, EqualGrid, Box, KibaIcon, Direction, useTheme, ITheme, Link, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface ITestimonialBoxes1Box {
  text: string;
  author: string;
  url?: string;
  type?: string;
  iconId?: string;
  iconColor?: string;
}

interface ITestimonialBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxVariant?: string;
  boxes?: ITestimonialBoxes1Box[];
}

export const TestimonialBoxes1 = (props: ITestimonialBoxes1Props): React.ReactElement => {
  const theme: ITheme = useTheme();

  const getIcon = (boxType: string, iconId?: string, iconColor?: string): React.ReactElement => {
    if (boxType === 'producthunt') {
      return <KibaIcon _color='#DA552F' iconId={'remix-product-hunt'} />;
    }
    if (boxType === 'twitter') {
      return <KibaIcon _color='#1DA1F2' iconId='ion-logo-twitter' />;
    }
    if (boxType === 'linkedin') {
      return <KibaIcon _color='#2867B2' iconId='ion-logo-linkedin' />;
    }
    return <KibaIcon _color={iconColor || theme.colors.brandPrimary} iconId={iconId || 'ion-chatbox'} />;
  }

  var boxVariant = props.boxVariant;
  if (props.boxMode) {
    console.warn('boxMode is deprecated. Please use boxVariant instead');
    boxVariant = props.boxMode;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(TestimonialBoxes1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={12}>
              {props.boxes.map((box: ITestimonialBoxes1Box, index: number): React.ReactElement => (
                <Box key={index} variant={boxVariant} isFullHeight={boxVariant !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} shouldAddGutters={true}>
                      { getIcon(box.type, box.iconId, box.iconColor) }
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        {box.url && <Link target={box.url} text={box.author} />}
                        {!box.url && <Text variant='bold'>{box.author}</Text>}
                      </Stack.Item>
                    </Stack>
                    <Stack.Item growthFactor={1} shrinkFactor={1} gutterBefore={PaddingSize.Default}>
                      <MarkdownText textAlignment={TextAlignment.Left} source={box.text} />
                    </Stack.Item>
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
TestimonialBoxes1.displayName = 'testimonial-boxes-1';
TestimonialBoxes1.defaultProps = {
  boxVariant: 'bordered',
};
