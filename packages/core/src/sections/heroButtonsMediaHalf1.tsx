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
  shouldRemoveCenterPadding?: boolean;
}

export const HeroButtonsMediaHalf1 = (props: IHeroButtonsMediaHalf1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroButtonsMediaHalf1.displayName, props.className)}>
      <Grid childAlignment={Alignment.Center}>
        <Grid.Item sizeResponsive={{ base: 0, medium: 1 }} />
        { props.leftMediaUrl && (
          <Grid.Item sizeResponsive={{ base: 0, medium: props.shouldRemoveCenterPadding ? 5 : 4 }}>
            <Media maxWidth='100%' isCenteredHorizontally={true} source={props.leftMediaUrl} alternativeText={'hero-media'} isFullHeight={true} isFullWidth={true} />
          </Grid.Item>
        )}
        <Grid.Item sizeResponsive={{ base: props.shouldRemoveCenterPadding ? 0 : 2, medium: props.shouldRemoveCenterPadding ? 0 : 1 }} />
        <Grid.Item sizeResponsive={{ base: props.shouldRemoveCenterPadding ? 10 : 8, medium: 5 }}>
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
        <Grid.Item sizeResponsive={{ base: props.shouldRemoveCenterPadding ? 0 : 2, medium: props.shouldRemoveCenterPadding ? 0 : 1 }} />
        { props.rightMediaUrl && (
          <Grid.Item sizeResponsive={{ base: 0, medium: props.shouldRemoveCenterPadding ? 5 : 4 }}>
            <Media maxWidth='100%' isCenteredHorizontally={true} source={props.rightMediaUrl} alternativeText={'hero-media'} isFullHeight={true} isFullWidth={true} />
          </Grid.Item>
        )}
        <Grid.Item sizeResponsive={{ base: 0, medium: 1 }} />
        <Grid.Item sizeResponsive={{ base: props.shouldRemoveCenterPadding ? 10 : 8, medium: 0 }}>
          { props.leftMediaUrl ? (
            <Media maxWidth='100%' isCenteredHorizontally={true} source={props.leftMediaUrl} alternativeText={'hero-media'} isFullHeight={true} isFullWidth={true} />
          ) : props.rightMediaUrl && (
            <Media maxWidth='100%' isCenteredHorizontally={true} source={props.rightMediaUrl} alternativeText={'hero-media'} isFullHeight={true} isFullWidth={true} />
          )}
        </Grid.Item>
      </Grid>
    </Section>
  );
};
HeroButtonsMediaHalf1.displayName = 'hero-buttons-media-half-1';
HeroButtonsMediaHalf1.defaultProps = {
  paddingTop: EverypagePaddingSize.HeroTop,
  paddingBottom: EverypagePaddingSize.HeroBottom,
};
