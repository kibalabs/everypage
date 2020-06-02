import React from 'react';
import { isValidEmail } from '@kibalabs/core';
import { useHistory } from '@kibalabs/core-react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const RegisterPage = (): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const history = useHistory();
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
    setEmailError(undefined);
    setPasswordError(undefined);
    everypageClient.create_user(firstName, lastName, email, password, shouldJoinNewsletter).then((): void => {
      history.navigate('/', { replace: true });
    }).catch((error: Error): void => {
      if (error.message.includes('USER_EMAIL_EXISTS')) {
        setEmailError('A user with this email exists. Please log in instead.');
      } else {
        setPasswordError('Something went wrong on our side. Please try again later.')
      }
    });
  }

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

  const onShouldJoibNewsletterChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShouldJoinNewsletter(event.target.checked);
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create your everypage account
        </Typography>
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
              control={<Checkbox checked={shouldJoinNewsletter} onChange={onShouldJoibNewsletterChanged} color='primary' />}
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
      </div>
      <Box mt={8}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'By creating an account, you are agreeing to our '}
          <Link color='inherit' href='https://terms.everypagehq.com'>
            Terms and Conditions
          </Link>
          {' and '}
          <Link color='inherit' href='https://privacy.everypagehq.com'>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'Copyright © '}
          <Link color='inherit' href='https://www.kibalabs.com'>
            Kiba Labs
          </Link>
          {` ${new Date().getFullYear()}.`}
        </Typography>
      </Box>
    </Container>
  );
}
