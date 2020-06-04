import React from 'react';
import { useInitialization, useHistory } from '@kibalabs/core-react';
import { KibaException } from '@kibalabs/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';

import { Account, Site } from '../everypageClient/resources';
import { NavigationBar } from '../components/navigationBar';
import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    marginTop: theme.spacing(12),
  },
  accountBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: theme.spacing(2, 4),
    marginBottom: theme.spacing(4),
  },
  siteCardGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  accountName: {
    marginRight: theme.spacing(1),
    display: 'inline',
  },
  accountType: {
    marginRight: theme.spacing(4),
    display: 'inline',
    fontSize: '1em',
  },
  siteCardButtonBase: {
    width: '100%',
  },
  siteCardContent: {
    width: '100%',
  },
  siteNameText: {
    fontWeight: 'bold',
  },
}));

export const HomePage = (): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { everypageClient } = useGlobals();
  const [accounts, setAccounts] = React.useState<Account[] | null | undefined>(undefined);
  const [accountSites, setAccountSites] = React.useState<Record<number, Site[]> | undefined>(undefined);

  useInitialization((): void => {
    loadAccounts();
  });

  React.useEffect((): void => {
    if (accounts) {
      loadAccountSites();
    }
  }, [accounts]);

  const loadAccounts = (): void => {
    everypageClient.retrieve_accounts().then((accounts: Account[]) => {
      setAccounts(accounts);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setAccounts(null);
    });
  }

  const loadAccountSites = (): void => {
    const promises = accounts.map((account: Account): Promise<Site[]> => {
      return everypageClient.retrieve_sites_for_account(account.accountId);
    });
    Promise.all(promises).then((responses: Site[][]): void => {
      const accountSites = accounts.reduce((currentMap: Record<number, Site[]>,  account: Account): Record<number, Site[]> => {
        currentMap[account.accountId] = [];
        return currentMap;
      }, {});
      responses.forEach((sites: Site[]): void => {
        sites.forEach((site: Site): void => {
          accountSites[site.accountId].push(site);
        });
      });
      setAccountSites(accountSites);
    });
  }

  const onSiteClicked = (site: Site): void => {
    history.navigate(`/sites/${site.slug}`);
  }

  const onCreateSiteClicked = (account: Account): void => {
    history.navigate(`/sites/create?accountId=${account.accountId}`);
  }

  console.log('accounts', accounts);
  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <Container maxWidth='lg'>
          {accounts === undefined || accountSites === undefined ? (
            <Typography component='p'>
              {'loading...'}
            </Typography>
          ) : accounts === null || accountSites === null ? (
            <Typography component='p'>
              {'An error occurred. Please try again later.'}
            </Typography>
          ) : (
            accounts.map((account: Account, index: number): React.ReactElement => (
              <Paper key={index} elevation={0} className={classes.accountBox}>
                <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                  <Typography variant='h5' className={classes.accountName}>
                    {account.name}
                  </Typography>
                  <Typography color='textSecondary' className={classes.accountType}>
                    ({account.accountType})
                  </Typography>
                  <Button color='primary' onClick={(): void => onCreateSiteClicked(account)}>Create site</Button>
                </Box>
                <Grid container spacing={2} className={classes.siteCardGrid}>
                  {accountSites[account.accountId].map((site: Site, innerIndex: number): React.ReactElement => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={innerIndex}>
                      <Card>
                        <ButtonBase className={classes.siteCardButtonBase} onClick={(): void => onSiteClicked(site)}>
                          <CardContent className={classes.siteCardContent}>
                            <Typography variant='h6' className={classes.siteNameText}>
                              {site.name}
                            </Typography>
                            <Typography color='textSecondary'>
                              {site.slug}
                            </Typography>
                          </CardContent>
                        </ButtonBase>
                      </Card>
                    </Grid>
                  ))}
                  {accountSites[account.accountId].length === 0 && (
                    <Grid item xs={12}>
                      <Typography color='textSecondary'>
                        {'No sites yet. Create one now!'}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            ))
          )}
        </Container>
      </main>
    </div>
  );
}
