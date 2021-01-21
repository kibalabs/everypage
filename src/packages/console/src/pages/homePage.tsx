import React from 'react';


import { KibaException } from '@kibalabs/core';
import { useHistory, useInitialization } from '@kibalabs/core-react';
// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

import { Alignment, Box, Button, ContainingView, Direction, EqualGrid, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';
import Helmet from 'react-helmet';

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { SiteCard } from '../components/siteCard';
import { IPlan } from '../consoleConfig';
import { Account, Site } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     minHeight: '100%',
//   },
//   content: {
//     flexGrow: 1,
//     overflow: 'auto',
//     marginTop: theme.spacing(12),
//   },
//   accountBox: {
//     backgroundColor: 'rgba(255, 255, 255, 0.4)',
//     padding: theme.spacing(2, 4),
//     marginBottom: theme.spacing(4),
//   },
//   siteCardGrid: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
//   accountName: {
//     marginRight: theme.spacing(1),
//     display: 'inline',
//   },
//   accountType: {
//     marginRight: theme.spacing(4),
//     display: 'inline',
//     fontSize: '1em',
//   },
// }));

export const HomePage = (): React.ReactElement => {
  // const classes = useStyles();
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
    <React.Fragment>
      <NavigationBar />
      <Helmet>
        <title>Home | Everypage Console</title>
      </Helmet>
      <ContainingView>
        <Stack direction={Direction.Vertical} paddingTop={PaddingSize.Wide4} paddingBottom={PaddingSize.Wide2} isScrollableHorizontally={false}>
          {accounts === undefined || accountSites === undefined ? (
            <Text tag='p'>
              {'loading...'}
            </Text>
          ) : accounts === null || accountSites === null ? (
            <Text tag='p'>
              {'An error occurred. Please try again later.'}
            </Text>
          ) : (
            accounts.map((account: Account, index: number): React.ReactElement => (
              <Box variant='bordered'>
                {/* <Paper key={index} elevation={0} className={classes.accountBox}> */}
                {/* <Box width={1} display='flex' justifyContent='start' alignItems='baseline'> */}
                <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center}>
                  <Text variant='header5'>
                    {account.name}
                  </Text>
                  <Text variant='colored'>{`(${account.accountType})`}</Text>
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-ed`) && <Button onClicked={(): void => onManageAccountClicked(account)} text='Manage' />}
                  <Stack.Item growthFactor={1} shrinkFactor={1} />
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-adm`) && <Button onClicked={(): void => onCreateSiteClicked(account)} text='Create site' />}
                </Stack>
                {/* </Box> */}
                <Spacing variant={PaddingSize.Wide} />
                {accountSites[account.accountId].map((site: Site, innerIndex: number) => (
                  <EqualGrid contentAlignment={Alignment.Fill} shouldAddGutters={true}>
                    <SiteCard site={site} onSiteClicked={onSiteClicked} isEnabled={authManager.getHasJwtPermission(`st-${site.siteId}-vw`)} />
                  </EqualGrid>
                ))}
                {accountSites[account.accountId].length === 0 && (
                  <EqualGrid contentAlignment={Alignment.Start}>
                    <Text variant='header6-note'>
                      {'No sites yet. Create one now!'}
                    </Text>
                  </EqualGrid>
                )}
                {/* </Paper> */}
              </Box>
            ))
          )}
          {/* </Container> */}
        </Stack>
      </ContainingView>
      {accountUpgradePopupAccount && <AccountUpgradeDialog isOpen={true} account={accountUpgradePopupAccount} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />}
    </React.Fragment>
  );
};
