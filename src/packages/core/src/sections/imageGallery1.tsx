import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, ContainingView, Direction, EqualGrid, ITheme, KibaIcon, PaddingSize, ResponsiveContainingView, ResponsiveField, Spacing, Stack, useTheme } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyMedia, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IImageGallery1Image {
  title?: string;
  mediaUrl?: string;
  iconId?: string;
}

interface IImageGallery1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  // boxMode?: string;
  // boxVariant?: string;
  boxSizes?: ResponsiveField<number>;
  images?: IImageGallery1Image[];
}

export const ImageGallery1 = (props: IImageGallery1Props): React.ReactElement => {
  const theme: ITheme = useTheme();
  // let boxVariant = props.boxVariant;
  // if (props.boxMode) {
  //   console.warn('boxMode is deprecated. Please use boxVariant instead');
  //   boxVariant = props.boxMode;
  // }
  const sizes = { base: 12, small: 6, medium: 6, large: 4 };
  if (props.boxSizes) {
    sizes.base = props.boxSizes.base ? 12 / props.boxSizes.base : sizes.base;
    sizes.small = props.boxSizes.small ? 12 / props.boxSizes.small : sizes.small;
    sizes.medium = props.boxSizes.medium ? 12 / props.boxSizes.medium : sizes.medium;
    sizes.large = props.boxSizes.large ? 12 / props.boxSizes.large : sizes.large;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(ImageGallery1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, extraLarge: 8 }}>
        <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
          {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
          {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
          <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={sizes}>
            {props.images?.map((imgObj: IImageGallery1Image, index: number): React.ReactElement => (
              <ContainingView key={index}>
                {/* <Box key={index} variant={boxVariant} isFullHeight={boxVariant !== 'card'}> */}
                <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide} shouldAddGutters={true}>
                  {imgObj.mediaUrl && <LazyMedia source={imgObj.mediaUrl} alternativeText={imgObj.title || `imgObj ${index} image`} />}
                  {!imgObj.mediaUrl && imgObj.iconId && <KibaIcon variant='extraLarge' iconId={imgObj.iconId} _color={theme.colors.brandPrimary} />}
                  <Spacing variant={PaddingSize.Wide} />
                </Stack>
                {/* </Box> */}
              </ContainingView>
            ))}
          </EqualGrid>
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
ImageGallery1.displayName = 'image-gallery-1';
ImageGallery1.defaultProps = {
  boxVariant: 'bordered-unpadded',
};
