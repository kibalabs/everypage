import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Image, PaddingSize, Stack, Direction, TextAlignment, ResponsiveTextAlignmentView, Button, Alignment } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { HeroSectionTitleText, SectionSubtitleText } from '../components';

interface IHeroButtons1Button {
  text: string;
  target: string;
  mode?: string;
}

interface IHeroButtons1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  buttons?: IHeroButtons1Button[];
}

export const HeroButtons1 = (props: IHeroButtons1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroButtons1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
            {props.logoImageUrl && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><ResponsiveContainingView size={12} sizeMedium={10}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' /></ResponsiveContainingView></Stack.Item>}
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
              {props.buttons.map((button: IHeroButtons1Button, index: number): React.ReactElement => {
                return <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />;
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
};
