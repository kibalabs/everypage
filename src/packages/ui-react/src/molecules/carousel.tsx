import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps, flattenChildren, useScrollListener, useInterval, useRenderedRef } from '@kibalabs/core-react';

import { IMoleculeProps, defaultMoleculeProps } from './moleculeProps';
import { Stack } from '../layouts';
import { Direction, Alignment } from '../model';
import { IconButton, IIconButtonTheme } from '../atoms';
import { KibaIcon, IDimensionGuide, getScreenSize, ScreenSize } from '../subatoms';
import { useDimensions } from '../theming';

const getResponsiveCss = (screenWidth: string, css: string): string => {
  return `@media (min-width: ${screenWidth}) { ${css} }`;
}

const getSlidesPerPageCss = (slidesPerPage: number): string => {
  return `width: calc(100% / ${slidesPerPage});`;
}

const getResponsiveSlidesPerPageCss = (screenWidth: string, slidesPerPage?: number): string => {
  return slidesPerPage ? getResponsiveCss(screenWidth, getSlidesPerPageCss(slidesPerPage)) : '';
}

export interface ICarouselTheme {
  indexButtonTheme: IIconButtonTheme;
}

const StyledSlider = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;


  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Hide scrollbar on ie 11 */
  -ms-overflow-style: none;
  overflow: auto;
`;
StyledSlider.displayName = 'carousel-slider';

interface IStyledSlideProps {
  dimensions: IDimensionGuide;
  slidesPerPage: number;
  slidesPerPageSmall?: number;
  slidesPerPageMedium?: number;
  slidesPerPageLarge?: number;
  slidesPerPageExtraLarge?: number;
}

const StyledSlide = styled.div<IStyledSlideProps>`
  scroll-snap-align: start;
  flex-shrink: 0;
  height: 100%;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props: IStyledSlideProps): string => getSlidesPerPageCss(props.slidesPerPage)};
  ${(props: IStyledSlideProps): string => getResponsiveSlidesPerPageCss(props.dimensions.screenWidthSmall, props.slidesPerPageSmall)};
  ${(props: IStyledSlideProps): string => getResponsiveSlidesPerPageCss(props.dimensions.screenWidthMedium, props.slidesPerPageMedium)};
  ${(props: IStyledSlideProps): string => getResponsiveSlidesPerPageCss(props.dimensions.screenWidthLarge, props.slidesPerPageLarge)};
  ${(props: IStyledSlideProps): string => getResponsiveSlidesPerPageCss(props.dimensions.screenWidthExtraLarge, props.slidesPerPageExtraLarge)};
