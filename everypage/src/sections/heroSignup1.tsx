import React from 'react';
import styled from 'styled-components';

import { Section, ISectionProps } from '.';
import { Grid, Image, Button, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, SingleLineInput } from '../components';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSignup1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  emailPlaceholderText?: string;
  emailButtonText?: string;
  emailSubtitleText?: string;
}

const EmailForm = styled.div`
`;

export const HeroSignup1 = (props: IHeroSignup1Props): React.ReactElement => {
  const [email, setEmail] = React.useState<string>(null);

  const onEmailSubmitClicked = (): void => {
    console.log('onEmailSubmitClicked');
  }

  return (
    <Section
      id={props.id}
      className={props.className}
      background={props.background}
    >
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
                <Spacing mode={SpacingSize.ExtraWide} />
              </React.Fragment>
            )}
            <MarkdownText mode='header' alignment={TextAlignment.Center} text={props.titleText}/>
            <Spacing mode={SpacingSize.Wide} />
            <MarkdownText alignment={TextAlignment.Justify} text={props.subtitleText}/>
            <Spacing mode={SpacingSize.Wide} />
            <EmailForm>
              <SingleLineInput
                inputType='email'
                placeholderText={props.emailPlaceholderText}
                value={email}
                onValueChanged={setEmail}
              />
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
