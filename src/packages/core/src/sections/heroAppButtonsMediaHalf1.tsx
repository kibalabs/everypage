import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Grid, Image, Media, ResponsiveContainingView, PaddingSize, TextAlignment, Stack, Direction, Alignment, Button, KibaIcon, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { useWebsite } from '../util';
import { HeroSectionTitleText, SectionSubtitleText } from '../components';

// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroAppButtonsMediaHalf1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
  iosAppId?: string;
  androidAppId?: string;
}

export const HeroAppButtonsMediaHalf1 = (props: IHeroAppButtonsMediaHalf1Props): React.ReactElement => {
  const website = useWebsite();
  if (props.leftMediaUrl && props.rightMediaUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to hero-signup-media-half-1')
  }

  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;

  return (
    <Section {...props as ISectionProps} className={getClassName(HeroAppButtonsMediaHalf1.displayName, props.className)}>
      <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
        <Grid childAlignment={Alignment.Center}>
          { props.leftMediaUrl && (<Grid.Item size={0} sizeMedium={1} />) }
          { props.leftMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media isCenteredHorizontally={true} source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item size={2} sizeMedium={1} />
          <Grid.Item size={8} sizeMedium={5}>
            <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentMedium={TextAlignment.Left}>
              <Stack direction={Direction.Vertical} paddingEnd={PaddingSize.ExtraExtraWide} contentAlignment={Alignment.Center} contentAlignmentMedium={Alignment.Start}>
                {props.logoImageUrl && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><ResponsiveContainingView size={12} sizeMedium={12}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' /></ResponsiveContainingView></Stack.Item>}
                {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
                {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
                <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Center} contentAlignmentMedium={Alignment.Start} shouldAddGutters={true}>
                  {iosAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button mode='primary' iconLeft={<KibaIcon size='large' iconId='ion-logo-apple'/>} iconGutterSize={PaddingSize.Wide} target={`https://apps.apple.com/app/id${iosAppId}`} text='Download for iOS' /></Stack.Item>}
                  {androidAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button mode='primary' iconLeft={<KibaIcon size='large' iconId='ion-logo-android'/>} iconGutterSize={PaddingSize.Wide} target={`https://play.google.com/store/apps/details?id=${androidAppId}`} text='Download for Android' /></Stack.Item>}
                </Stack>
              </Stack>
            </ResponsiveTextAlignmentView>
          </Grid.Item>
          <Grid.Item size={2} sizeMedium={1} />
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
HeroAppButtonsMediaHalf1.displayName = 'hero-app-buttons-media-half-1';
HeroAppButtonsMediaHalf1.defaultProps = {
};
