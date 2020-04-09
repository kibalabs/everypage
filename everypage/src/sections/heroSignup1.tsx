import React from 'react';
import styled from 'styled-components';

import { Section } from '.';
import { Grid, Image, Button, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack } from '../components';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSignup1Props {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  emailPlaceholderText?: string;
  emailButtonText?: string;
  emailSubtitleText?: string;
}

const EmailForm = styled.div`
`;

const EmailInput = styled.input`
  width: 100%;
`;

export const HeroSignup1 = (props: IHeroSignup1Props): React.ReactElement => {
  const onEmailSubmitClicked = (): void => {
    console.log('onEmailSubmitClicked');
  }

  return (
    <Section>
      <Grid>
        <Grid.Item size={1} sizeSmall={2} sizeMedium={2} sizeLarge={3}><div /></Grid.Item>
        <Grid.Item size={10} sizeSmall={8} sizeMedium={8} sizeLarge={6}>
          <Stack>
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
            { props.logoImageUrl && (
              <React.Fragment>
                <Grid>
                  <Grid.Item size={1}><div /></Grid.Item>
                  <Grid.Item size={10}>
                    <Image source={props.logoImageUrl} alternativeText='logo' />
                  </Grid.Item>
                </Grid>
                <Spacing mode={SpacingSize.Wide} />
              </React.Fragment>
            )}
            <MarkdownText mode='header' alignment={TextAlignment.Center} text={props.titleText}/>
            <Spacing mode={SpacingSize.Wide} />
            <MarkdownText alignment={TextAlignment.Justify} text={props.subtitleText}/>
            <Spacing mode={SpacingSize.Wide} />
            <EmailForm>
              <EmailInput placeholder={props.emailPlaceholderText}></EmailInput>
              <Spacing mode={SpacingSize.Narrow}/>
              <Button
                mode='primary'
                isFullWidth={true}
                text={props.emailButtonText}
                onClicked={onEmailSubmitClicked}
              />
              {props.emailSubtitleText && (
                <React.Fragment>
                  <Spacing mode={SpacingSize.Wide} />
                  <MarkdownText text={props.emailSubtitleText} />
                </React.Fragment>
              )}
            </EmailForm>
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
