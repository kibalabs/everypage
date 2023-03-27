import React from 'react';

import { getClassName } from '@kibalabs/core';
import { useLocation, useNavigator } from '@kibalabs/core-react';
import { Alignment, BackgroundView, Box, Button, Dialog, Direction, EqualGrid, IBackgroundConfig, IMediaProps, LinkBase, Markdown, MarkdownText, Media, PaddingSize, ResponsiveContainingView, ResponsiveField, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyMedia, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IPortfolioGrid1ItemGalleryItem {
  media: IMediaProps;
}

interface IPortfolioGrid1Item {
  id?: string;
  background?: IBackgroundConfig;
  media: IMediaProps;
  content: string;
  galleryItems?: IPortfolioGrid1ItemGalleryItem[];
}

interface IPortfolioGrid1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  bodyText?: string;
  boxVariant?: string;
  boxSizes?: ResponsiveField<number>;
  boxHeight?: string;
  boxMinHeight?: string;
  boxMaxHeight?: string;
  items?: IPortfolioGrid1Item[];
}

export const PortfolioGrid1 = (props: IPortfolioGrid1Props): React.ReactElement => {
  const navigator = useNavigator();
  const location = useLocation();
  const sizes = { base: 12, small: 6, medium: 6, large: 4 };
  if (props.boxSizes) {
    sizes.base = props.boxSizes.base ? 12 / props.boxSizes.base : sizes.base;
    sizes.small = props.boxSizes.small ? 12 / props.boxSizes.small : sizes.small;
    sizes.medium = props.boxSizes.medium ? 12 / props.boxSizes.medium : sizes.medium;
    sizes.large = props.boxSizes.large ? 12 / props.boxSizes.large : sizes.large;
  }

  const onDialogCloseClicked = (): void => {
    navigator.navigateTo(location.pathname);
  };

  return (
    <React.Fragment>
      <Section {...props as ISectionProps} className={getClassName(PortfolioGrid1.displayName, props.className)}>
        <ResponsiveContainingView sizeResponsive={{ base: 11, extraLarge: 12 }}>
          <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
            <Stack direction={Direction.Vertical} childAlignment={Alignment.Center}>
              <Box maxWidthResponsive={{ base: '100%', medium: '75%', extraLarge: '50%' }}>
                <Stack direction={Direction.Vertical}>
                  {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
                  {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
                  {props.bodyText && <Stack.Item gutterAfter={PaddingSize.Wide}><MarkdownText textAlignment={TextAlignment.Left} source={props.bodyText} /></Stack.Item>}
                </Stack>
              </Box>
              <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={sizes}>
                {props.items?.map((item: IPortfolioGrid1Item, index: number): React.ReactElement => (
                  <LinkBase key={item.id || index} target={`#${props.id}-${item.id || index}`} isFullWidth={true}>
                    <BackgroundView {...(item.background || {})}>
                      <Box variant={props.boxVariant} height={props.boxHeight} minHeight={props.boxMinHeight} maxHeight={props.boxMaxHeight} isFullWidth={true}>
                        <Stack direction={Direction.Vertical} isFullHeight={true} contentAlignment={Alignment.Center}>
                          <LazyMedia {...item.media} />
                        </Stack>
                      </Box>
                    </BackgroundView>
                  </LinkBase>
                ))}
              </EqualGrid>
            </Stack>
          </ResponsiveTextAlignmentView>
        </ResponsiveContainingView>
      </Section>
      {props.items?.map((item: IPortfolioGrid1Item, index: number): React.ReactElement => (
        <Dialog key={item.id || index} id={String(index)} isOpen={location.hash === `#${props.id}-${item.id || index}`} isClosableByEscape={true} isClosableByBackdrop={true} isScrollableVertically={true} onCloseClicked={onDialogCloseClicked} maxWidth='calc(min(90vw, 650px))' maxHeight='calc(min(80vh, 1000px))'>
          <Stack direction={Direction.Vertical} shouldAddGutters={true}>
            <BackgroundView {...(item.background || {})}>
              <Box theme={{ margin: '-2em -2em 0 -2em' }} height='250px' isFullWidth={false}>
                <Stack direction={Direction.Vertical} isFullHeight={true} contentAlignment={Alignment.Center} padding={PaddingSize.Wide4}>
                  <LazyMedia {...item.media} />
                </Stack>
              </Box>
            </BackgroundView>
            <Markdown source={item.content || ''} />
            {item.galleryItems && item.galleryItems.length > 0 && (
              <EqualGrid childSizeResponsive={{ base: 6 }} shouldAddGutters={true}>
                {item.galleryItems.map((galleryItem: IPortfolioGrid1ItemGalleryItem, innerIndex: number): React.ReactElement => (
                  <LinkBase key={innerIndex} target={galleryItem.media.source}>
                    <Media fitType='contain' isFullHeight={true} isFullWidth={true} {...galleryItem.media} />
                  </LinkBase>
                ))}
              </EqualGrid>
            )}
            <Button text='close' onClicked={onDialogCloseClicked} />
          </Stack>
        </Dialog>
      ))}
    </React.Fragment>
  );
};
PortfolioGrid1.displayName = 'portfolio-grid-1';
PortfolioGrid1.defaultProps = {
  boxVariant: 'bordered',
  paddingTop: EverypagePaddingSize.SectionTop,
  paddingBottom: EverypagePaddingSize.SectionBottom,
};
