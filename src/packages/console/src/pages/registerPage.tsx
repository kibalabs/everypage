import React from 'react';

import { isValidEmail } from '@kibalabs/core';
import { useHistory } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Direction, Form, InputType, Link, PaddingSize, ResponsiveContainingView, SingleLineInput, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import { useGlobals } from '../globalsContext';


export const RegisterPage = (): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [firstName, setFirstName] = React.useState<string>('');
  const [firstNameError, setFirstNameError] = React.useState<string | undefined>(undefined);
  const [lastName, setLastName] = React.useState<string>('');
  const [lastNameError, setLastNameError] = React.useState<string | undefined>(undefined);
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string | undefined>(undefined);
  const [shouldJoinNewsletter, setShouldJoinNewsletter] = React.useState<boolean>(false);

  const onLoginClicked = (): void => {
    setEmailError(undefined);
    setPasswordError(undefined);
    if (!firstName) {
      setFirstNameError('Please enter a valid first name');
      return;
    }
    if (!lastName) {
      setLastNameError('Please enter a valid last name');
      return;
    }
    if (!email || !isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password || password.length < 7) {
      setPasswordError('Please enter a valid password. It should be at least 7 characters long');
      return;
    }
    setIsLoading(true);
    everypageClient.createUser(firstName, lastName, email, password, shouldJoinNewsletter).then((): void => {
      history.navigate('/verify-email', { replace: true });
    }).catch((error: Error): void => {
      if (error.message.includes('USER_EMAIL_EXISTS')) {
        setEmailError('A user with this email exists. Please log in instead.');
      } else {
        setPasswordError('Something went wrong on our side. Please try again later.');
      }
      setIsLoading(false);
    });
  };

  const onFirstNameChanged = (value: string): void => {
    setFirstName(value);
    setFirstNameError(undefined);
  };

  const onLastNameChanged = (value: string): void => {
    setLastName(value);
    setLastNameError(undefined);
  };

  const onEmailChanged = (value: string): void => {
    setEmail(value);
    setEmailError(undefined);
  };

  const onPasswordChanged = (value: string): void => {
    setPassword(value);
    setPasswordError(undefined);
  };

  const onShouldJoinNewsletterChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShouldJoinNewsletter(event.target.checked);
  };

  return (
    <ContainingView>
      <ResponsiveContainingView size={12} sizeResponsive={{ small: 8, medium: 6, large: 5 }}>
        <Stack direction={Direction.Vertical} paddingVertical={PaddingSize.Wide2} isFullHeight={true}>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
          <Box variant='card' isFullWidth={false}>
            <Form isLoading={isLoading} onFormSubmitted={onLoginClicked}>
              <Stack direction={Direction.Vertical}>
                <Stack.Item alignment={Alignment.Center}>
                  <Text variant='header3' alignment={TextAlignment.Center}>
                    Create your everypage account
                  </Text>
                </Stack.Item>
                <Spacing variant={PaddingSize.Wide2} />
                <SingleLineInput
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  placeholderText="First Name"
                  value={firstName}
                  inputType={InputType.Text}
                  messageText={firstNameError}
                  inputWrapperVariant={firstNameError ? 'error' : ''}
                  onValueChanged={onFirstNameChanged}
                />
                <Spacing variant={PaddingSize.Wide2} />

                <SingleLineInput
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  placeholderText="Last Name"
                  value={lastName}
                  inputType={InputType.Text}
                  messageText={lastNameError}
                  inputWrapperVariant={lastNameError ? 'error' : ''}
                  onValueChanged={onLastNameChanged}
                />
                <Spacing variant={PaddingSize.Wide2} />

                <SingleLineInput
                  inputWrapperVariant={emailError ? 'error' : ''}
                  value={email}
                  onValueChanged={onEmailChanged}
                  name="email"
                  id='email'
                  label='Email Address'
                  messageText={emailError}
                  placeholderText="Email Address"
                  inputType={InputType.Email}
                />
                <Spacing variant={PaddingSize.Wide2} />

                <SingleLineInput
                  inputWrapperVariant={passwordError ? 'error' : ''}
                  value={password}
                  onValueChanged={onPasswordChanged}
                  name="password"
                  id='password'
                  label='Password'
                  messageText={passwordError}
                  placeholderText="Password"
                  inputType={InputType.Password}
                />
                <Spacing variant={PaddingSize.Wide2} />

                <FormControlLabel
                  control={<Checkbox checked={shouldJoinNewsletter} onChange={onShouldJoinNewsletterChanged} color='primary' />}
                  label='Keep me updated (no spam, we promise)!'
                />
                <Spacing variant={PaddingSize.Wide2} />

                <Button
                  buttonType='submit'
                  isFullWidth
                  variant='primary'
                  text='Create account'
                />
                <Spacing variant={PaddingSize.Wide1} />

                <Stack.Item alignment={Alignment.End}>
                  <Link shouldOpenSameTab target='/login' variant='default' text={'Already got an account? Log in'} />
                </Stack.Item>
              </Stack>
            </Form>
          </Box>
          <Box>
            <Text variant='body2'>
              {'By creating an account, you are agreeing to our '}
              <Link shouldOpenSameTab target='https://terms.everypagehq.com' text='Terms of Use' />
              {' and '}
              <Link shouldOpenSameTab target='https://privacy.everypagehq.com' text='Privacy Policy' />
            </Text>
          </Box>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
        </Stack>
      </ResponsiveContainingView>
    </ContainingView>
  );
};
