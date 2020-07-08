import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Grid, Image, Markdown, Spacing, PaddingSize, TextAlignment, Stack, Direction } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';


interface IHeroSimple1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
}

export const HeroSimple1 = (props: IHeroSimple1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(HeroSimple1.displayName, props.className)}>
      <Grid isFullHeight={true}>
        <Grid.Item size={10} sizeSmall={8} sizeLarge={6} isFullHeight={true}>
          <Spacing mode={PaddingSize.ExtraExtraExtraWide}/>
          <Stack direction={Direction.Vertical}>
            { props.logoImageUrl && (
              <React.Fragment>
                <Grid>
                  <Grid.Item size={10}>
                    <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
                  </Grid.Item>
                </Grid>
                <Spacing mode={PaddingSize.ExtraWide} />
              </React.Fragment>
            )}
            <Markdown rootTextMode='header' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
            {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            <Spacing mode={PaddingSize.ExtraExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
HeroSimple1.displayName = 'hero-simple-1';
HeroSimple1.defaultProps = {
};
