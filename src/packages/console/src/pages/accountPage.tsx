import React from 'react';
import { useInitialization, useHistory } from '@kibalabs/core-react';
import { KibaException } from '@kibalabs/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { Account, Site } from '../everypageClient/resources';
import { NavigationBar } from '../components/navigationBar';
import { useGlobals } from '../globalsContext';
import { SiteCard } from '../components/siteCard';
import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { IPlan } from '../consoleConfig';

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
  paper: {
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
  },
  accountType: {
  },
  paperTitle: {
    fontWeight: 'bold',
    display: 'inline',
    marginRight: theme.spacing(4),
  },
}));

export interface IAccountPageProps {
  accountId: string;
}

export const AccountPage = (props: IAccountPageProps): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { everypageClient, authManager, consoleConfig } = useGlobals();
  const [account, setAccount] = React.useState<Account | null | undefined>(undefined);
  const [accountSites, setAccountSites] = React.useState<Site[] | null | undefined>(undefined);
  const [isAccountUpgradePopupShowing, setIsAccountUpgradePopupShowing] = React.useState<boolean>(false);

  useInitialization((): void => {
    loadAccount();
    loadAccountSites();
  });

  const loadAccount = (): void => {
    everypageClient.get_account(Number(props.accountId)).then((account: Account) => {
      setAccount(account);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setAccount(null);
    });
  }

  const loadAccountSites = (): void => {
    everypageClient.retrieve_sites_for_account(Number(props.accountId)).then((sites: Site[]): void => {
      setAccountSites(sites);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setAccountSites(null);
    });
  }

  const onSiteClicked = (site: Site): void => {
    history.navigate(`/sites/${site.slug}`);
  }

  const onCreateSiteClicked = (): void => {
    const accountPlan = consoleConfig.plans.filter((plan: IPlan): boolean => plan.code == account.accountType).shift();
    if (accountPlan && accountSites.length >= accountPlan.siteLimit) {
      setIsAccountUpgradePopupShowing(true);
    } else {
      history.navigate(`/sites/create?accountId=${account.accountId}`);
    }
  }

  const onAccountUpgradePopupCloseClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
  }

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
    history.navigate(`/accounts/${account.accountId}#plan`);
  }

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <Container maxWidth='lg'>
          {account === undefined || accountSites === undefined ? (
            <Typography component='p'>
              {'loading...'}
            </Typography>
          ) : account === null || accountSites === null ? (
            <Typography component='p'>
              {'An error occurred. Please try again later.'}
            </Typography>
          ) : (
            <React.Fragment>
              <Paper elevation={0} className={classes.paper}>
                <Typography variant='h5' className={classes.accountName}>
                  {account.name}
                </Typography>
                <Typography className={classes.accountType}>
                  Account type: {account.accountType}
                </Typography>
              </Paper>
              <Paper elevation={0} className={classes.paper}>
                <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                  <Typography variant='h6' className={classes.paperTitle}>Sites</Typography>
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-adm`) && <Button color='primary' onClick={onCreateSiteClicked}>Create site</Button>}
                </Box>
                <Typography>{`${accountSites.length} sites`}</Typography>
                <Grid container spacing={2} className={classes.siteCardGrid}>
                  {accountSites.map((site: Site, innerIndex: number): React.ReactElement => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={innerIndex}>
                      <SiteCard site={site} onSiteClicked={onSiteClicked} isEnabled={authManager.getHasJwtPermission(`st-${site.siteId}-vw`)}/>
                    </Grid>
                  ))}
                  {accountSites.length === 0 && (
                    <Grid item xs={12}>
                      <Typography color='textSecondary'>
                        {'No sites yet. Create one now!'}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </React.Fragment>
          )}
        </Container>
      </main>
      {account && <AccountUpgradeDialog isOpen={isAccountUpgradePopupShowing} account={account} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />}
    </div>
  );
}
