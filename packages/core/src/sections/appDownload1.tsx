import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, AppDownloadButton, Button, Direction, KibaIcon, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';
import { useWebsite } from '../util';

// TODO(krishan711): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IAppDownload1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  iosAppId?: string;
  androidAppId?: string;
  macAppId?: string;
  appButtonMode?: string;
  appButtonVariant?: string;
}

export const AppDownload1 = (props: IAppDownload1Props): React.ReactElement => {
  const website = useWebsite();
  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;
  const macAppId = props.macAppId || website.macAppId;
  let appButtonVariant = props.appButtonVariant;
  if (props.appButtonMode) {
    console.warn('appButtonMode is deprecated. Please use appButtonVariant instead');
    appButtonVariant = props.appButtonMode;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(AppDownload1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, small: 8, large: 6 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            {appButtonVariant === 'custom' ? (
              <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} shouldAddGutters={true}>
                {iosAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button variant='primary' iconLeft={<KibaIcon variant='large' iconId='ion-logo-apple' />} iconGutter={PaddingSize.Wide} target={`https://apps.apple.com/app/id${iosAppId}`} text='Download for iOS' /></Stack.Item>}
                {androidAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button variant='primary' iconLeft={<KibaIcon variant='large' iconId='ion-logo-android' />} iconGutter={PaddingSize.Wide} target={`https://play.google.com/store/apps/details?id=${androidAppId}`} text='Download for Android' /></Stack.Item>}
                {macAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button variant='primary' iconLeft={<KibaIcon variant='large' iconId='ion-logo-android' />} iconGutter={PaddingSize.Wide} target={`https://apps.apple.com/app/id${macAppId}`} text='Download for Mac' /></Stack.Item>}
              </Stack>
            ) : (
              <Stack directionResponsive={{ base: Direction.Vertical, small: Direction.Horizontal }} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                {iosAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='ios' buttonVariant={appButtonVariant} appId={iosAppId} /></Stack.Item>}
                {androidAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='android' buttonVariant={appButtonVariant} appId={androidAppId} /></Stack.Item>}
                {macAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='mac' buttonVariant={appButtonVariant} appId={macAppId} /></Stack.Item>}
              </Stack>
            )}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
AppDownload1.displayName = 'app-download-1';
AppDownload1.defaultProps = {
  paddingTop: EverypagePaddingSize.SectionTop,
  paddingBottom: EverypagePaddingSize.SectionBottom,
};
