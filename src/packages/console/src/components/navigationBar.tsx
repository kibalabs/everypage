import React from 'react';
import { useHistory } from '@kibalabs/core-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  title: {
    flexGrow: 1,
  },
}));

export const NavigationBar = (): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient, localStorageClient } = useGlobals();
  const history = useHistory();

  const onLogoutClicked = (): void => {
    everypageClient.logout_user().then((): void => {
      localStorageClient.clear();
      history.navigate('/');
    });
  }

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          everypage
        </Typography>
        <Button
          variant='outlined'
          onClick={onLogoutClicked}
        >Log out</Button>
      </Toolbar>
    </AppBar>
  );
}
