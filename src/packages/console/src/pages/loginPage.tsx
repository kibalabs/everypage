import React from 'react';

import { useHistory } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Direction, Form, InputType, Link, PaddingSize, ResponsiveContainingView, SingleLineInput, Stack, Text } from '@kibalabs/ui-react';

import { useGlobals } from '../globalsContext';


export const LoginPage = (): React.ReactElement => {
  const { everypageClient, authManager } = useGlobals();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string | undefined>(undefined);


  const onLoginClicked = (): void => {
    setEmailError(undefined);
    setPasswordError(undefined);
    if (!email) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password) {
      setPasswordError('Please enter a password');
      return;
    }
    setIsLoading(true);
    everypageClient.loginUser(email, password).then((): void => {
      history.navigate(authManager.getJwt().hasVerifiedEmail ? '/' : '/verify-email', { replace: true });
    }).catch((error: Error): void => {
      if (error.message.includes('NotFoundException')) {
        setEmailError('No user found with this email');
      } else if (error.message.includes('INCORRECT_PASSWORD')) {
        setPasswordError('Incorrect password');
      } else {
        setPasswordError('Something went wrong on our side. Please try again later.');
      }
      setIsLoading(false);
    });
  };

  const onEmailChanged = (value: string): void => {
    setEmail(value);
    setEmailError(undefined);
  };

  const onPasswordChanged = (value: string): void => {
    setPassword(value);
    setPasswordError(undefined);
  };


  return (
    <ContainingView>
      <ResponsiveContainingView sizeResponsive={{ base: 12, small: 8, medium: 6, large: 5 }}>
        <Stack direction={Direction.Vertical} paddingVertical={PaddingSize.Wide2} isFullHeight={true}>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
          <Box variant='card' isFullWidth={false}>
            <Form isLoading={isLoading} onFormSubmitted={onLoginClicked}>
              <Stack direction={Direction.Vertical} shouldAddGutters={true}>
                <Stack.Item alignment={Alignment.Center} gutterAfter={PaddingSize.Wide2}>
                  <Text variant='header3'>Log in to everypage</Text>
                </Stack.Item>
                <SingleLineInput
                  inputWrapperVariant={emailError ? 'error' : ''}
                  value={email}
                  onValueChanged={onEmailChanged}
                  name='email'
                  id='email'
                  label='Email Address'
                  messageText={emailError}
                  placeholderText='Email Address'
                  inputType={InputType.Email}
                />
                <SingleLineInput
                  inputWrapperVariant={passwordError ? 'error' : ''}
                  value={password}
                  onValueChanged={onPasswordChanged}
                  name='password'
                  id='password'
                  label='Password'
                  messageText={passwordError}
                  placeholderText='Password'
                  inputType={InputType.Password}
                />
                <Stack.Item gutterBefore={PaddingSize.Wide2}>
                  <Button
                    buttonType='submit'
                    isFullWidth
                    variant='primary'
                    text='Log in'
                  />
                </Stack.Item>
                <Stack.Item alignment={Alignment.Center} gutterBefore={PaddingSize.Wide2}>
                  <Link target='/register' text="Don't have an account yet? Sign Up" shouldOpenSameTab={true} />
                </Stack.Item>
              </Stack>
            </Form>
          </Box>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
        </Stack>
      </ResponsiveContainingView>
    </ContainingView>
  );
};
