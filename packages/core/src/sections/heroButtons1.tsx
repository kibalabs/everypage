import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Button, Direction, IImageProps, KibaIcon, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { HeroLogo, HeroSectionSubtitleText, HeroSectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IHeroButtons1Button {
  text: string;
  target: string;
  mode?: string;
  variant?: string;
  iconIdRight?: string;
  iconIdLeft?: string;
}

interface IHeroButtons1Props extends ISectionProps {
  logoImageUrl?: string;
  logoImage?: IImageProps;
  titleText?: string;
  subtitleText?: string;
  bodyText?: string;
  bodyTextVariant?: string;
  buttons?: IHeroButtons1Button[];
}

export const HeroButtons1 = (props: IHeroButtons1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroButtons1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, small: 8, large: 6 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center}>
            {props.logoImage && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroLogo {...props.logoImage} /></Stack.Item>}
            {!props.logoImage && props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroLogo source={props.logoImageUrl} /></Stack.Item>}
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText || props.bodyText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={props.bodyText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            {props.bodyText && <Stack.Item gutterAfter={PaddingSize.Wide2}><MarkdownText textVariant={props.bodyTextVariant} source={props.bodyText} /></Stack.Item>}
            {props.buttons && props.buttons.length > 0 && (
              <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                {props.buttons.map((button: IHeroButtons1Button, index: number): React.ReactElement => (
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
      </ResponsiveContainingView>
    </Section>
  );
};
HeroButtons1.displayName = 'hero-buttons-1';
HeroButtons1.defaultProps = {
  shouldLogoGrow: true,
  paddingTop: EverypagePaddingSize.HeroTop,
  paddingBottom: EverypagePaddingSize.HeroBottom,
};
