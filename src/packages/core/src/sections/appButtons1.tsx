import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, PaddingSize, Stack, Direction, Alignment, Button, KibaIcon, TextAlignment, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { useWebsite } from '../util';
import { SectionTitleText, SectionSubtitleText } from '../components';

// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IAppButtons1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  iosAppId?: string;
  androidAppId?: string;
}

export const AppButtons1 = (props: IAppButtons1Props): React.ReactElement => {
  const website = useWebsite();
  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;

  return (
    <Section {...props as ISectionProps} className={getClassName(AppButtons1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Center} contentAlignmentMedium={Alignment.Start} shouldAddGutters={true}>
              {iosAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button mode='primary' iconLeft={<KibaIcon size='large' iconId='ion-logo-apple'/>} iconGutterSize={PaddingSize.Wide} href={`https://apps.apple.com/app/id${iosAppId}`} text='Download for iOS' /></Stack.Item>}
              {androidAppId && <Stack.Item growthFactor={1} shrinkFactor={1}><Button mode='primary' iconLeft={<KibaIcon size='large' iconId='ion-logo-android'/>} iconGutterSize={PaddingSize.Wide} href={`https://play.google.com/store/apps/details?id=${props.androidAppId}`} text='Download for Android' /></Stack.Item>}
            </Stack>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
AppButtons1.displayName = 'app-buttons-1';
AppButtons1.defaultProps = {
};
