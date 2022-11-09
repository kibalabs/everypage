import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Box, Carousel, Direction, LinePager, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyImage, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface ITestimonialSlides1Slide {
  text: string;
  authorName: string;
  authorImageUrl?: string;
  authorTitle?: string;
  url?: string;
}

interface ITestimonialSlides1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  autoplaySeconds?: number;
  slides?: ITestimonialSlides1Slide[];
}

export const TestimonialSlides1 = (props: ITestimonialSlides1Props): React.ReactElement => {
  const [slideIndex, setSlideIndex] = React.useState<number>(0);
  const onSlideIndexChanged = (index: number): void => {
    setSlideIndex(index);
  };
  const onPageClicked = (index: number): void => {
    setSlideIndex(index);
  };
  if (!props.slides) {
    throw Error(`slides must be passed to ${TestimonialSlides1.displayName}`);
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(TestimonialSlides1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, medium: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <Carousel onIndexChanged={onSlideIndexChanged} initialIndex={slideIndex} autoplaySeconds={props.autoplaySeconds}>
              {props.slides.map((slide: ITestimonialSlides1Slide, index: number): React.ReactElement => (
                <Box key={index} variant='padded'>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Stack.Item growthFactor={1} shrinkFactor={1} gutterAfter={PaddingSize.Wide}>
                      <MarkdownText textAlignment={TextAlignment.Center} source={slide.text} />
                    </Stack.Item>
                    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
                      {slide.authorImageUrl && <Box width='50px' height='50px'><LazyImage isFullHeight={true} isFullWidth={true} variant={'profile'} source={slide.authorImageUrl} alternativeText={slide.authorName ? `${slide.authorName} image` : 'Testimonial author image'} fitType='crop' /></Box>}
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center}>
                          {slide.authorName && <MarkdownText textVariant={'bold'} textAlignment={TextAlignment.Left} source={slide.authorName} />}
                          {slide.authorTitle && <MarkdownText textVariant={'small'} textAlignment={TextAlignment.Left} source={slide.authorTitle} />}
                        </Stack>
                      </Stack.Item>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Carousel>
            <Stack.Item gutterBefore={PaddingSize.Wide}><LinePager variant='small' pageCount={props.slides.length} activePageIndex={slideIndex} onPageClicked={onPageClicked} /></Stack.Item>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
TestimonialSlides1.displayName = 'testimonial-slides-1';
TestimonialSlides1.defaultProps = {
};
