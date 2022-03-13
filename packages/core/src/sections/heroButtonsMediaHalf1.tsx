import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Button, Direction, Grid, KibaIcon, Media, PaddingSize, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { HeroLogo, HeroSectionSubtitleText, HeroSectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IHeroButtonsMediaHalf1Button {
  text: string;
  target: string;
  mode?: string;
  variant?: string;
  iconIdRight?: string;
  iconIdLeft?: string;
}
// TODO(krishan711): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroButtonsMediaHalf1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
  buttons?: IHeroButtonsMediaHalf1Button[];
}

export const HeroButtonsMediaHalf1 = (props: IHeroButtonsMediaHalf1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroButtonsMediaHalf1.displayName, props.className)}>
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
                {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroLogo source={props.logoImageUrl} /></Stack.Item>}
                {props.titleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText} /></Stack.Item>}
                {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroSectionSubtitleText text={props.subtitleText} /></Stack.Item>}
                {props.buttons && props.buttons.length > 0 && (
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} shouldAddGutters={true}>
                    {props.buttons.map((button: IHeroButtonsMediaHalf1Button, index: number): React.ReactElement => (
                      <Button
                        key={index}
                        text={button.text}
                        variant={button.variant || button.mode}
                        target={button.target}
                        iconLeft={button.iconIdLeft ? <KibaIcon iconId={button.iconIdLeft} /> : undefined}
                        iconRight={button.iconIdRight ? <KibaIcon iconId={button.iconIdRight} /> : undefined}
                      />
                    ))}
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
HeroButtonsMediaHalf1.displayName = 'hero-buttons-media-half-1';
HeroButtonsMediaHalf1.defaultProps = {
};
