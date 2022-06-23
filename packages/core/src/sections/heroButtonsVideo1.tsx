import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Button, Direction, KibaIcon, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment, Video, WebView } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { HeroLogo, HeroSectionSubtitleText, HeroSectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IHeroButtonsVideo1Button {
  text: string;
  target: string;
  mode?: string;
  variant?: string;
  iconIdRight?: string;
  iconIdLeft?: string;
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
    throw new Error('Only one of {videoUrl, embeddedVideoUrl} should be provided to hero-buttons-video-1');
  }

  return (
    <Section {...props as ISectionProps} className={getClassName(HeroButtonsVideo1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, small: 8, large: 6 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.HeroTop} paddingEnd={EverypagePaddingSize.HeroBottom}>
            {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide3}><HeroLogo source={props.logoImageUrl} /></Stack.Item>}
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroSectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            {props.buttons && (
              <Stack.Item gutterAfter={(props.videoUrl || props.embeddedVideoUrl) ? PaddingSize.Wide3 : PaddingSize.None}>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                  {props.buttons.map((button: IHeroButtonsVideo1Button, index: number): React.ReactElement => {
                    return (
                      <Button
                        key={index}
                        text={button.text}
                        variant={button.variant || button.mode}
                        target={button.target}
                        iconLeft={button.iconIdLeft && <KibaIcon iconId={button.iconIdLeft} />}
                        iconRight={button.iconIdRight && <KibaIcon iconId={button.iconIdRight} />}
                      />
                    );
                  })}
                </Stack>
              </Stack.Item>
            )}
            {props.videoUrl && <Video source={props.videoUrl} alternativeText={`${props.titleText || ''} video`} />}
            {props.embeddedVideoUrl && <WebView url={props.embeddedVideoUrl} title={'Embedded Hero Video'} permissions={['fullscreen', 'autoplay', 'encrypted-media']} aspectRatio={0.5625} />}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
HeroButtonsVideo1.displayName = 'hero-buttons-video-1';
HeroButtonsVideo1.defaultProps = {
};
