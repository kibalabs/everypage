import React from 'react';

import { Section, ISectionProps } from '.';
import { Form, Grid, Button, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType, Alignment } from '../components';
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
      // setSuccessMessage(props.inputSuccessMessageText)
    } else {
      setErrorMessage(result.responseMessage);
    }
  };

  return (
    <Section {...props as ISectionProps}>
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
                  <Grid.Item id='form-inner-inner-horizontal' size={0} sizeSmall={12}>
                    <Stack
                      direction={Direction.Horizontal}
                      contentAlignment={Alignment.Start}
                    >
                      <Stack.Item
                        growthFactor={1}
                      >
                        <SingleLineInput
                          inputType={props.inputType}
                          name={props.inputName}
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
                      <Stack.Item growthFactor={1}>
                        <SingleLineInput
                          inputType={props.inputType}
                          name={props.inputName}
                          placeholderText={props.inputPlaceholderText}
                          value={input}
                          onValueChanged={setInput}
                          errorText={errorMessage}
                        />
                      </Stack.Item>
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
Signup1.defaultProps = {
  ...defaultFormProps,
};
