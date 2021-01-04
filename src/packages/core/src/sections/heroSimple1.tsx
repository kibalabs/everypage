import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, Image, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { HeroLogo, HeroSectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IHeroSimple1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
}

export const HeroSimple1 = (props: IHeroSimple1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroSimple1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, medium: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} paddingStart={EverypagePaddingSize.HeroTop} paddingEnd={EverypagePaddingSize.HeroBottom}>
            {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide3}><HeroLogo source={props.logoImageUrl} /></Stack.Item>}
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
HeroSimple1.displayName = 'hero-simple-1';
HeroSimple1.defaultProps = {
};
