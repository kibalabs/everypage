import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Form, Button, PaddingSize, Stack, SingleLineInput, Direction, InputType, ScreenSize, ResponsiveHidingView, ResponsiveContainingView, ResponsiveTextAlignmentView, TextAlignment } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { submitForm, validateInput, EverypagePaddingSize } from '../internal';
import { IFormProps, defaultFormProps } from '../model';
import { SectionTitleText, SectionSubtitleText } from '../components';

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
    const result = await submitForm([{value: input, type: props.inputType, name: props.inputName}, ...props.formAdditionalInputs], props.formAction, props.formTarget, props.formHeaders);
    setIsLoading(false);
    if (result.isSuccessful) {
      setSuccessMessage(props.inputSuccessMessageText)
    } else {
      setErrorMessage(result.responseMessage);
    }
  };

  return (
    <Section {...props as ISectionProps} className={getClassName(Signup1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{base: 10, small: 8, large: 6}}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Form onFormSubmitted={onFormSubmitted}>
              <React.Fragment>
                <ResponsiveHidingView hiddenBelow={ScreenSize.Small}>
                  <Stack direction={Direction.Horizontal}>
                    <Stack.Item growthFactor={1} gutterAfter={PaddingSize.Default}>
                      <SingleLineInput
                        inputWrapperVariant={errorMessage ? 'error' : successMessage ? 'success' : ''}
                        inputType={props.inputType}
                        name={props.inputName}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={onInputValueChanged}
                        messageText={errorMessage || successMessage}
                      />
                    </Stack.Item>
                    <Button
                      variant='primary'
                      buttonType='submit'
                      text={props.inputButtonText}
                      isLoading={isLoading}
                    />
                  </Stack>
                </ResponsiveHidingView>
                <ResponsiveHidingView hiddenAbove={ScreenSize.Small}>
                  <Stack direction={Direction.Vertical}>
                    <Stack.Item growthFactor={1} gutterAfter={PaddingSize.Default}>
                      <SingleLineInput
                        inputWrapperVariant={errorMessage ? 'error' : successMessage ? 'success' : ''}
                        inputType={props.inputType}
                        name={props.inputName}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={onInputValueChanged}
                        messageText={errorMessage || successMessage}
                      />
                    </Stack.Item>
                    <Button
                      variant='primary'
                      buttonType='submit'
                      text={props.inputButtonText}
                      isLoading={isLoading}
                      isFullWidth={true}
                    />
                  </Stack>
                </ResponsiveHidingView>
              </React.Fragment>
            </Form>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
Signup1.displayName = 'signup-1';
Signup1.defaultProps = {
  ...defaultFormProps,
};
