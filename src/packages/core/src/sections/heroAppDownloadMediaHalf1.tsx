import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Grid, Image, Media, Markdown, Spacing, PaddingSize, TextAlignment, Stack, Direction, Alignment, IosDownloadButton, AndroidDownloadButton } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { useWebsite } from '../util';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroAppDownloadMediaHalf1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
  iosAppId?: string;
  androidAppId?: string;
}

export const HeroAppDownloadMediaHalf1 = (props: IHeroAppDownloadMediaHalf1Props): React.ReactElement => {
  const website = useWebsite();
  if (props.leftMediaUrl && props.rightMediaUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to hero-signup-media-half-1')
  }

  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;

  return (
    <Section {...props as ISectionProps} className={getClassName(HeroAppDownloadMediaHalf1.displayName, props.className)}>
      <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
        <Grid childAlignment={Alignment.Center}>
          { props.leftMediaUrl && (<Grid.Item size={0} sizeMedium={1} />) }
          { props.leftMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media isCenteredHorizontally={true} source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item size={1} />
          <Grid.Item size={10} sizeMedium={5}>
            <Stack direction={Direction.Vertical} paddingEnd={PaddingSize.ExtraExtraWide}>
              { props.logoImageUrl && (
                <Grid paddingBottom={PaddingSize.ExtraExtraWide}>
                  <Grid.Item size={10}>
                    <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
                  </Grid.Item>
                </Grid>
              )}
              <Markdown rootTextMode='header' rootTextAlignment={TextAlignment.Left} source={props.titleText}/>
              {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Left} source={props.subtitleText}/>}
              <Spacing mode={PaddingSize.ExtraWide} />
              <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true}>
                {iosAppId && <Stack.Item shrinkFactor={1}><IosDownloadButton appId={iosAppId} /></Stack.Item>}
                {androidAppId && <Stack.Item shrinkFactor={1}><AndroidDownloadButton appId={androidAppId} /></Stack.Item>}
                <Stack.Item growthFactor={1} shrinkFactor={1} />
              </Stack>
            </Stack>
          </Grid.Item>
          <Grid.Item size={1} />
          { props.rightMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media isCenteredHorizontally={true} source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (<Grid.Item size={0} sizeMedium={1} />) }
          { props.leftMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media isCenteredHorizontally={true} source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media isCenteredHorizontally={true} source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
        </Grid>
      </Stack>
    </Section>
  );
};
HeroAppDownloadMediaHalf1.displayName = 'hero-app-download-media-half-1';
HeroAppDownloadMediaHalf1.defaultProps = {
};
