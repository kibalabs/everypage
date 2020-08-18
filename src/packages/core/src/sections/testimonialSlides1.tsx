import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Stack, Alignment, ResponsiveContainingView, TextAlignment, LinePager, Box, Direction, Image, PaddingSize, ResponsiveTextAlignmentView, Carousel } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';

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
  return (
    <Section {...props as ISectionProps} className={getClassName(TestimonialSlides1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeMedium={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraWide}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Carousel onIndexChanged={onSlideIndexChanged} initialIndex={slideIndex}>
              {props.slides.map((slide: ITestimonialSlides1Slide, index: number): React.ReactElement => (
                <Box key={index} mode='padded-transparent'>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeAfter={PaddingSize.Wide}>
                      <MarkdownText textAlignment={TextAlignment.Center} source={slide.text} />
                    </Stack.Item>
                    <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
                      {slide.authorImageUrl && <Box width='50px'><Image mode={'profile'} source={slide.authorImageUrl} /></Box>}
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center}>
                          {slide.authorName && <MarkdownText textMode={'bold'} textAlignment={TextAlignment.Left} source={slide.authorName} />}
                          {slide.authorTitle && <MarkdownText textMode={'small'} textAlignment={TextAlignment.Left} source={slide.authorTitle} />}
                        </Stack>
                      </Stack.Item>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Carousel>
            <Stack.Item gutterSizeBefore={PaddingSize.Wide}><LinePager mode='small' pageCount={props.slides.length} activePageIndex={slideIndex} onPageClicked={onPageClicked}/></Stack.Item>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
TestimonialSlides1.displayName = 'testimonial-slides-1';
TestimonialSlides1.defaultProps = {
};
