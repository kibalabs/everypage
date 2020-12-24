import React from 'react';
import { getClassName } from '@kibalabs/core';
import {  Stack, TextAlignment, ResponsiveContainingView, Video, WebView, Direction, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IVideo1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  videoUrl?: string;
  embeddedVideoUrl?: string;
}

export const Video1 = (props: IVideo1Props): React.ReactElement => {
  if (props.videoUrl && props.embeddedVideoUrl) {
    throw new Error('video-1')
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(Video1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            {props.videoUrl && <Video  isLazyLoadable={true} source={props.videoUrl} />}
            {props.embeddedVideoUrl && <WebView isLazyLoadable={true} url={props.embeddedVideoUrl} title={'Embedded Video'} permissions={['fullscreen', 'autoplay', 'encrypted-media']}/>}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
Video1.displayName = 'video-1';
Video1.defaultProps = {
};
