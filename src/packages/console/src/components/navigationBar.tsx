import React from 'react';

import { deepCompare } from '@kibalabs/core';
import { useInitialization, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, Image, LinkBase, PaddingSize, Stack, Text } from '@kibalabs/ui-react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
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
}));

// TODO(krishan711): this wont need memo once its moved out of each page and to the "App" level
export const NavigationBar = React.memo((): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient, authManager } = useGlobals();
  const navigator = useNavigator();
  const [verificationSent, setVerificationSent] = React.useState<boolean>(false);
  const [hasVerifiedEmail, setHasVerifiedEmail] = React.useState<boolean>(true);

  const onLogoutClicked = (): void => {
    authManager.logout().then((): void => {
      navigator.navigateTo('/');
    });
  };

  const onResendVerificationClicked = (): void => {
    everypageClient.sendEmailVerificationForUser().then((): void => {
      setVerificationSent(true);
    });
  };

  useInitialization((): void | (() => void) => {
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
    return null;
  });

  return (
    <AppBar position='absolute' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <LinkBase target='/'>
          <Box height='30px'>
            <Image
              source='/assets/everypage-wordmark-dark.svg'
              alternativeText='Home'
              isFullWidth={false}
              fitType='scale'
            />
          </Box>
        </LinkBase>
        <div className={classes.spacer} />
        <Button
          variant='navButton-logoutButton'
          onClicked={onLogoutClicked}
          text='Log out'
        />
        <Button
          variant='navButton'
          target='https://www.notion.so/kibalabs/everypage-learning-12109edaac1e4d5eb08672cadaa2fc26'
          targetShouldOpenSameTab={false}
          text='Tutorials'
        />
      </Toolbar>
      {!hasVerifiedEmail && (
        <Toolbar className={classes.alertBar}>
          <Stack direction={Direction.Horizontal} defaultGutter={PaddingSize.Wide} shouldAddGutters={true} childAlignment={Alignment.Center}>
            <Text variant='colored'>
              You need to verify your account before you can create and edit sites. Please check your email.
            </Text>
            {!verificationSent && (
              <Button
                variant='secondary'
                onClicked={onResendVerificationClicked}
                text='Resend Verification'
              />
            )}
            {verificationSent && (
              <Text variant='colored'>
              Email sent.
              </Text>
            )}
          </Stack>
        </Toolbar>
      )}
    </AppBar>
  );
}, deepCompare);

NavigationBar.displayName = 'NavigationBar';
