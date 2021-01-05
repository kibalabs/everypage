import React from 'react';

import { KibaException } from '@kibalabs/core';
import { useHistory, useInitialization } from '@kibalabs/core-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { SiteCard } from '../components/siteCard';
import { IPlan } from '../consoleConfig';
import { Account, Site } from '../everypageClient/resources';
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
}));

export const HomePage = (): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { everypageClient, authManager, consoleConfig } = useGlobals();
  const [accounts, setAccounts] = React.useState<Account[] | null | undefined>(undefined);
  const [accountSites, setAccountSites] = React.useState<Record<number, Site[]> | undefined>(undefined);
  const [accountUpgradePopupAccount, setAccountUpgradePopupAccount] = React.useState<Account | null>(null);

  const loadAccounts = React.useCallback((): void => {
    everypageClient.retrieveAccounts().then((receivedAccount: Account[]) => {
      setAccounts(receivedAccount);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAccounts(null);
    });
  }, [everypageClient]);

  const loadAccountSites = React.useCallback((): void => {
    const promises = accounts.map((account: Account): Promise<Site[]> => {
      return everypageClient.retrieveSitesForAccount(account.accountId);
    });
    Promise.all(promises).then((responses: Site[][]): void => {
      const updatedAccountSites = accounts.reduce((currentMap: Record<number, Site[]>, account: Account): Record<number, Site[]> => {
        // eslint-disable-next-line no-param-reassign
        currentMap[account.accountId] = [];
        return currentMap;
      }, {});
      responses.forEach((sites: Site[]): void => {
        sites.forEach((site: Site): void => {
          updatedAccountSites[site.accountId].push(site);
        });
      });
      setAccountSites(updatedAccountSites);
    });
  }, [everypageClient, accounts]);

  const onSiteClicked = (site: Site): void => {
    history.navigate(`/sites/${site.slug}`);
  };

  const onCreateSiteClicked = (account: Account): void => {
    const accountPlan = consoleConfig.plans.filter((plan: IPlan): boolean => plan.code === account.accountType).shift();
    if (accountPlan && accountSites[account.accountId].length >= accountPlan.siteLimit) {
      setAccountUpgradePopupAccount(account);
    } else {
      history.navigate(`/sites/create?accountId=${account.accountId}`);
    }
  };

  const onManageAccountClicked = (account: Account): void => {
    history.navigate(`/accounts/${account.accountId}`);
  };

  const onAccountUpgradePopupCloseClicked = (): void => {
    setAccountUpgradePopupAccount(null);
  };

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    history.navigate(`/accounts/${accountUpgradePopupAccount.accountId}#plan`);
    setAccountUpgradePopupAccount(null);
  };

  useInitialization((): void => {
    loadAccounts();
  });

  React.useEffect((): void => {
    if (accounts) {
      loadAccountSites();
    }
  }, [accounts, loadAccountSites]);

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
                    (
                    {account.accountType}
)
                  </Typography>
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-ed`) && <Button color='primary' onClick={(): void => onManageAccountClicked(account)}>Manage</Button>}
                  <Box flexGrow={1} />
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-adm`) && <Button color='primary' onClick={(): void => onCreateSiteClicked(account)}>Create site</Button>}
                </Box>
                <Grid container spacing={2} className={classes.siteCardGrid}>
                  {accountSites[account.accountId].map((site: Site, innerIndex: number): React.ReactElement => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={innerIndex}>
                      <SiteCard site={site} onSiteClicked={onSiteClicked} isEnabled={authManager.getHasJwtPermission(`st-${site.siteId}-vw`)} />
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
      {accountUpgradePopupAccount && <AccountUpgradeDialog isOpen={true} account={accountUpgradePopupAccount} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />}
    </div>
  );
};
