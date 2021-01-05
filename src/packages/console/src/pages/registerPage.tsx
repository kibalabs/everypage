import React from 'react';
import { isValidEmail } from '@kibalabs/core';
import { useHistory } from '@kibalabs/core-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { InputType, SingleLineInput, ContainingView, Box, PaddingView, Text, PaddingSize, Button, Spacing, Grid, Form, Link } from "@kibalabs/ui-react";


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

  //event: React.FormEvent<HTMLFormElement>
  const onLoginClicked = (): void => {
    // event.preventDefault();
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
        setPasswordError('Something went wrong on our side. Please try again later.')
      }
      setIsLoading(false);
    });
  }
  /*
    const onFirstNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setFirstName(event.target.value);
      setFirstNameError(undefined);
    }
  
    const onLastNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setLastName(event.target.value);
      setLastNameError(undefined);
    }
  
    const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setEmail(event.target.value);
      setEmailError(undefined);
    }
  
    const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setPassword(event.target.value);
      setPasswordError(undefined);
    }
  */
  const onShouldJoinNewsletterChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShouldJoinNewsletter(event.target.checked);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', textAlign: "center" }}>
      <Spacing variant={PaddingSize.Wide2} />
      <ContainingView>
        <PaddingView paddingTop={PaddingSize.Wide2} padding={PaddingSize.Wide2}>
          <Box variant='card' isFullWidth={false}>
            <Text variant='header3'>
              Create your everypage account
          </Text>
            <Spacing variant={PaddingSize.Wide2} />

            {/*isLoading ? (
          <CircularProgress />
        ) : (*/}
            <Form isLoading={isLoading} onFormSubmitted={onLoginClicked}>
              <Grid>
                <Grid.Item>
                  {/* <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    margin='normal'
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={onFirstNameChanged}
                    error={firstNameError !== undefined}
                    helperText={firstNameError}
                  /> */}
                  <SingleLineInput
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    placeholderText="First Name"
                    value={firstName}
                    inputType={InputType.Text}
                    messageText={firstNameError}
                    inputWrapperVariant={firstNameError ? "error" : ""}
                    onValueChanged={setFirstName}
                  />
                  <Spacing variant={PaddingSize.Wide2} />

                  {/* <TextField
                    variant="outlined"
                    margin='normal'
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={lastName}
                    onChange={onLastNameChanged}
                    error={lastNameError !== undefined}
                    helperText={lastNameError}
                  /> */}
                  <SingleLineInput
                    name="lastName"
                    id="lastName"
                    label="Last Name"
                    placeholderText="Last Name"
                    value={lastName}
                    inputType={InputType.Text}
                    messageText={lastNameError}
                    inputWrapperVariant={lastNameError ? "error" : ""}
                    onValueChanged={setLastName}
                  />
                  <Spacing variant={PaddingSize.Wide2} />

                  {/* <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={email}
                    onChange={onEmailChanged}
                    error={emailError !== undefined}
                    helperText={emailError}
                  /> */}

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

                  {/* <TextField
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
                  /> */}

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
                </Grid.Item>
                <FormControlLabel
                  control={<Checkbox checked={shouldJoinNewsletter} onChange={onShouldJoinNewsletterChanged} color='primary' />}
                  label='Keep me updated (no spam, we promise)!'
                />
                <Button
                  buttonType='submit'
                  isFullWidth
                  variant='primary'
                  // color='primary'
                  text='Create account'
                />
                <Spacing variant={PaddingSize.Wide1} />

                <Grid>
                  <Grid.Item>
                    {/* <Link href='#' variant='body2'>
                    Forgot password?
                  </Link> */}
                  </Grid.Item>
                  <Grid.Item>
                    <Link shouldOpenSameTab target='/login' variant='default' text={'Already got an account? Log in'} />
                  </Grid.Item>
                </Grid>
              </Grid>
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
        </PaddingView>
      </ContainingView>
    </div>
  );
}