`;
StyledSlide.displayName = 'carousel-slide';

export interface ICarouselProps extends IMoleculeProps<ICarouselTheme>, ISingleAnyChildProps {
  shouldShowButtons?: boolean;
  autoplaySeconds?: number;
  initialIndex?: number;
  indexButtonVariant?: string;
  slidesPerPage: number;
  slidesPerPageSmall?: number;
  slidesPerPageMedium?: number;
  slidesPerPageLarge?: number;
  slidesPerPageExtraLarge?: number;
  onIndexProgressed?: (slideIndexProgress: number) => void;
  onIndexChanged?: (slideIndex: number) => void;
}

// NOTE(krish): the slider could potentially be its own component here!
export const Carousel = (props: ICarouselProps): React.ReactElement => {
  const dimensions = useDimensions();
  const [sliderRef] = useRenderedRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = React.useRef<number | null>(null);
  const children = flattenChildren(props.children);
  const [slideIndex, setSlideIndex] = React.useState<number>(props.initialIndex);

  const onPreviousClicked = (): void => {
    if (sliderRef.current && !sliderRef.current.scrollTo) {
      // ie 11 doesn't support scrollTo (this doesn't animate nicely)
      sliderRef.current.scrollLeft = (slideIndex - 1) * sliderRef.current?.clientWidth;
    } else {
      sliderRef.current?.scrollTo((slideIndex - 1) * sliderRef.current?.clientWidth, 0);
    }
  }

  const onNextClicked = (): void => {
    goToNext();
  }

  const goToNext = (): void => {
    if (sliderRef.current && !sliderRef.current.scrollTo) {
      // ie 11 doesn't support scrollTo (this doesn't animate nicely)
      sliderRef.current.scrollLeft = (slideIndex + 1) * sliderRef.current?.clientWidth;
    } else {
      sliderRef.current?.scrollTo((slideIndex + 1) * sliderRef.current?.clientWidth, 0);
    }
  }

  useInterval(props.autoplaySeconds || 10000000, (): void => {
    if (props.autoplaySeconds) {
      goToNext();
    }
  }, false, [slideIndex]);

  React.useEffect((): void => {
    setTimeout((): void => {
      if (sliderRef.current && !sliderRef.current.scrollTo) {
        // ie 11 doesn't support scrollTo (this doesn't animate nicely)
        sliderRef.current.scrollLeft = sliderRef.current?.clientWidth * props.initialIndex;
      } else {
        sliderRef.current?.scrollTo(sliderRef.current?.clientWidth * props.initialIndex, 0);
      }
    }, 50);
  }, [props.initialIndex, sliderRef.current]);

  const slidesPerPage = props.slidesPerPage;
  const slidesPerPageSmall = props.slidesPerPageSmall || slidesPerPage;
  const slidesPerPageMedium = props.slidesPerPageMedium || slidesPerPageSmall;
  const slidesPerPageLarge = props.slidesPerPageLarge || slidesPerPageMedium;
  const slidesPerPageExtraLarge = props.slidesPerPageExtraLarge || slidesPerPageLarge;

  const getScreenSizeValue = (size: ScreenSize, theme: IDimensionGuide): number => {
    return Number(getScreenSize(size, theme).replace('px', ''));
  }

  useScrollListener(sliderRef.current, (): void => {
    const position = Math.ceil(sliderRef.current?.scrollLeft);
    // TODO(krish): this doesnt work in console because it refers to the global document, not the local (inside iframe) one
    const screenWidth = Math.ceil(document.body.clientWidth);
    let slidesPerPage = props.slidesPerPage;
    if (screenWidth > getScreenSizeValue(ScreenSize.Small, dimensions)) {
      slidesPerPage = slidesPerPageSmall;
    }
    if (screenWidth > getScreenSizeValue(ScreenSize.Medium, dimensions)) {
      slidesPerPage = slidesPerPageMedium;
    }
    if (screenWidth > getScreenSizeValue(ScreenSize.Large, dimensions)) {
      slidesPerPage = slidesPerPageLarge;
    }
    if (screenWidth > getScreenSizeValue(ScreenSize.ExtraLarge, dimensions)) {
      slidesPerPage = slidesPerPageExtraLarge;
    }
    const width = Math.ceil(sliderRef.current?.scrollWidth);
    const progress = (children.length / slidesPerPage) * (position / width);
    const progressRounded = Math.round(progress * 100.0) / 100;
    const slideIndex = Math.round(progress);
    props.onIndexProgressed && props.onIndexProgressed(progressRounded);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout((): void => {
      setSlideIndex(slideIndex);
      scrollTimeoutRef.current = null;
    }, 50);
  });

  React.useEffect((): void => {
    props.onIndexChanged && props.onIndexChanged(slideIndex);
  }, [slideIndex]);

  return (
    <Stack
      id={props.id}
      className={getClassName(Carousel.displayName, props.className)}
      direction={Direction.Horizontal}
      childAlignment={Alignment.Center}
    >
      {props.shouldShowButtons && <IconButton theme={props.theme?.indexButtonTheme} variant={props.indexButtonVariant} icon={<KibaIcon iconId='mui-chevron-left'/>} onClicked={onPreviousClicked} />}
      <Stack.Item growthFactor={1} shrinkFactor={1}>
        <StyledSlider
          ref={sliderRef}
          className={getClassName(StyledSlider.displayName)}
        >
          {children.map((child: React.ReactElement, index: number): React.ReactElement => {
            return (
              <StyledSlide
                key={index}
                className={getClassName(StyledSlide.displayName)}
                dimensions={dimensions}
                slidesPerPage={props.slidesPerPage}
                slidesPerPageSmall={props.slidesPerPageSmall}
                slidesPerPageMedium={props.slidesPerPageMedium}
                slidesPerPageLarge={props.slidesPerPageLarge}
                slidesPerPageExtraLarge={props.slidesPerPageExtraLarge}
              >
                {child}
              </StyledSlide>
            );
          })}
        </StyledSlider>
      </Stack.Item>
      {props.shouldShowButtons && <IconButton theme={props.theme?.indexButtonTheme} variant={props.indexButtonVariant} icon={<KibaIcon iconId='mui-chevron-right'/>} onClicked={onNextClicked}/>}
    </Stack>
  );
};

Carousel.defaultProps = {
  ...defaultMoleculeProps,
  shouldShowButtons: true,
  autoplaySeconds: 7,
  initialIndex: 0,
  slidesPerPage: 1,
};
Carousel.displayName = 'carousel';
