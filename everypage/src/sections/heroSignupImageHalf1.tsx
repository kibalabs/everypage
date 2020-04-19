import React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { Section, ISectionProps } from '.';
import { Form, Grid, Image, Button, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, SingleLineInput, Direction } from '../components';
import { isValidEmail } from '../util';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSignupImageHalf1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  inputPlaceholderText?: string;
  inputButtonText?: string;
  inputSuccessMessageText?: string;
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export const HeroSignupImageHalf1 = (props: IHeroSignupImageHalf1Props): React.ReactElement => {
  const [email, setEmail] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  if (props.leftImageUrl && props.rightImageUrl) {
    throw new Error('Only one of {leftImageUrl, rightImageUrl} should be provided to hero-signup-image-half-1')
  }

  const onFormSubmitted = (): void => {
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    axios.post('https://api.kiba.dev/v1/newsletter-subscriptions', {email: email, topic: 'kiwi'}).then((response: AxiosResponse) => {
      setIsLoading(false);
      // TODO(krish): show a success toast with this text
      // setSuccessMessage(props.inputSuccessMessageText)
    }).catch((error: AxiosError): void => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }

  return (
    <Section
      id={props.id}
      className={props.className}
      background={props.background}
    >
      <Grid>
        <Grid.Item size={1}><div /></Grid.Item>
        <Grid.Item size={5}>
          <Stack
            direction={Direction.Vertical}
          >
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
            <Form onFormSubmitted={onFormSubmitted}>
              <Stack
                id='form-inner'
                direction={Direction.Vertical}
                contentAlignment='fill'
              >
                <Grid>
                  <Grid.Item id='form-inner-inner-horizontal' size={0} sizeMedium={12}>
                    <Stack
                      direction={Direction.Horizontal}
                      contentAlignment='start'
                    >
                      <Stack.Item
                        growthFactor={1}
                      >
                        <SingleLineInput
                          inputType='email'
                          placeholderText={props.inputPlaceholderText}
                          value={email}
                          onValueChanged={setEmail}
                          errorText={errorMessage}
                        />
                      </Stack.Item>
                      <Spacing direction={Direction.Horizontal} mode={SpacingSize.Narrow}/>
                      <Button
                        mode='primary'
                        buttonType='submit'
                        text={props.inputButtonText}
                        isLoading={isLoading}
                      />
                    </Stack>
                  </Grid.Item>
                  <Grid.Item id='form-inner-inner-vertical' size={12} sizeMedium={0}>
                    <Stack
                      direction={Direction.Vertical}
                      contentAlignment='fill'
                    >
                      <SingleLineInput
                        inputType='email'
                        placeholderText={props.inputPlaceholderText}
                        value={email}
                        onValueChanged={setEmail}
                        errorText={errorMessage}
                      />
                      <Spacing direction={Direction.Vertical} mode={SpacingSize.Narrow}/>
                      <Button
                        mode='primary'
                        buttonType='submit'
                        isFullWidth={true}
                        text={props.inputButtonText}
                      />
                    </Stack>
                  </Grid.Item>
                </Grid>
              </Stack>
            </Form>
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
HeroSignupImageHalf1.displayName = 'hero-signup-image-half-1';
