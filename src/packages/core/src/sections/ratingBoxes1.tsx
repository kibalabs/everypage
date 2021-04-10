import React from 'react';

import { SectionSubtitleText, SectionTitleText } from '../components';
import { ISectionProps, Section } from '.';
import { EverypagePaddingSize } from '../internal';

import { getClassName } from '@kibalabs/core';
import { MissingPropError, warnDeprecated } from '@kibalabs/core-react';
import { Alignment, Box, Direction, EqualGrid, Icon, KibaIcon, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

interface IRatingBoxes1Box {
  value: number;
  fillColor?: string;
  totalStars: number;
  name: string;
};

interface IRatingBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxVariant?: string;
  boxes: IRatingBoxes1Box[];
};

const starSvgContent = `<svg viewBox="0 0 200 100" style={{ fill: 'gold' , stroke: 'gold'}}>
<defs>
<polygon id="star" points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "/>
  <clipPath id="stars">
    <use xlinkHref="#star"/>
    <use xlinkHref="#star" x="20%"/>
    <use xlinkHref="#star" x="40%"/>
    <use xlinkHref="#star" x="60%"/>
    <use xlinkHref="#star" x="80%"/>
  </clipPath>
</defs>
<rect style={{ fill: 'gold' , stroke: 'gold'}} clip-path="url(#stars)"></rect>
<rect width="72%" height='100%' style={{ fill: 'gold' , stroke: 'gold'}} clip-path="url(#stars)"></rect>
</svg>`;

export const RatingBoxes1 = (props: IRatingBoxes1Props): React.ReactElement => {

  warnDeprecated(RatingBoxes1.displayName, props, 'boxMode', 'boxVariant');
  const boxVariant = props.boxVariant || props.boxMode;
  if (props.boxes == null) {
    throw new MissingPropError(RatingBoxes1.displayName, 'boxes');
  }

  return (
    <Section {...props as ISectionProps} className={getClassName(RatingBoxes1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <Spacing variant={PaddingSize.Wide}/>
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={{ base: 12, small: 6, medium: 4, large: 3 }}>
              {props.boxes.map((box: IRatingBoxes1Box, index: number): React.ReactElement => (
                <Box key={index} variant={boxVariant} isFullHeight={true}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true}>
                    <Stack direction={Direction.Horizontal} >
                    {/* {[...Array(box.totalStars)].map((e , i) => {
                      if(i <= Math.floor(box.value) - 1){
                        return <KibaIcon variant='large' _color={box.fillColor || 'gold'} iconId='ion-star'/>
                      }else if(i == Math.floor(box.value) && box.value != Math.floor(box.value)){
                        return <KibaIcon variant='large' _color={box.fillColor || 'gold'} iconId='ion-star-half-outline'/>
                      }
                      return <KibaIcon variant='large' _color={box.fillColor || 'gold'} iconId='ion-star-outline'/>
                    })} */}
                    <Icon svgContent={starSvgContent} _color={box.fillColor || 'gold'}  />
                    {/* {starSvgContent} */}
                    </Stack>
                    <Spacing direction={Direction.Vertical} variant={PaddingSize.Wide} />
                    <MarkdownText textVariant='bold' textAlignment={TextAlignment.Center} source={box.name} />
                  </Stack>
                </Box>
              ))}
            </EqualGrid>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
}

RatingBoxes1.displayName = 'rating-boxes-1';
RatingBoxes1.defaultProps = {
  boxVariant: 'default',
};