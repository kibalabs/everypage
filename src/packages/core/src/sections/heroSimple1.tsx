import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Image, PaddingSize, Stack, Direction, TextAlignment, Alignment, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { HeroSectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IHeroSimple1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
}

export const HeroSimple1 = (props: IHeroSimple1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroSimple1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} paddingStart={EverypagePaddingSize.HeroTop} paddingEnd={EverypagePaddingSize.HeroBottom}>
            {props.logoImageUrl && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><ResponsiveContainingView size={12} sizeMedium={10}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' /></ResponsiveContainingView></Stack.Item>}
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
HeroSimple1.displayName = 'hero-simple-1';
HeroSimple1.defaultProps = {
};
