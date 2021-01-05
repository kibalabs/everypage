import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, AppDownloadButton, Button, Direction, Grid, KibaIcon, Media, PaddingSize, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { HeroLogo, HeroSectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';
import { useWebsite } from '../util';

// TODO(krishan711): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroAppDownloadMediaHalf1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
  iosAppId?: string;
  androidAppId?: string;
  macAppId?: string;
  appButtonMode?: string;
  appButtonVariant?: string;
}

export const HeroAppDownloadMediaHalf1 = (props: IHeroAppDownloadMediaHalf1Props): React.ReactElement => {
  const website = useWebsite();
  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;
  const macAppId = props.macAppId || website.macAppId;
  if (props.leftMediaUrl && props.rightMediaUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to hero-signup-media-half-1');
  }
  let appButtonVariant = props.appButtonVariant;
  if (props.appButtonMode) {
    console.warn('appButtonMode is deprecated. Please use appButtonVariant instead');
    appButtonVariant = props.appButtonMode;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroAppDownloadMediaHalf1.displayName, props.className)}>
      <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.HeroTop} paddingEnd={EverypagePaddingSize.HeroBottom}>
        <Grid childAlignment={Alignment.Center}>
          { props.leftMediaUrl && (<Grid.Item sizeResponsive={{ base: 0, medium: 1 }} />) }
          { props.leftMediaUrl && (
            <Grid.Item sizeResponsive={{ base: 0, medium: 4 }}>
              <Media isCenteredHorizontally={true} source={props.leftMediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item sizeResponsive={{ base: 2, medium: 1 }} />
          <Grid.Item sizeResponsive={{ base: 8, medium: 5 }}>
            <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentResponsive={{ medium: TextAlignment.Left }}>
              <Stack direction={Direction.Vertical} paddingEnd={PaddingSize.Wide3} contentAlignmentResponsive={{ base: Alignment.Center, medium: Alignment.Start }}>
                {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide3}><HeroLogo source={props.logoImageUrl} /></Stack.Item>}
                {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
                {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
                {appButtonVariant === 'custom' ? (
                  <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} contentAlignmentResponsive={{ base: Alignment.Center, medium: Alignment.Start }} shouldAddGutters={true}>
                    {iosAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button variant='primary' iconLeft={<KibaIcon variant='large' iconId='ion-logo-apple'/>} iconGutter={PaddingSize.Wide} target={`https://apps.apple.com/app/id${iosAppId}`} text='Download for iOS' /></Stack.Item>}
                    {androidAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button variant='primary' iconLeft={<KibaIcon variant='large' iconId='ion-logo-android'/>} iconGutter={PaddingSize.Wide} target={`https://play.google.com/store/apps/details?id=${androidAppId}`} text='Download for Android' /></Stack.Item>}
                    {macAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button variant='primary' iconLeft={<KibaIcon variant='large' iconId='ion-logo-android'/>} iconGutter={PaddingSize.Wide} target={`https://apps.apple.com/app/id${macAppId}`} text='Download for Mac' /></Stack.Item>}
                  </Stack>
                ) : (
                  <Stack directionResponsive={{ base: Direction.Vertical, small: Direction.Horizontal }} contentAlignmentResponsive={{ base: Alignment.Center, medium: Alignment.Start }} shouldAddGutters={true}>
                    {iosAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='ios' buttonVariant={appButtonVariant} appId={iosAppId} /></Stack.Item>}
                    {androidAppId && <Stack.Item shrinkFactor={1} ><AppDownloadButton appType='android' buttonVariant={appButtonVariant} appId={androidAppId} /></Stack.Item>}
                    {macAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='mac' buttonVariant={appButtonVariant} appId={macAppId} /></Stack.Item>}
                  </Stack>
                )}
              </Stack>
            </ResponsiveTextAlignmentView>
          </Grid.Item>
          <Grid.Item sizeResponsive={{ base: 2, medium: 1 }} />
          { props.rightMediaUrl && (
            <Grid.Item sizeResponsive={{ base: 0, medium: 4 }}>
              <Media isCenteredHorizontally={true} source={props.rightMediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (<Grid.Item sizeResponsive={{ base: 0, medium: 1 }} />) }
          { props.leftMediaUrl && (
            <Grid.Item sizeResponsive={{ base: 8, medium: 0 }}>
              <Media isCenteredHorizontally={true} source={props.leftMediaUrl} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (
            <Grid.Item sizeResponsive={{ base: 8, medium: 0 }}>
              <Media isCenteredHorizontally={true} source={props.rightMediaUrl} alternativeText={'hero-media'} />
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
