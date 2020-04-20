import React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { Section, ISectionProps } from '.';
import { Form, Grid, Button, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType, Alignment } from '../components';
import { isValidEmail } from '../util';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface ISignup1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  inputPlaceholderText?: string;
  inputType?: InputType;
  inputButtonText?: string;
  inputSuccessMessageText?: string;
}

export const Signup1 = (props: ISignup1Props): React.ReactElement => {
  const [email, setEmail] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
        <Grid.Item size={1} sizeSmall={2} sizeMedium={2} sizeLarge={3}><div /></Grid.Item>
        <Grid.Item size={10} sizeSmall={8} sizeMedium={8} sizeLarge={6}>
          <Stack
            direction={Direction.Vertical}
          >
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
            <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>
            <Spacing mode={SpacingSize.Wide} />
            {props.subtitleText && <MarkdownText alignment={TextAlignment.Justify} text={props.subtitleText}/>}
            <Spacing mode={SpacingSize.Wide} />
            <Form onFormSubmitted={onFormSubmitted}>
              <Stack direction={Direction.Vertical}>
                <Grid>
                  <Grid.Item id='form-inner-inner-horizontal' size={0} sizeMedium={12}>
                    <Stack
                      direction={Direction.Horizontal}
                      contentAlignment={Alignment.Start}
                    >
                      <Stack.Item
                        growthFactor={1}
                      >
                        <SingleLineInput
                          inputType={props.inputType}
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
                    <Stack direction={Direction.Vertical}>
                      <SingleLineInput
                        inputType={props.inputType}
                        placeholderText={props.inputPlaceholderText}
                        value={email}
                        onValueChanged={setEmail}
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
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
Signup1.displayName = 'signup-1';
