import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Stack, Alignment, ResponsiveContainingView, TextAlignment, EqualGrid, Box, Direction, Image, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
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
  boxes?: ITestimonialAvatarsBox[];
}

export const TestimonialAvatars1 = (props: ITestimonialAvatarProps): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(TestimonialAvatars1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeMedium={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={4} childSizeMedium={6} childSizeSmall={12}>
              {props.boxes.map((box: ITestimonialAvatarsBox, index: number): React.ReactElement => (
                <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                    <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeAfter={PaddingSize.Wide}>
                      <MarkdownText textAlignment={TextAlignment.Left} source={box.text} />
                    </Stack.Item>
                    <Stack direction={Direction.Horizontal} shouldAddGutters={true} childAlignment={Alignment.Center}>
                      {box.authorImageUrl && <Box width='50px'><Image mode={'profile'} source={box.authorImageUrl} alternativeText={'Testimonial author'} /></Box>}
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center}>
                          {box.authorName && <MarkdownText textMode={'bold'} textAlignment={TextAlignment.Left} source={box.authorName} />}
                          {box.authorTitle && <MarkdownText textMode={'small'} textAlignment={TextAlignment.Left} source={box.authorTitle} />}
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
  boxMode: 'bordered',
};
