import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Button, Direction, EqualGrid, Form, InputType, KibaIcon, MarkdownText, MultiLineInput, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, SingleLineInput, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize, submitForm, validateInput } from '../internal';
import { IFormProps } from '../model';


interface IContact2Props extends ISectionProps, IFormProps {
  titleText?: string;
  subtitleText?: string;
  bottomText?: string;
  address?: string;
  phoneNumber?: number;
  email?: string;
  // TODO(krishan711): think about how the other input fields should be customized.
  inputButtonText?: string;
  inputSuccessMessageText?: string;
}

export const Contact2 = (props: IContact2Props): React.ReactElement => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string| null>(null);
  const [email, setEmail] = React.useState<string| null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<string| null>(null);
  const [message, setMessage] = React.useState<string| null>(null);
  const [nameError, setNameError] = React.useState<string | undefined>(undefined);
  const [emailError, setEmailError] = React.useState<string | undefined>(undefined);
  const [phoneNumberError, setPhoneNumberError] = React.useState<string | undefined>(undefined);
  const [messageError, setMessageError] = React.useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>(undefined);
  const inputButtonText = props.inputButtonText || 'Submit';
  const additionalFormInputs = props.formAdditionalInputs || [];

  const onNameChanged = (value: string) :void => {
    setName(value);
    setErrorMessage(undefined);
  };

  const onEmailChanged = (value: string) :void => {
    setEmail(value);
    setErrorMessage(undefined);
  };

  const onPhoneNumberChanged = (value: string) :void => {
    setPhoneNumber(value);
    setErrorMessage(undefined);
  };

  const onMessageChanged = (value: string) :void => {
    setMessage(value);
    setErrorMessage(undefined);
  };

  const onFormSubmitted = async () :Promise<void> => {
    setNameError(undefined);
    setEmailError(undefined);
    setPhoneNumberError(undefined);
    setMessageError(undefined);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
    if (!name) {
      setNameError('Please enter your name');
      return;
    }
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }
    const emailValidationResult = validateInput(email, InputType.Email);
    if (!emailValidationResult.isValid) {
      setErrorMessage(emailValidationResult.errorMessage || 'Email is not valid.');
      return;
    }
    if (!phoneNumber) {
      setPhoneNumberError('Please enter your phone number');
      return;
    }
    if (!message) {
      setEmailError('Please enter a message');
      return;
    }
    setIsLoading(true);
    const formFields = [
      { name: 'name', value: name, type: InputType.Email },
      { name: 'email', value: email, type: InputType.Text },
      { name: 'phoneNumber', value: phoneNumber, type: InputType.PhoneNumber },
      { name: 'message', value: message, type: InputType.Text },
      ...additionalFormInputs,
    ];
    const result = await submitForm(formFields, props.formAction, props.formTarget, props.formHeaders);
    setIsLoading(false);
    if (result.isSuccessful) {
      setName(null);
      setEmail(null);
      setPhoneNumber(null);
      setMessage(null);
      setSuccessMessage(props.inputSuccessMessageText || 'Success.');
    } else {
      setErrorMessage(result.responseMessage);
    }
  };
  const sizes = { base: 12, small: 12, medium: 6, large: 4 };
  return (
    <Section {...props as ISectionProps} className={getClassName(Contact2.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10 }}>
        <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
          <EqualGrid childSizeResponsive={sizes} contentAlignment={Alignment.Center}>
            <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center} shouldAddGutters={true}>
              {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
              {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
              {props.address && (
                <Stack.Item gutterAfter={PaddingSize.Wide}>
                  <MarkdownText source={props.address} />
                </Stack.Item>
              )}
              {props.phoneNumber && (
                <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
                  <KibaIcon iconId='ion-call-outline' />
                  <Text>{props.phoneNumber}</Text>
                </Stack>
              )}
              {props.email && (
                <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
                  <KibaIcon iconId='ion-mail-outline' />
                  <Text>{props.email}</Text>
                </Stack>
              )}
              <Stack.Item growthFactor={20} shrinkFactor={1} />
              {props.bottomText && <Stack.Item><SectionSubtitleText text={props.bottomText} /></Stack.Item>}
            </Stack>
            <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
              <Stack direction={Direction.Vertical}>
                <Form onFormSubmitted={onFormSubmitted} isLoading={isLoading}>
                  <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide1}>
                    <Stack.Item growthFactor={1} shrinkFactor={1} />
                    <SingleLineInput
                      inputWrapperVariant={nameError ? 'error' : ''}
                      inputType={InputType.Text}
                      name='name'
                      placeholderText='Name'
                      value={name}
                      onValueChanged={onNameChanged}
                      messageText={nameError}
                    />
                    <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} contentAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Narrow}>
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <SingleLineInput
                          inputWrapperVariant={emailError ? 'error' : ''}
                          inputType={InputType.Email}
                          name='email'
                          placeholderText='Email'
                          value={email}
                          onValueChanged={onEmailChanged}
                          messageText={emailError}
                        />
                      </Stack.Item>
                      <Stack.Item><Spacing /></Stack.Item>
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <SingleLineInput
                          inputWrapperVariant={phoneNumberError ? 'error' : ''}
                          inputType={InputType.PhoneNumber}
                          name='phone-number'
                          placeholderText='Phone Number'
                          value={phoneNumber}
                          onValueChanged={onPhoneNumberChanged}
                          messageText={phoneNumberError}
                        />
                      </Stack.Item>
                    </Stack>
                    <MultiLineInput
                      inputWrapperVariant={errorMessage || messageError ? 'error' : successMessage ? 'success' : ''}
                      placeholderText='Message'
                      value={message}
                      onValueChanged={onMessageChanged}
                      messageText={errorMessage || messageError || successMessage}
                    />
                    <Button
                      variant='primary'
                      buttonType='submit'
                      text={inputButtonText}
                      isLoading={isLoading}
                    />
                  </Stack>
                </Form>
              </Stack>
            </ResponsiveTextAlignmentView>
          </EqualGrid>
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
Contact2.displayName = 'contact-2';
Contact2.defaultProps = {
};
