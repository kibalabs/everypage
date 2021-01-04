import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Box, Carousel, Direction, LinePager, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyImage, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IImages1Slide {
  mediaUrl: string;
  label?: string;
}

interface IImages1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  slides: IImages1Slide[];
}

export const ImageSlides1 = (props: IImages1Props): React.ReactElement => {
  const [slideIndex, setSlideIndex] = React.useState<number>(0);
  const onSlideIndexChanged = (index: number): void => {
    setSlideIndex(index);
  };
  const onPageClicked = (index: number): void => {
    setSlideIndex(index);
  };
  return (
    <Section {...props as ISectionProps} className={getClassName(ImageSlides1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, medium: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Carousel
              onIndexChanged={onSlideIndexChanged}
              initialIndex={slideIndex}
              slidesPerPageResponsive={{ base: 1, small: 2, large: 3 }}
            >
              {props.slides.map((slide: IImages1Slide, index: number): React.ReactElement => (
                <Box key={index} variant='padded' isFullWidth={false}>
                  <LazyImage source={slide.mediaUrl} isFullHeight={true} isFullWidth={true} alternativeText={slide.label || `Image ${index + 1}`} />
                </Box>
              ))}
            </Carousel>
            <Stack.Item gutterBefore={PaddingSize.Wide}>
              <LinePager
                variant='small'
                pageCountResponsive={{ base: Math.ceil(props.slides.length), small: Math.ceil(props.slides.length / 2), large: Math.ceil(props.slides.length / 3) }}
                activePageIndex={slideIndex}
                onPageClicked={onPageClicked}
              />
            </Stack.Item>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
ImageSlides1.displayName = 'image-slides-1';
ImageSlides1.defaultProps = {
};
