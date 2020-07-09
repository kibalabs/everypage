import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Form, Grid, Image, Button, Markdown, Spacing, PaddingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType, ScreenSize, ResponsiveView, ResponsiveContainingView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { submitForm, validateInput } from '../internal';
import { IFormProps, defaultFormProps } from '../model';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
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
    <Section {...props as ISectionProps} className={getClassName(HeroSignup1.displayName, props.className)}>
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <Stack direction={Direction.Vertical} gutterSizeStart={PaddingSize.ExtraExtraExtraWide} gutterSizeEnd={PaddingSize.ExtraExtraExtraWide}>
          { props.logoImageUrl && (
            <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}>
              <ResponsiveContainingView size={10}>
                <Image source={props.logoImageUrl} isLazyLoadable={false} isFullWidth={true} alternativeText='logo' />
              </ResponsiveContainingView>
            </Stack.Item>
          )}
          <Markdown rootTextMode='header' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
          {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
          <Spacing mode={PaddingSize.ExtraWide} />
          <Form onFormSubmitted={onFormSubmitted}>
            <React.Fragment>
              <ResponsiveView hiddenBelow={ScreenSize.Small}>
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
              </ResponsiveView>
              <ResponsiveView hiddenAbove={ScreenSize.Small}>
                <Stack direction={Direction.Vertical}>
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
                    isFullWidth={true}
                  />
                </Stack>
              </ResponsiveView>
            </React.Fragment>
          </Form>
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
HeroSignup1.displayName = 'hero-signup-1';
HeroSignup1.defaultProps = {
  ...defaultFormProps,
};
