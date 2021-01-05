import React from 'react';
import { useHistory } from '@kibalabs/core-react';
import { InputType, SingleLineInput, ContainingView, Box, PaddingView, Text, PaddingSize, Button, Spacing, Grid, Form, Link } from "@kibalabs/ui-react";
import { useGlobals } from '../globalsContext';


export const LoginPage = (): React.ReactElement => {
  const { everypageClient, authManager } = useGlobals();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string | undefined>(undefined);

  // event: React.FormEvent<HTMLFormElement>
  const onLoginClicked = (): void => {
    // event.preventDefault();
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
        setPasswordError('Something went wrong on our side. Please try again later.')
      }
      setIsLoading(false);
    });
  }

  /*const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setEmail(event.target.value);
    setEmailError(undefined);
  }

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setPassword(event.target.value);
    setPasswordError(undefined);
  }*/

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center" }}>
      <Spacing variant={PaddingSize.Wide4} />
      <ContainingView>
        <PaddingView paddingTop={PaddingSize.Wide} padding={PaddingSize.Wide1}>
          <Box variant='card' isFullWidth={false}>
            <Text variant='header3'>Log in to everypage</Text>
            {/*isLoading ? (
              <React.Fragment>
                <Spacing variant={PaddingSize.Wide} />
                <LoadingSpinner />
              </React.Fragment>
            ) : (*/}
            <Form isLoading={isLoading} onFormSubmitted={onLoginClicked}>
              {/*<TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={onEmailChanged}
                error={emailError !== undefined}
                helperText={emailError}
              />*/}
              <Spacing variant={PaddingSize.Wide2} />
              <SingleLineInput
                inputWrapperVariant={emailError ? "error" : ""}
                value={email}
                onValueChanged={setEmail}
                name="email"
                id='email'
                label='Email Address'
                messageText={emailError}
                placeholderText="Email Address"
                inputType={InputType.Email}
              />
              <Spacing variant={PaddingSize.Wide2} />

              {/*<TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={onPasswordChanged}
                error={passwordError !== undefined}
                helperText={passwordError}
              />*/}
              <SingleLineInput
                inputWrapperVariant={passwordError ? "error" : ""}
                value={password}
                onValueChanged={setPassword}
                name="password"
                id='password'
                label='Password'
                messageText={passwordError}
                placeholderText="Password"
                inputType={InputType.Password}
              />
              <Spacing variant={PaddingSize.Wide2} />

              <Button
                buttonType='submit'
                isFullWidth
                variant='primary'
                // color='primary'
                text="Log in"
              />
              <Spacing variant={PaddingSize.Wide1} />

              <Grid>
                <Grid.Item size={1}>
                  {/* <Link href='#' variant='body2'>
                  Forgot password?
                </Link> */}
                </Grid.Item>
                <Grid.Item>
                  <Link target='/register' variant='default' text="Don't have an account yet? Sign Up" />
                </Grid.Item>
              </Grid>
            </Form>
          </Box>
        </PaddingView>
      </ContainingView>
    </div>
  );
}