import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Image, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, Direction } from '../components';
import { IFormProps, defaultFormProps } from '../model';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSimple1Props extends ISectionProps, IFormProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
}

export const HeroSimple1 = (props: IHeroSimple1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps}>
      <Grid isFullHeight={true}>
        <Grid.Item size={1} sizeSmall={2} sizeLarge={3}><div /></Grid.Item>
        <Grid.Item size={10} sizeSmall={8} sizeLarge={6} isFullHeight={true}>
          <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
          <Stack direction={Direction.Vertical}>
            { props.logoImageUrl && (
              <React.Fragment>
                <Grid>
                  <Grid.Item size={1}><div /></Grid.Item>
                  <Grid.Item size={10}>
                    <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
                  </Grid.Item>
                </Grid>
                <Spacing mode={SpacingSize.ExtraWide} />
              </React.Fragment>
            )}
            <MarkdownText mode='header' alignment={TextAlignment.Center} text={props.titleText}/>
            <Spacing mode={SpacingSize.ExtraWide} />
            {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
HeroSimple1.displayName = 'hero-simple-1';
HeroSimple1.defaultProps = {
  ...defaultFormProps,
};
