import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Image, Markdown, PaddingSize, TextAlignment, Stack, Direction } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';


interface IHeroSimple1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
}

export const HeroSimple1 = (props: IHeroSimple1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroSimple1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <Stack direction={Direction.Vertical} isFullHeight={true} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
          { props.logoImageUrl && (
            <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}>
              <ResponsiveContainingView size={10}>
                <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
              </ResponsiveContainingView>
            </Stack.Item>
          )}
          <Markdown rootTextMode='header' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
          {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
HeroSimple1.displayName = 'hero-simple-1';
HeroSimple1.defaultProps = {
};
