import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Image, Markdown, Spacing, SpacingSize, TextAlignment, Stack, Direction } from '@kibalabs/ui-react';


interface IHeroSimple1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
}

export const HeroSimple1 = (props: IHeroSimple1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps}>
      <Grid isFullHeight={true}>
        <Grid.Item size={10} sizeSmall={8} sizeLarge={6} isFullHeight={true}>
          <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
          <Stack direction={Direction.Vertical}>
            { props.logoImageUrl && (
              <React.Fragment>
                <Grid>
                  <Grid.Item size={10}>
                    <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
                  </Grid.Item>
                </Grid>
                <Spacing mode={SpacingSize.ExtraWide} />
              </React.Fragment>
            )}
            <Markdown rootTextMode='header' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
            {props.subtitleText && <Markdown rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
HeroSimple1.displayName = 'hero-simple-1';
HeroSimple1.defaultProps = {
};
