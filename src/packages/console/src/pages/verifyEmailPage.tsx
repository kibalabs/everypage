import React from 'react';

import { useHistory, useInitialization } from '@kibalabs/core-react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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
}));

export const VerifyEmailPage = (): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient, authManager } = useGlobals();
  const history = useHistory();
  const [verificationSent, setVerificationSent] = React.useState<boolean>(false);

  const onResendVerificationClicked = (): void => {
    everypageClient.sendEmailVerificationForUser().then((): void => {
      setVerificationSent(true);
    });
  };

  useInitialization((): void | (() => void) => {
    if (authManager.getJwt().hasVerifiedEmail) {
      history.navigate('/', { replace: true });
      return null;
    }
    const intervalId = setInterval((): void => {
      if (authManager.getJwt().hasVerifiedEmail) {
        clearInterval(intervalId);
        history.navigate('/', { replace: true });
      }
    }, 1000);
    return (): void => clearInterval(intervalId);
  });

  return (
    <Container component='main' maxWidth='sm'>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Please check your email
        </Typography>
        <br />
        <br />
        <Typography>
          We need to verify your email before you can create and edit sites. It only takes a second, please check your inbox for an email from everypass@kibalabs.com.
        </Typography>
        <br />
        <br />
        {!verificationSent && (
          <Button
            variant='outlined'
            onClick={onResendVerificationClicked}
          >
            Resend Verification
          </Button>
        )}
        {verificationSent && (
          <Typography color="textPrimary">
            Email sent.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
