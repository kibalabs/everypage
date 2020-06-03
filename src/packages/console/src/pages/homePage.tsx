import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { NavigationBar } from '../components/navigationBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export const HomePage = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                {/* <Chart /> */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                {/* <Deposits /> */}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
