import React from 'react';

import { useHistory } from '@kibalabs/core-react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
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

export const LoginPage = (): React.ReactElement => {
  const { everypageClient, authManager } = useGlobals();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string | undefined>(undefined);
  const classes = useStyles();

  const onLoginClicked = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setEmail(event.target.value);
    setEmailError(undefined);
  };

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setPassword(event.target.value);
    setPasswordError(undefined);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Log in to everypage
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <form className={classes.form} noValidate onSubmit={onLoginClicked}>
            <TextField
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >Log In</Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href='#' variant='body2'>
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>{'Don\'t have an account yet? Sign Up'}</Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Container>
  );
};
