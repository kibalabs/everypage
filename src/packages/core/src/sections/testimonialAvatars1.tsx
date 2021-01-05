import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Box, Direction, EqualGrid, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyImage, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface ITestimonialAvatarsBox {
  text: string;
  authorName: string;
  authorImageUrl?: string;
  authorTitle?: string;
  url?: string;
}

interface ITestimonialAvatarProps extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxVariant?: string;
  boxes?: ITestimonialAvatarsBox[];
}

export const TestimonialAvatars1 = (props: ITestimonialAvatarProps): React.ReactElement => {
  let boxVariant = props.boxVariant;
  if (props.boxMode) {
    console.warn('boxMode is deprecated. Please use boxVariant instead');
    boxVariant = props.boxMode;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(TestimonialAvatars1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, medium: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={{ base: 12, small: 12, medium: 6, large: 4 }}>
              {props.boxes.map((box: ITestimonialAvatarsBox, index: number): React.ReactElement => (
                <Box key={index} variant={boxVariant} isFullHeight={boxVariant !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                    <Stack.Item growthFactor={1} shrinkFactor={1} gutterAfter={PaddingSize.Wide}>
                      <MarkdownText textAlignment={TextAlignment.Left} source={box.text} />
                    </Stack.Item>
                    <Stack direction={Direction.Horizontal} shouldAddGutters={true} childAlignment={Alignment.Center}>
                      {box.authorImageUrl && <Box width='50px' height='50px'><LazyImage isFullHeight={true} isFullWidth={true} variant={'profile'} source={box.authorImageUrl} alternativeText={box.authorName ? `${box.authorName} image` : 'Testimonial author image'} fitType='crop' /></Box>}
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center}>
                          {box.authorName && <MarkdownText textVariant={'bold'} textAlignment={TextAlignment.Left} source={box.authorName} />}
                          {box.authorTitle && <MarkdownText textVariant={'small'} textAlignment={TextAlignment.Left} source={box.authorTitle} />}
                        </Stack>
                      </Stack.Item>
                    </Stack>
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
TestimonialAvatars1.displayName = 'testimonial-avatars-1';
TestimonialAvatars1.defaultProps = {
  boxVariant: 'bordered',
};
