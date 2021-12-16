import React from 'react';


import { KibaException } from '@kibalabs/core';
import { useInitialization, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Direction, EqualGrid, Head, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { SiteCard } from '../components/siteCard';
import { IPlan } from '../consoleConfig';
import { Account, Site } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

export const HomePage = (): React.ReactElement => {
  const navigator = useNavigator();
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
    navigator.navigateTo(`/sites/${site.slug}`);
  };

  const onCreateSiteClicked = (account: Account): void => {
    const accountPlan = consoleConfig.plans.filter((plan: IPlan): boolean => plan.code === account.accountType).shift();
    if (accountPlan && accountSites[account.accountId].length >= accountPlan.siteLimit) {
      setAccountUpgradePopupAccount(account);
    } else {
      navigator.navigateTo(`/sites/create?accountId=${account.accountId}`);
    }
  };

  const onManageAccountClicked = (account: Account): void => {
    navigator.navigateTo(`/accounts/${account.accountId}`);
  };

  const onAccountUpgradePopupCloseClicked = (): void => {
    setAccountUpgradePopupAccount(null);
  };

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    navigator.navigateTo(`/accounts/${accountUpgradePopupAccount.accountId}#plan`);
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
      <Head>
        <title>Home | Everypage Console</title>
      </Head>
      <ContainingView>
        <Stack direction={Direction.Vertical} padding={PaddingSize.Default} shouldAddGutters={true}>
          <Spacing variant={PaddingSize.Wide3} />
          {accounts === undefined || accountSites === undefined ? (
            <Text>loading...</Text>
          ) : accounts === null || accountSites === null ? (
            <Text>An error occurred. Please try again later.</Text>
          ) : (
            accounts.map((account: Account, index: number): React.ReactElement => (
              <Box variant='bordered' isFullHeight={true} key={index}>
                <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
                  <Text variant='header5'>{account.name}</Text>
                  <Text variant='light'>{`(${account.accountType})`}</Text>
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-ed`) && <Button onClicked={(): void => onManageAccountClicked(account)} text='Manage' />}
                  <Stack.Item growthFactor={1} shrinkFactor={1} />
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-adm`) && <Button onClicked={(): void => onCreateSiteClicked(account)} text='Create site' />}
                </Stack>
                <Spacing variant={PaddingSize.Wide} />
                <EqualGrid childSizeResponsive={{ base: 12, small: 6, medium: 4, large: 3 }} contentAlignment={Alignment.Start} shouldAddGutters={true}>
                  {accountSites[account.accountId].map((site: Site) => (
                    <SiteCard key={site.siteId} site={site} onSiteClicked={onSiteClicked} isEnabled={authManager.getHasJwtPermission(`st-${site.siteId}-vw`)} />
                  ))}
                </EqualGrid>
                {accountSites[account.accountId].length === 0 && (
                  <Text variant='light'>No sites yet.</Text>
                )}
              </Box>
            ))
          )}
        </Stack>
      </ContainingView>

      {accountUpgradePopupAccount && (
        <AccountUpgradeDialog
          isOpen={true}
          account={accountUpgradePopupAccount}
          onCloseClicked={onAccountUpgradePopupCloseClicked}
          onUpgradeClicked={onAccountUpgradePopupUpgradeClicked}
        />
      )}
    </React.Fragment>
  );
};
