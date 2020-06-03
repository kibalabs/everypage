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

import { Account, Site } from '../everypageClient/resources';
import { NavigationBar } from '../components/navigationBar';
import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  accountName: {
    marginRight: theme.spacing(2),
    display: 'inline',
  },
  siteCardGrid: {
    marginTop: theme.spacing(1),
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
  siteSlugText: {
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
      setAccountSites(responses.reduce((currentMap: Record<number, Site[]>, sites: Site[]): Record<number, Site[]> => {
        sites.forEach((site: Site): void => {
          currentMap[site.accountId] = site.accountId in currentMap ? currentMap[site.accountId].concat(site) : [site];
        });
        return currentMap;
      }, {}));
    });
  }

  const onSiteClicked = (site: Site): void => {
    history.navigate(`/sites/${site.slug}`);
  }

  const onCreateSiteClicked = (account: Account): void => {
    history.navigate(`/sites/create?accountId=${account.accountId}`);
  }

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <Container maxWidth='lg' className={classes.container}>
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
              <Box key={index} width={1} mt={8}>
                <Box width={1} display='flex' justifyContent='start' alignItems='center'>
                  <Typography variant='h5' className={classes.accountName}>
                    {account.name}
                  </Typography>
                  <Button color='primary' onClick={(): void => onCreateSiteClicked(account)}>Create new site</Button>
                </Box>
                <Grid container spacing={4} className={classes.siteCardGrid}>
                  {accountSites[account.accountId].map((site: Site, innerIndex: number): React.ReactElement => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={innerIndex}>
                      <Card>
                        <ButtonBase className={classes.siteCardButtonBase} onClick={(): void => onSiteClicked(site)}>
                          <CardContent className={classes.siteCardContent}>
                            <Typography variant='h6' className={classes.siteNameText}>
                              {site.name}
                            </Typography>
                            <Typography variant='subtitle2' className={classes.siteSlugText}>
                              {site.slug}
                            </Typography>
                          </CardContent>
                        </ButtonBase>
                      </Card>
                    </Grid>
                  ))}
                  {accountSites[account.accountId].length === 0 && (
                    <Typography variant='subtitle2' className={classes.siteSlugText}>
                      {'No sites yet. Create one now!'}
                    </Typography>
                  )}
                </Grid>
              </Box>
            ))
          )}
        </Container>
      </main>
    </div>
  );
}
