import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Image, PaddingSize, Stack, Direction, TextAlignment, ResponsiveTextAlignmentView, Button, Alignment, KibaIcon } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { HeroSectionTitleText, SectionSubtitleText } from '../components';
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
  shouldLogoGrow?: boolean;
  titleText?: string;
  subtitleText?: string;
  buttons?: IHeroButtons1Button[];
}

export const HeroButtons1 = (props: IHeroButtons1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroButtons1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} paddingStart={EverypagePaddingSize.HeroTop} paddingEnd={EverypagePaddingSize.HeroBottom}>
            {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide2}><ResponsiveContainingView size={12} sizeMedium={10} isFullWidth={props.shouldLogoGrow}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' fitType={'contain'}/></ResponsiveContainingView></Stack.Item>}
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
              {props.buttons.map((button: IHeroButtons1Button, index: number): React.ReactElement => {
                return (
                  <Button
                    key={index}
                    text={button.text}
                    variant={button.variant || button.mode}
                    target={button.target}
                    iconLeft={button.iconIdLeft ? <KibaIcon iconId={button.iconIdLeft} /> : undefined}
                    iconRight={button.iconIdRight ? <KibaIcon iconId={button.iconIdRight} /> : undefined}
                  />
                );
              })}
            </Stack>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
HeroButtons1.displayName = 'hero-buttons-1';
HeroButtons1.defaultProps = {
  shouldLogoGrow: true,
};
