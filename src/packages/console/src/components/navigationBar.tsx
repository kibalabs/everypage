import React from 'react';

import { useHistory, useInitialization } from '@kibalabs/core-react';
import { Box, Image } from '@kibalabs/ui-react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
  navButton: {
    marginLeft: '10px',
    borderColor: 'white',
    color: 'white',
  },
}));

export const NavigationBar = (): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient, authManager } = useGlobals();
  const history = useHistory();
  const [verificationSent, setVerificationSent] = React.useState<boolean>(false);
  const [hasVerifiedEmail, setHasVerifiedEmail] = React.useState<boolean>(true);

  const onLogoutClicked = (): void => {
    authManager.logout().then((): void => {
      history.navigate('/');
    });
  };

  const onResendVerificationClicked = (): void => {
    everypageClient.sendEmailVerificationForUser().then((): void => {
      setVerificationSent(true);
    });
  };

  useInitialization((): (() => void) => {
    setHasVerifiedEmail(authManager.getJwt().hasVerifiedEmail);
    if (!authManager.getJwt().hasVerifiedEmail) {
      const intervalId = setInterval((): void => {
        if (authManager.getJwt().hasVerifiedEmail) {
          setHasVerifiedEmail(true);
          clearInterval(intervalId);
        }
      }, 1000);
      return (): void => clearInterval(intervalId);
    }
  });

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <ButtonBase href={'/'}>
          <Box height={'30px'}>
            <Image
              source={'/assets/everypage-wordmark-dark.svg'}
              alternativeText={'Home'}
              isFullWidth={false}
              fitType={'scale'}
            />
          </Box>
        </ButtonBase>
        <div className={classes.spacer} />
        <Button
          variant='outlined'
          onClick={onLogoutClicked}
        >Log out</Button>
        <Button
          className={classes.navButton}
          variant='outlined'
          href='https://www.notion.so/kibalabs/everypage-learning-12109edaac1e4d5eb08672cadaa2fc26'
          target='_blank'
        >Tutorials</Button>
      </Toolbar>
      {!hasVerifiedEmail && (
        <Toolbar className={classes.alertBar}>
          <Typography color="textPrimary">
            You need to verify your account before you can create and edit sites. Please check your email.
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
};
