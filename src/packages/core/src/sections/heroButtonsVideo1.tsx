import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Image, PaddingSize, Stack, Direction, TextAlignment, ResponsiveTextAlignmentView, Button, Alignment, Video, WebView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { HeroSectionTitleText, SectionSubtitleText } from '../components';

interface IHeroButtonsVideo1Button {
  text: string;
  target: string;
  mode?: string;
}

interface IHeroButtonsVideo1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  buttons?: IHeroButtonsVideo1Button[];
  videoUrl?: string;
  embeddedVideoUrl?: string;
}

export const HeroButtonsVideo1 = (props: IHeroButtonsVideo1Props): React.ReactElement => {
  if (props.videoUrl && props.embeddedVideoUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to hero-buttons-video-1')
  }

  return (
    <Section {...props as ISectionProps} className={getClassName(HeroButtonsVideo1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
            {props.logoImageUrl && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><ResponsiveContainingView size={12} sizeMedium={10}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' isCenteredHorizontally={true} /></ResponsiveContainingView></Stack.Item>}
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            {props.buttons && (
              <Stack.Item gutterSizeAfter={(props.videoUrl || props.embeddedVideoUrl) ? PaddingSize.ExtraExtraWide : PaddingSize.None}>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                  {props.buttons.map((button: IHeroButtonsVideo1Button, index: number): React.ReactElement => {
                    return <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />;
                  })}
                </Stack>
              </Stack.Item>
            )}
            {props.videoUrl && <Video source={props.videoUrl} />}
            {props.embeddedVideoUrl && <WebView url={props.embeddedVideoUrl} permissions={['fullscreen', 'autoplay', 'encrypted-media']}/>}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
HeroButtonsVideo1.displayName = 'hero-buttons-video-1';
HeroButtonsVideo1.defaultProps = {
};
