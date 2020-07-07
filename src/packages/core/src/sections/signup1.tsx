import React from 'react';

import { Section, ISectionProps } from '.';
import { Form, Grid, Button, Markdown, Spacing, PaddingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType, Image } from '@kibalabs/ui-react';
import { submitForm, validateInput } from '../internal';
import { IFormProps, defaultFormProps } from '../model';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface ISignup1Props extends ISectionProps, IFormProps {
  titleText?: string;
  subtitleText?: string;
  inputPlaceholderText?: string;
  inputType?: InputType;
  inputName?: string;
  inputButtonText?: string;
  inputSuccessMessageText?: string;
}

export const Signup1 = (props: ISignup1Props): React.ReactElement => {
  const [input, setInput] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const onInputValueChanged = (value: string): void => {
    setInput(value);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  const onFormSubmitted = async (): Promise<void> => {
    const validationResult = validateInput(input, props.inputType);
    if (!validationResult.isValid) {
      setErrorMessage(validationResult.errorMessage);
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    const result = await submitForm([{value: input, type: props.inputType, name: props.inputName}, ...props.formAdditionalInputs], props.formAction, props.formTarget);
    setIsLoading(false);
    if (result.isSuccessful) {
      setSuccessMessage(props.inputSuccessMessageText)
    } else {
      setErrorMessage(result.responseMessage);
    }
  };

  return (
    <Section {...props as ISectionProps}>
      <Grid>
        <Grid.Item size={10} sizeSmall={8} sizeLarge={6}>
          <Stack direction={Direction.Vertical}>
            <Spacing mode={PaddingSize.ExtraExtraWide}/>
            <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
            {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            <Spacing mode={PaddingSize.Wide} />
            <Form onFormSubmitted={onFormSubmitted}>
              <Grid>
                <Grid.Item size={0} sizeSmall={12}>
                  <Stack direction={Direction.Horizontal}>
                    <Stack.Item growthFactor={1} gutterSizeAfter={PaddingSize.Default}>
                      <SingleLineInput
                        inputWrapperMode={errorMessage ? 'error' : successMessage ? 'success' : ''}
                        inputType={props.inputType}
                        name={props.inputName}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={onInputValueChanged}
                        messageText={errorMessage || successMessage}
                      />
                    </Stack.Item>
                    <Button
                      mode='primary'
                      buttonType='submit'
                      text={props.inputButtonText}
                      isLoading={isLoading}
                    />
                  </Stack>
                </Grid.Item>
                <Grid.Item size={12} sizeSmall={0}>
                  <Stack direction={Direction.Vertical}>
                    <Stack.Item growthFactor={1}>
                      <SingleLineInput
                        inputWrapperMode={errorMessage ? 'error' : successMessage ? 'success' : ''}
                        inputType={props.inputType}
                        name={props.inputName}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={onInputValueChanged}
                        messageText={errorMessage || successMessage}
                      />
                    </Stack.Item>
                    <Spacing direction={Direction.Vertical} mode={PaddingSize.Default}/>
                    <Button
                      mode='primary'
                      buttonType='submit'
                      isFullWidth={true}
                      text={props.inputButtonText}
                    />
                  </Stack>
                </Grid.Item>
              </Grid>
            </Form>
            <Spacing mode={PaddingSize.ExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
Signup1.displayName = 'signup-1';
Signup1.defaultProps = {
  ...defaultFormProps,
};
