import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, ResponsiveTextAlignmentView, SingleLineInput, MultiLineInput, Button, Stack, Direction, PaddingSize, TextAlignment, Form, InputType, Alignment} from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';


interface IContact1Props extends ISectionProps {
    titleText?: string;
  subtitleText?: string;
  receivingEmail: string;
}

export const Contact1 = (props: IContact1Props): React.ReactElement => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string| undefined>(undefined);
    const [email, setEmail] = React.useState<string| undefined>(undefined);
    const [phoneNumber, setPhoneNumber] = React.useState<number| undefined>(undefined);
    const [message, setMessage] = React.useState<string| undefined>(undefined);
    const [nameError, setNameError] = React.useState<string | undefined>(undefined);
    const [emailError, setEmailError] = React.useState<string | undefined>(undefined);
    const [phoneNumberError, setPhoneNumberError] = React.useState<string | undefined>(undefined);

    const [messageError, setMessageError] = React.useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const [successMessage, setSuccessMessage] = React.useState<string | undefined>(undefined);

    const onMessageChange = (value :string) :void=> {
        setMessage(value);
        setMessageError(undefined);
    };

    const onNameChange = (value :string) :void=> {
        setName(value);
        setNameError(undefined);
    };

    const onEmailChange = (value :string) :void=> {
        setEmail(value);
        setEmailError(undefined);
    };

    const onPhoneNumberChange = (value :number) :void=> {
        setPhoneNumber(value);
        setPhoneNumberError(undefined);
    };
    const onFormSubmitted = async () :Promise<void> => {
      setNameError(undefined);
      setEmailError(undefined);
      setPhoneNumberError(undefined);
      setMessageError(undefined);
      if (!name) {
        setNameError('Please enter name');
        return;
      }
      if (!email) {
        setEmailError('Please enter a valid email');
        return;
      }
      if (!phoneNumber) {
        setPhoneNumberError('Please enter a valid phone number');
        return;
      }
      if (!message) {
        setEmailError('Please enter a message');
        return;
      }
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setName(undefined);
        setEmail(undefined);
        setPhoneNumber(undefined);
        setMessage(undefined);
      }, 2000);

    };
    
    return <Section {...props as ISectionProps} className={getClassName(Contact1.displayName, props.className)}>
            <ResponsiveContainingView sizeResponsive={{ base: 10, small: 8, large: 6 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <Form onFormSubmitted={onFormSubmitted} isLoading={isLoading}>
                  <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide1} >
                    <Stack.Item growthFactor={1} shrinkFactor={1} />
                    <SingleLineInput
                        inputWrapperVariant={nameError ? 'error' : ''}
                        inputType={InputType.Text}
                        name='name'
                        placeholderText='Name'
                        value={name}
                        onValueChanged={onNameChange}
                        messageText={nameError}
                      />
                    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Narrow}>
                    <Stack.Item growthFactor={1} shrinkFactor={1}>
                    <SingleLineInput
                        inputWrapperVariant={emailError ? 'error' : ''}
                        inputType={InputType.Email}
                        name='email'
                        placeholderText='Email'
                        value={email}
                        onValueChanged={onEmailChange}
                        messageText={emailError}
                      />
                      </Stack.Item>
                      {/* <Stack.Item growthFactor={0.2} shrinkFactor={0.2} /> */}
                    <Stack.Item growthFactor={1} shrinkFactor={1}>
                      <SingleLineInput
                        inputWrapperVariant={phoneNumberError ? 'error' : ''}
                        inputType={InputType.PhoneNumber}
                        name='phone-number'
                        placeholderText='Phone Number'
                        value={phoneNumber}
                        onValueChanged={onPhoneNumberChange}
                        messageText={phoneNumberError}
                      />
                      </Stack.Item>
                      </Stack>
                      <MultiLineInput
                        inputWrapperVariant={errorMessage || messageError ? 'error' : ''}
                        placeholderText='Message'
                        value={message}
                        onValueChanged={onMessageChange}
                        messageText={errorMessage ? errorMessage :  messageError}
                      />
                    <Button
                      variant='primary'
                      buttonType='submit'
                      text='Send'
                      isLoading={isLoading}
                    />
                  </Stack>
            </Form>
            </Stack>
            </ResponsiveTextAlignmentView>
        </ResponsiveContainingView>
    </Section>;

}
Contact1.displayName = 'contact-1';
Contact1.defaultProps = {
    titleText: 'Contact Us',
    subtitleText: 'Leave us a message & we will reply soon'
};