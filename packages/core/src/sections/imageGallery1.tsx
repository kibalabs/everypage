import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, EqualGrid, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveField, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyMedia, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IImageGallery1Image {
  mediaUrl: string;
  title?: string;
}

interface IImageGallery1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  imageSizes?: ResponsiveField<number>;
  shouldShowImageCaptions?: boolean;
  images?: IImageGallery1Image[];
}

export const ImageGallery1 = (props: IImageGallery1Props): React.ReactElement => {
  const sizes = { base: 12, small: 6, medium: 6, large: 4 };
  if (props.imageSizes) {
    sizes.base = props.imageSizes.base ? 12 / props.imageSizes.base : sizes.base;
    sizes.small = props.imageSizes.small ? 12 / props.imageSizes.small : sizes.small;
    sizes.medium = props.imageSizes.medium ? 12 / props.imageSizes.medium : sizes.medium;
    sizes.large = props.imageSizes.large ? 12 / props.imageSizes.large : sizes.large;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(ImageGallery1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, extraLarge: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={sizes}>
              {props.images?.map((image: IImageGallery1Image, index: number): React.ReactElement => (
                <Stack key={index} direction={Direction.Vertical} shouldAddGutters={true}>
                  <LazyMedia source={image.mediaUrl} alternativeText={image.title || `image ${index}`} />
                  {props.shouldShowImageCaptions && image.title && <MarkdownText source={image.title} />}
                </Stack>
              ))}
            </EqualGrid>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
ImageGallery1.displayName = 'image-gallery-1';
ImageGallery1.defaultProps = {
  paddingTop: EverypagePaddingSize.SectionTop,
  paddingBottom: EverypagePaddingSize.SectionBottom,
};
