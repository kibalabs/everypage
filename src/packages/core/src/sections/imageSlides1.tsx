import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Stack, ResponsiveContainingView, TextAlignment, LinePager, Box, Direction, Image, PaddingSize, ResponsiveTextAlignmentView, Carousel } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IImages1Slide {
  mediaUrl: string;
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
      <ResponsiveContainingView size={10} sizeMedium={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionTop}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Carousel onIndexChanged={onSlideIndexChanged} initialIndex={slideIndex} slidesPerPage={1} slidesPerPageSmall={2} slidesPerPageLarge={3}>
              {props.slides.map((slide: IImages1Slide, index: number): React.ReactElement => (
                <Box key={index} mode='padded-transparent' isFullWidth={false}>
                  <Image source={slide.mediaUrl} isFullHeight={true} isFullWidth={true}/>
                </Box>
              ))}
            </Carousel>
            <Stack.Item gutterSizeBefore={PaddingSize.Wide}><LinePager mode='small' pageCount={Math.ceil(props.slides.length)} pageCountSmall={Math.ceil(props.slides.length / 2)} pageCountLarge={Math.ceil(props.slides.length / 3)} activePageIndex={slideIndex} onPageClicked={onPageClicked}/></Stack.Item>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
ImageSlides1.displayName = 'image-slides-1';
ImageSlides1.defaultProps = {
};
