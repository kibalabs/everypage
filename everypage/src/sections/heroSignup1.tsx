import React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { Section, ISectionProps } from '.';
import { Form, Grid, Image, Button, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType } from '../components';
import { isValidEmail } from '../util';
import { validateInput } from '../util/inputValidation';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSignup1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  inputPlaceholderText?: string;
  inputType?: InputType;
  inputButtonText?: string;
  inputSuccessMessageText?: string;
}

export const HeroSignup1 = (props: IHeroSignup1Props): React.ReactElement => {
  const [input, setInput] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onFormSubmitted = (): void => {
    const validationResult = validateInput(input, props.inputType);
    if (!validationResult.isValid) {
      setErrorMessage(validationResult.errorMessage);
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    axios.post('https://api.kiba.dev/v1/newsletter-subscriptions', {input: input, topic: 'kiwi'}).then((response: AxiosResponse) => {
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
        <Grid.Item size={1} sizeSmall={2} sizeMedium={2} sizeLarge={3}><div /></Grid.Item>
        <Grid.Item size={10} sizeSmall={8} sizeMedium={8} sizeLarge={6}>
          <Stack
            direction={Direction.Vertical}
          >
            <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
            { props.logoImageUrl && (
              <React.Fragment>
                <Grid>
                  <Grid.Item size={1}><div /></Grid.Item>
                  <Grid.Item size={10}>
                    <Image source={props.logoImageUrl} isFullWidth={true} alternativeText='logo' />
                  </Grid.Item>
                </Grid>
                <Spacing mode={SpacingSize.ExtraWide} />
              </React.Fragment>
            )}
            <MarkdownText mode='header' alignment={TextAlignment.Center} text={props.titleText}/>
            <Spacing mode={SpacingSize.ExtraWide} />
            {props.subtitleText && <MarkdownText alignment={TextAlignment.Justify} text={props.subtitleText}/>}
            <Spacing mode={SpacingSize.ExtraWide} />
            <Form onFormSubmitted={onFormSubmitted}>
              <Stack direction={Direction.Vertical}>
                <Grid>
                  <Grid.Item id='form-inner-inner-horizontal' size={0} sizeSmall={12}>
                    <Stack direction={Direction.Horizontal}>
                      <Stack.Item growthFactor={1}>
                        <SingleLineInput
                          inputType={props.inputType}
                          placeholderText={props.inputPlaceholderText}
                          value={input}
                          onValueChanged={setInput}
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
                  <Grid.Item id='form-inner-inner-vertical' size={12} sizeSmall={0}>
                    <Stack direction={Direction.Vertical}>
                      <SingleLineInput
                        inputType={props.inputType}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={setInput}
                        errorText={errorMessage}
                      />
                      <Spacing direction={Direction.Vertical} mode={SpacingSize.Default}/>
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
            <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
HeroSignup1.displayName = 'hero-signup-1';
