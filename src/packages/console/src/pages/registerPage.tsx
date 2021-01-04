import React from 'react';

import { isValidEmail } from '@kibalabs/core';
import { useHistory } from '@kibalabs/core-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
  },
}));

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
  const classes = useStyles();

  const onLoginClicked = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const onFirstNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFirstName(event.target.value);
    setFirstNameError(undefined);
  };

  const onLastNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setLastName(event.target.value);
    setLastNameError(undefined);
  };

  const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setEmail(event.target.value);
    setEmailError(undefined);
  };

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setPassword(event.target.value);
    setPasswordError(undefined);
  };

  const onShouldJoinNewsletterChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShouldJoinNewsletter(event.target.checked);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create your everypage account
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <form className={classes.form} noValidate onSubmit={onLoginClicked}>
            <Grid container spacing={2}>
              <Grid item xs={12} />
              <Grid item xs={12}>
                <TextField
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
                />
                <TextField
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
                />
                <TextField
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
                />
                <TextField
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
                />
              </Grid>
              <FormControlLabel
                control={<Checkbox checked={shouldJoinNewsletter} onChange={onShouldJoinNewsletterChanged} color='primary' />}
                label='Keep me updated (no spam, we promise)!'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >Create account</Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href='#' variant='body2'>
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href='/login' variant='body2'>{'Already got an account? Log in'}</Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
      <Box mt={8}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'By creating an account, you are agreeing to our '}
          <Link color='inherit' href='https://terms.everypagehq.com'>
            Terms of Use
          </Link>
          {' and '}
          <Link color='inherit' href='https://privacy.everypagehq.com'>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
