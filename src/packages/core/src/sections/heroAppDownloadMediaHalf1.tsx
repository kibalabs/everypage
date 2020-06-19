import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Image, Media, Button, Markdown, Spacing, SpacingSize, TextAlignment, Stack, Direction, Alignment, LinkBase } from '@kibalabs/ui-react';


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
  if (props.leftMediaUrl && props.rightMediaUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to hero-signup-media-half-1')
  }

  return (
    <Section {...props as ISectionProps}>
      <Stack direction={Direction.Vertical}>
        <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
        <Grid childAlignment={Alignment.Center}>
          { props.leftMediaUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          { props.leftMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item size={1}><div /></Grid.Item>
          <Grid.Item size={10} sizeMedium={5}>
            <Stack direction={Direction.Vertical}>
              { props.logoImageUrl && (
                <React.Fragment>
                  <Grid>
                    <Grid.Item size={1}><div /></Grid.Item>
                    <Grid.Item size={10}>
                      <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
                    </Grid.Item>
                  </Grid>
                  <Spacing mode={SpacingSize.ExtraExtraWide} />
                </React.Fragment>
              )}
              <Markdown rootTextMode='header' rootTextAlignment={TextAlignment.Left} source={props.titleText}/>
              {props.subtitleText && <Markdown rootTextAlignment={TextAlignment.Left} source={props.subtitleText}/>}
              <Spacing mode={SpacingSize.ExtraWide} />
              <Stack direction={Direction.Horizontal} childAlignment={Alignment.Start} contentAlignment={Alignment.Fill}>
                {props.iosAppId && (
                  <LinkBase mode='transparent' target={`https://apps.apple.com/app/id${props.iosAppId}`}>
                    <Image source='https://assets.evrpg.com/ios/download-button/v2/dark.svg' alternativeText='Download from the App Store' />
                  </LinkBase>
                )}
                {props.androidAppId && (
                  <LinkBase mode='transparent' target={`https://play.google.com/store/apps/details?id=${props.androidAppId}`}>
                    <Image source='https://assets.evrpg.com/android/download-button/v2/dark.svg' alternativeText='Download from the Play Store' />
                  </LinkBase>
                )}
              </Stack>
              <Spacing mode={SpacingSize.ExtraExtraWide}/>
            </Stack>
          </Grid.Item>
          <Grid.Item size={1}><div /></Grid.Item>
          { props.rightMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          <Grid.Item size={2} sizeMedium={0}><div /></Grid.Item>
          { props.leftMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
        </Grid>
        <Spacing mode={SpacingSize.ExtraExtraWide}/>
      </Stack>
    </Section>
  );
};
HeroAppDownloadMediaHalf1.displayName = 'hero-app-download-media-half-1';
HeroAppDownloadMediaHalf1.defaultProps = {
};
