import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ensureSingleDefined } from '@kibalabs/core-react';
import { Direction, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment, Video, WebView } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IVideo1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  videoUrl?: string;
  embeddedVideoUrl?: string;
}

export const Video1 = (props: IVideo1Props): React.ReactElement => {
  ensureSingleDefined(Video1.displayName, props, ['videoUrl', 'embeddedVideoUrl']);
  return (
    <Section {...props as ISectionProps} className={getClassName(Video1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            {props.videoUrl && <Video isLazyLoadable={true} source={props.videoUrl} alternativeText={`${props.titleText || ''} video`} />}
            {props.embeddedVideoUrl && <WebView isLazyLoadable={true} url={props.embeddedVideoUrl} title={'Embedded Video'} permissions={['fullscreen', 'autoplay', 'encrypted-media']} aspectRatio={0.5625} />}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
Video1.displayName = 'video-1';
Video1.defaultProps = {
  paddingTop: EverypagePaddingSize.SectionTop,
  paddingBottom: EverypagePaddingSize.SectionBottom,
};
