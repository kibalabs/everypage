import React from 'react';


import { dateToString, KibaException } from '@kibalabs/core';
import { useHistory, useInitialization } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Direction, InputType, Link, PaddingSize, SingleLineInput, Spacing, Stack, Text } from '@kibalabs/ui-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Helmet from 'react-helmet';

import { AccountUpgradeDomainDialog } from '../components/accountUpgradeDomainDialog';
import { MessageDialog } from '../components/messageDialog';
import { NavigationBar } from '../components/navigationBar';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { IPlan } from '../consoleConfig';
import { Account, Site, SiteVersion, Template } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

export interface ISitePageProps {
  slug: string;
}

export const SitePage = (props: ISitePageProps): React.ReactElement => {
  // const classes = useStyles();
  const { everypageClient, authManager, consoleConfig } = useGlobals();
  const history = useHistory();
  const [site, setSite] = React.useState<Site | null | undefined>(undefined);
  const [account, setAccount] = React.useState<Account | null | undefined>(undefined);
  const [versions, setVersions] = React.useState<SiteVersion[] | undefined>(undefined);
  const [primaryVersionId, setPrimaryVersionId] = React.useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isAccountUpgradePopupShowing, setIsAccountUpgradePopupShowing] = React.useState<boolean>(false);
  const [isCustomDomainPanelShowing, setIsCustomDomainPanelShowing] = React.useState<boolean>(false);
  const [newCustomDomain, setNewCustomDomain] = React.useState<string | undefined>(undefined);
  const [newCustomDomainValue, setNewCustomDomainValue] = React.useState<string>('');
  const [newCustomDomainError, setNewCustomDomainError] = React.useState<string | undefined>(undefined);
  const [newCustomDomainApiError, setNewCustomDomainApiError] = React.useState<string | undefined>(undefined);
  const [isNewVersionPopupShowing, setIsNewVersionPopupShowing] = React.useState<boolean>(false);
  const [isTemplateChooserPopupShowing, setIsTemplateChooserPopupShowing] = React.useState<boolean>(false);
  const [newVersionDefaultName, setNewVersionDefaultName] = React.useState<string | null>(null);
  const [newVersionName, setNewVersionName] = React.useState<string | null>(null);
  const [archivingSiteVersionId, setArchivingSiteVersionId] = React.useState<number | null>(null);
  const [isArchivingSite, setIsArchivingSite] = React.useState<boolean>(false);

  const loadAccount = React.useCallback((): void => {
    everypageClient.getAccount(Number(site.accountId)).then((receivedAccount: Account) => {
      setAccount(receivedAccount);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAccount(null);
    });
  }, [everypageClient, site]);

  const loadSite = React.useCallback((): void => {
    everypageClient.getSiteBySlug(props.slug).then((receivedSite: Site) => {
      setSite(receivedSite);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSite(null);
    });
  }, [everypageClient, props.slug]);

  const loadVersions = React.useCallback((): void => {
    everypageClient.listSiteVersions(site.siteId).then((siteVersions: SiteVersion[]) => {
      setVersions(siteVersions.reverse());
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setVersions([]);
    });
  }, [everypageClient, site]);

  const loadPrimaryVersion = React.useCallback((): void => {
    everypageClient.getSitePrimaryVersion(site.siteId).then((siteVersion: SiteVersion) => {
      setPrimaryVersionId(siteVersion.siteVersionId);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setPrimaryVersionId(undefined);
    });
  }, [everypageClient, site]);

  const loadNewVersionDefaultName = React.useCallback((): void => {
    everypageClient.retrieveNextVersionName(site.siteId).then((nextVersionName: string) => {
      setNewVersionDefaultName(nextVersionName);
    }).catch((error: KibaException): void => {
      console.error('error', error);
    });
  }, [everypageClient, site]);

  const getSiteUrl = (): string => {
    return site.customDomain ? `https://${site.customDomain}` : `https://${site.slug}.evrpg.com`;
  };

  const onSetPrimaryClicked = (version: SiteVersion): void => {
    setIsLoading(true);
    everypageClient.promoteSiteVersion(site.siteId, version.siteVersionId).then((): void => {
      setVersions(undefined);
      setPrimaryVersionId(undefined);
      loadSite();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  };

  const onArchiveClicked = (version: SiteVersion): void => {
    setArchivingSiteVersionId(version.siteVersionId);
  };

  const onArchiveSiteVersionConfirmClicked = (): void => {
    everypageClient.archiveSiteVersion(site.siteId, archivingSiteVersionId).then((): void => {
      setVersions(undefined);
      loadSite();
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
    setArchivingSiteVersionId(null);
  };

  const onArchiveSiteVersionCancelClicked = (): void => {
    setArchivingSiteVersionId(null);
  };

  const onCreateNewVersionClicked = (): void => {
    loadNewVersionDefaultName();
    setIsNewVersionPopupShowing(true);
  };

  const onCreateFromTemplateClicked = (): void => {
    setIsNewVersionPopupShowing(false);
    setIsTemplateChooserPopupShowing(true);
  };

  const onNewVersionPopupCloseClicked = (): void => {
    setIsNewVersionPopupShowing(false);
  };

  const onNewVersionNameChanged = (value: string): void => {
    setNewVersionName(value);
  };

  const onClonePrimaryClicked = (): void => {
    setIsNewVersionPopupShowing(false);
    setIsLoading(true);
    everypageClient.cloneSiteVersion(site.siteId, primaryVersionId, newVersionName).then((): void => {
      loadVersions();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  };

  const onChooseTemplateClicked = (template: Template) => {
    setIsTemplateChooserPopupShowing(false);
    setIsLoading(true);
    everypageClient.createSiteVersion(site.siteId, undefined, undefined, newVersionName, template.templateId).then((): void => {
      loadVersions();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  };

  const onSetCustomDomainClicked = (): void => {
    const accountPlan = consoleConfig.plans.filter((plan: IPlan): boolean => plan.code === account.accountType).shift();
    if (!accountPlan.hasCustomDomain) {
      setIsAccountUpgradePopupShowing(true);
    } else {
      setIsCustomDomainPanelShowing(true);
    }
  };

  const onNewCustomDomainValueChanged = (value: string): void => {
    setNewCustomDomainValue(value);
    setNewCustomDomainError(undefined);
  };

  const onCustomDomainNextClicked = (): void => {
    if (!/^[A-Za-z0-9-.]*\.[A-Za-z0-9-]+/.test(newCustomDomainValue)) {
      setNewCustomDomainError('This doesn\'t look like a valid domain. It must only contain letters, numbers and hyphens. e.g. everysize.kibalabs.com, www.kiba.dev');
      return;
    }
    if (newCustomDomainValue.endsWith('.evrpg.com')) {
      setNewCustomDomainError(`Your site is already hosted at ${site.slug}.evrpg.com. Please enter a domain you own to point it to this site.`);
      return;
    }
    setNewCustomDomain(newCustomDomainValue);
  };

  const onCustomDomainSetClicked = (): void => {
    everypageClient.updateDomainForSite(site.siteId, newCustomDomainValue).then((receivedSite: Site) => {
      setSite(receivedSite);
      setIsCustomDomainPanelShowing(false);
      setNewCustomDomain(undefined);
      setNewCustomDomainValue('');
      setNewCustomDomainError(undefined);
      setNewCustomDomainApiError(undefined);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setNewCustomDomainApiError(error.message);
    });
  };

  const onSiteStatusClicked = (): void => {
    everypageClient.updateDomainForSite(site.siteId, site.customDomain).then((receivedSite: Site) => {
      setSite(receivedSite);
      setIsCustomDomainPanelShowing(false);
      setNewCustomDomain(undefined);
      setNewCustomDomainValue('');
      setNewCustomDomainError(undefined);
      setNewCustomDomainApiError(undefined);
    }).catch((error: KibaException): void => {
      console.error('error', error);
    });
  };

  const onAccountUpgradePopupCloseClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
  };

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    history.navigate(`/accounts/${account.accountId}#plan`);
    setIsAccountUpgradePopupShowing(false);
  };

  const onRemoveBrandingClicked = (): void => {
    history.navigate(`/accounts/${account.accountId}#plan`);
  };

  const onArchiveSiteClicked = (): void => {
    setIsArchivingSite(true);
  };

  const onArchiveSiteConfirmClicked = (): void => {
    everypageClient.archiveSite(site.siteId).then((): void => {
      history.navigate('/');
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  };

  const onArchiveSiteCancelClicked = (): void => {
    setIsArchivingSite(false);
  };

  useInitialization((): void => {
    loadSite();
  });

  React.useEffect((): React.EffectCallback => {
    if (site) {
      loadAccount();
      loadVersions();
      loadPrimaryVersion();
      loadNewVersionDefaultName();

      // If its publishing, keep reloading the site until its done
      if (site.isPublishing) {
        const intervalId = setInterval((): void => {
          everypageClient.getSiteBySlug(site.slug).then((receivedSite: Site) => {
            if (!receivedSite.isPublishing) {
              clearInterval(intervalId);
              loadSite();
            }
          });
        }, 5000);
        return (): void => clearInterval(intervalId);
      }
    }
    return null;
  }, [everypageClient, site, loadAccount, loadNewVersionDefaultName, loadPrimaryVersion, loadSite, loadVersions]);

  return (
    <React.Fragment>
      <NavigationBar />
      <Helmet>
        <title>
          {site ? site.name : 'Site page'}
          {' '}
| Everypage Console
        </title>
      </Helmet>
      <ContainingView>
        <Stack direction={Direction.Vertical} paddingTop={PaddingSize.Wide4} paddingBottom={PaddingSize.Wide2} isScrollableHorizontally={false}>
          {site === null ? (
            <Text>Site not found</Text>
          ) : isLoading || site === undefined || versions === undefined || primaryVersionId === undefined || account === undefined ? (
            <Text>Loading...</Text>
          ) : site.archiveDate ? (
            <Text>This site has been archived 📦. Please contact us if you want it to be restored.</Text>
          ) : (
            <React.Fragment>
              <Box variant='card' isFullWidth={false}>
                <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
                  <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} shouldAddGutters={true}>
                    <Text variant='header2'>{site.name}</Text>
                    <Stack.Item growthFactor={1} shrinkFactor={1} />
                    <Button onClicked={onArchiveSiteClicked} variant='destructive' text='Archive' />
                  </Stack>
                  <Spacing />
                  <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} shouldAddGutters={true}>
                    <Text variant='light'>Site slug:</Text>
                    <Text>{site.slug}</Text>
                  </Stack>
                  <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} shouldAddGutters={true}>
                    <Text variant='light'>Status:</Text>
                    <Text>{site.isPublishing ? 'Publishing new version' : 'Ready'}</Text>
                  </Stack>
                  {!isCustomDomainPanelShowing && (
                    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
                      <Text variant='light'>Url:</Text>
                      <Link target={getSiteUrl()} text={getSiteUrl()} />
                      {!site.customDomain && <Button onClicked={onSetCustomDomainClicked} text='Customize' /> }
                      {site.customDomain && site.customDomainStatus !== 'completed' && <Button onClicked={onSiteStatusClicked} text={site.customDomainStatus} /> }
                    </Stack>
                  )}
                  {isCustomDomainPanelShowing && (
                    <Box variant='bordered'>
                      <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start} childAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
                        <Text variant='strong'>Custom domain set up</Text>
                        {!newCustomDomain && (
                          <React.Fragment>
                            <Text>What domain would you like for this site?</Text>
                            <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
                              <SingleLineInput
                                name='domain'
                                inputType={InputType.Url}
                                id='domain'
                                value={newCustomDomainValue}
                                onValueChanged={onNewCustomDomainValueChanged}
                                inputWrapperVariant={newCustomDomainError}
                                messageText={newCustomDomainError}
                              />
                              <Button
                                variant='primary'
                                isFullWidth={false}
                                onClicked={onCustomDomainNextClicked}
                                text='Next'
                              />
                            </Stack>
                          </React.Fragment>
                        )}
                        {newCustomDomain && (
                          <React.Fragment>
                            <Text>Great! Now please create the following DNS CNAME record with your hosting provider:</Text>
                            <Text>{`${newCustomDomain} ➡️ ${site.slug}.int.evrpg.com`}</Text>
                            {newCustomDomainApiError && (
                              <Text variant='error'>Something went wrong on our side. Please try again later or contact support.</Text>
                            )}
                            <Text variant='note'>
                              It can take up to 1 hour for this to work. If it has taken longer, please get in touch with us because something might have failed!
                              <br />
                              Please message us if you need any help with this.
                            </Text>
                            <Button
                              variant='primary'
                              onClicked={onCustomDomainSetClicked}
                              text='Done'
                            />
                          </React.Fragment>
                        )}
                      </Stack>
                    </Box>
                  )}
                  {(account.accountType === 'core' || account.accountType === 'starter') && (
                    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
                      <Text variant='light'>Branding: Made with everypage</Text>
                      {!site.customDomain && <Button onClicked={onRemoveBrandingClicked} text='Upgrade to remove' /> }
                    </Stack>
                  )}
                </Stack>
              </Box>
              <Box variant='card' isFullWidth={false}>
                <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide1}>
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Start}>
                    <Text variant='header3'>Site Versions</Text>
                    {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && <Button onClicked={onCreateNewVersionClicked} text='Create new version' />}
                  </Stack>
                  { versions && versions.map((version: SiteVersion, index: number): React.ReactElement => {
                    return version.archiveDate ? null : (
                      <Stack key={index} direction={Direction.Vertical} contentAlignment={Alignment.Start}>
                        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
                          <Text variant='default'>{version.name || 'Unnamed'}</Text>
                          {version.siteVersionId === primaryVersionId && <Text variant='note-small'>(PUBLISHED)</Text>}
                          {version.isPublishing && <Text variant='header6-note' tag='span'>Publishing</Text>}
                          {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && !version.publishDate && !version.isPublishing && <Button isEnabled={!site.isPublishing} onClicked={() => onSetPrimaryClicked(version)} text='Publish' />}
                          {version.publishDate && <Button target={`/sites/${props.slug}/preview/${version.siteVersionId}`} text='View' />}
                          {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && !version.publishDate && !version.isPublishing && <Button target={`/sites/${props.slug}/preview/${version.siteVersionId}`} text='Edit' />}
                          {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && version.siteVersionId !== primaryVersionId && <Button isEnabled={!site.isPublishing} onClicked={() => onArchiveClicked(version)} text='Archive' />}
                        </Stack>
                        {version.publishDate ? (
                          <Text variant='note'>{`Published: ${dateToString(version.publishDate, 'yyyy-MM-dd HH:mm')}`}</Text>
                        ) : (
                          <Text variant='note'>{`Last updated: ${dateToString(version.lastUpdateDate, 'yyyy-MM-dd HH:mm')}`}</Text>
                        )}
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </React.Fragment>
          )}
        </Stack>
      </ContainingView>
      <AccountUpgradeDomainDialog
        isOpen={isAccountUpgradePopupShowing}
        onCloseClicked={onAccountUpgradePopupCloseClicked}
        onUpgradeClicked={onAccountUpgradePopupUpgradeClicked}
      />
      <Dialog
        open={isNewVersionPopupShowing}
        onClose={onNewVersionPopupCloseClicked}
      >
        <DialogTitle>Create new version</DialogTitle>
        <DialogContent>
          <SingleLineInput
            name='name'
            label={newVersionName ? 'Name' : `Name (default: ${newVersionDefaultName})`}
            placeholderText={newVersionDefaultName}
            value={newVersionName}
            onValueChanged={onNewVersionNameChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='primary' onClicked={onCreateFromTemplateClicked} text='Choose Template' />
          <Button variant='primary' onClicked={onClonePrimaryClicked} text='Clone Published' />
        </DialogActions>
        <DialogActions>
          <Button onClicked={onNewVersionPopupCloseClicked} text='Cancel' />
        </DialogActions>
      </Dialog>
      <TemplateChooserModal
        isOpen={isTemplateChooserPopupShowing}
        onChooseTemplateClicked={onChooseTemplateClicked}
      />
      <MessageDialog
        isOpen={archivingSiteVersionId !== null}
        onConfirmClicked={onArchiveSiteVersionConfirmClicked}
        onCloseClicked={onArchiveSiteVersionCancelClicked}
        title={'Archive this version?'}
        message={'Once you archive a version it will be unreachable through the console. If you want to retrieve it, you will need to contact us directly.'}
      />
      <MessageDialog
        isOpen={isArchivingSite}
        onConfirmClicked={onArchiveSiteConfirmClicked}
        onCloseClicked={onArchiveSiteCancelClicked}
        title={'Archive this site?'}
        message={'Once you archive this site it will no longer work for your visitors. You will not be able to undo this yourself - if you want to retrieve it, you will need to contact us directly.'}
      />
    </React.Fragment>
  );
};
