import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps, flattenChildren, useScrollListener, useInterval, useRerenderRef } from '@kibalabs/core-react';

import { IMoleculeProps, defaultMoleculeProps } from './moleculeProps';
import { Stack } from '../layouts';
import { Direction, Alignment } from '../model';
import { Button, IButtonTheme } from '../atoms';

export interface ICarouselTheme {
  indexButtonTheme: IButtonTheme;
}

const StyledSlider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  align-items: center;

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
`;

const StyledSlide = styled.div`
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
`;

export interface ICarouselProps extends IMoleculeProps<ICarouselTheme>, ISingleAnyChildProps {
  shouldShowButtons?: boolean;
  autoplaySeconds?: number;
  initialIndex?: number;
  indexButtonMode?: string;
  onIndexProgressed?: (slideIndexProgress: number) => void;
  onIndexChanged?: (slideIndex: number) => void;
}

// NOTE(krish): the slider could potentially be its own component here!
export const Carousel = (props: ICarouselProps): React.ReactElement => {
  const [sliderRef] = useRerenderRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = React.useRef<number | null>(null);
  const children = flattenChildren(props.children);
  const [slideIndex, setSlideIndex] = React.useState<number>(props.initialIndex);

  const onPreviousClicked = (): void => {
    sliderRef.current?.scrollBy(-sliderRef.current?.clientWidth, 0);
  }

  const onNextClicked = (): void => {
    goToNext();
  }

  const goToNext = (): void => {
    sliderRef.current?.scrollBy(sliderRef.current?.clientWidth, 0);
  }

  useInterval(props.autoplaySeconds || 10000000, (): void => {
    if (props.autoplaySeconds) {
      goToNext();
    }
  }, false, [slideIndex]);

  React.useEffect((): void => {
    setTimeout((): void => {
      sliderRef.current?.scrollTo(sliderRef.current?.clientWidth * props.initialIndex, 0);
    }, 50);
  }, [props.initialIndex, sliderRef.current]);

  useScrollListener(sliderRef.current, (): void => {
    const position = Math.ceil(sliderRef.current?.scrollLeft);
    const width = Math.ceil(sliderRef.current?.scrollWidth);
    const progress = children.length * (position / width);
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
      {props.shouldShowButtons && <Button theme={props.theme?.indexButtonTheme} mode={props.indexButtonMode} text='<' onClicked={onPreviousClicked} />}
      <Stack.Item growthFactor={1} shrinkFactor={1}>
        <StyledSlider ref={sliderRef}>
          {children.map((child: React.ReactElement, index: number): React.ReactElement => {
            return (
              <StyledSlide key={index}>{child}</StyledSlide>
            );
          })}
        </StyledSlider>
      </Stack.Item>
      {props.shouldShowButtons && <Button theme={props.theme?.indexButtonTheme} mode={props.indexButtonMode} text='>' onClicked={onNextClicked}/>}
    </Stack>
  );
};

Carousel.defaultProps = {
  ...defaultMoleculeProps,
  shouldShowButtons: true,
  autoplaySeconds: 7,
  initialIndex: 0,
};
Carousel.displayName = 'carousel';
