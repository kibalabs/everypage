import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Button, Direction, Form, InputType, PaddingSize, ResponsiveContainingView, ResponsiveHidingView, ResponsiveTextAlignmentView, ScreenSize, SingleLineInput, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { HeroLogo, HeroSectionSubtitleText, HeroSectionTitleText } from '../components';
import { EverypagePaddingSize, submitForm, validateInput } from '../internal';
import { defaultFormProps, IFormProps } from '../model';


// TODO(krishan711): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSignup1Props extends ISectionProps, IFormProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  inputPlaceholderText?: string;
  inputType?: InputType;
  inputName?: string;
  inputButtonText?: string;
  inputSuccessMessageText?: string;
}

export const HeroSignup1 = (props: IHeroSignup1Props): React.ReactElement => {
  const [input, setInput] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>(undefined);
  const inputType = props.inputType || InputType.Email;
  const inputName = props.inputName || inputType;
  const inputButtonText = props.inputButtonText || 'Submit';
  const additionalFormInputs = props.formAdditionalInputs || [];

  const onInputValueChanged = (value: string): void => {
    setInput(value);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
  };

  const onFormSubmitted = async (): Promise<void> => {
    const validationResult = validateInput(input, inputType);
    if (!validationResult.isValid) {
      setErrorMessage(validationResult.errorMessage || 'Input is not valid.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(undefined);
    const result = await submitForm([{ value: input, type: inputType, name: inputName }, ...additionalFormInputs], props.formAction, props.formTarget, props.formHeaders);
    setIsLoading(false);
    if (result.isSuccessful) {
      setSuccessMessage(props.inputSuccessMessageText || 'Success.');
    } else {
      setErrorMessage(result.responseMessage);
    }
  };

  return (
    <Section {...props as ISectionProps} className={getClassName(HeroSignup1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, small: 8, large: 6 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center}>
            {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroLogo source={props.logoImageUrl} /></Stack.Item>}
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><HeroSectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <Form onFormSubmitted={onFormSubmitted}>
              <React.Fragment>
                <ResponsiveHidingView hiddenBelow={ScreenSize.Small}>
                  <Stack direction={Direction.Horizontal}>
                    <Stack.Item growthFactor={1} gutterAfter={PaddingSize.Default}>
                      <SingleLineInput
                        inputWrapperVariant={errorMessage ? 'error' : successMessage ? 'success' : ''}
                        inputType={inputType}
                        name={inputName}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={onInputValueChanged}
                        messageText={errorMessage || successMessage}
                      />
                    </Stack.Item>
                    <Button
                      variant='primary'
                      buttonType='submit'
                      text={inputButtonText}
                      isLoading={isLoading}
                    />
                  </Stack>
                </ResponsiveHidingView>
                <ResponsiveHidingView hiddenAbove={ScreenSize.Small}>
                  <Stack direction={Direction.Vertical}>
                    <Stack.Item growthFactor={1} gutterAfter={PaddingSize.Default}>
                      <SingleLineInput
                        inputWrapperVariant={errorMessage ? 'error' : successMessage ? 'success' : ''}
                        inputType={inputType}
                        name={inputName}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={onInputValueChanged}
                        messageText={errorMessage || successMessage}
                      />
                    </Stack.Item>
                    <Button
                      variant='primary'
                      buttonType='submit'
                      text={inputButtonText}
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
HeroSignup1.displayName = 'hero-signup-1';
HeroSignup1.defaultProps = {
  ...defaultFormProps,
  paddingTop: EverypagePaddingSize.HeroTop,
  paddingBottom: EverypagePaddingSize.HeroBottom,
};
