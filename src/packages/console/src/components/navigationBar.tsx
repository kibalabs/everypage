import React from 'react';
import { useHistory } from '@kibalabs/core-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
  toolbar: {
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  alertBar: {
    backgroundColor: '#ffdd7e',
  },
  spacer: {
    flexGrow: 1,
  },
}));

export const NavigationBar = (): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient, authManager } = useGlobals();
  const history = useHistory();
  const [verificationSent, setVerificationSent] = React.useState<boolean>(false);

  const onLogoutClicked = (): void => {
    authManager.logout().then((): void => {
      history.navigate('/');
    });
  }

  const onResendVerificationClicked = (): void => {
    everypageClient.send_email_verification_for_user().then((): void => {
      setVerificationSent(true);
    });
  }

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <ButtonBase href={'/'}>
          <Typography component="h1" variant="h6" color="inherit">
            everypage
          </Typography>
        </ButtonBase>
        <div className={classes.spacer} />
        <Button
          variant='outlined'
          onClick={onLogoutClicked}
        >Log out</Button>
      </Toolbar>
      {!authManager.getJwt().hasVerifiedEmail && (
        <Toolbar className={classes.alertBar}>
          <Typography color="textPrimary">
            You need to verify your account before you cant create and edit sites. Please check your email.
          </Typography>
          <div className={classes.spacer} />
          {!verificationSent && (
            <Button
              variant='outlined'
              onClick={onResendVerificationClicked}
            >Resend Verification</Button>
          )}
          {verificationSent && (
            <Typography color="textPrimary">
              Email sent.
            </Typography>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
}
