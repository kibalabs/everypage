import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, PaddingSize, Stack, Direction, Alignment, IosDownloadButton, AndroidDownloadButton, TextAlignment, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { useWebsite } from '../util';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IAppDownload1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  iosAppId?: string;
  androidAppId?: string;
}

export const AppDownload1 = (props: IAppDownload1Props): React.ReactElement => {
  const website = useWebsite();
  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;

  return (
    <Section {...props as ISectionProps} className={getClassName(AppDownload1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Stack direction={Direction.Vertical} directionSmall={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
              {iosAppId && <Stack.Item shrinkFactor={1}><IosDownloadButton appId={iosAppId} /></Stack.Item>}
              {androidAppId && <Stack.Item shrinkFactor={1}><AndroidDownloadButton appId={androidAppId} /></Stack.Item>}
            </Stack>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
AppDownload1.displayName = 'app-download-1';
AppDownload1.defaultProps = {
};
