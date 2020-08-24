import React from 'react';
import { useInitialization, useHistory } from '@kibalabs/core-react';
import { KibaException, dateToString } from '@kibalabs/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Template } from '../everypageClient/resources';
import { Site, SiteVersion, Account } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';
import { NavigationBar } from '../components/navigationBar';
import { AccountUpgradeDomainDialog } from '../components/accountUpgradeDomainDialog';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { MessageDialog } from '../components/messageDialog';

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
    marginTop: theme.spacing(2),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  versionDate: {
    fontSize: '1em',
  },
  versionPrimaryLabel: {
    fontSize: '0.9em',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  versionButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  versionNameLabel: {
    marginRight: theme.spacing(2),
  },
  siteNameText: {
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
  customDomainBox: {
    border: '1px solid #ccc',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  }
}));

export interface ISitePageProps {
  slug: string;
}

export const SitePage = (props: ISitePageProps): React.ReactElement => {
  const classes = useStyles();
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

  useInitialization((): void => {
    loadSite();
  });

  React.useEffect((): void => {
    if (site) {
      loadAccount();
      loadVersions();
      loadPrimaryVersion();
      loadNewVersionDefaultName();
    }
  }, [site]);

  const loadAccount = (): void => {
    everypageClient.get_account(Number(site.accountId)).then((account: Account) => {
      setAccount(account);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAccount(null);
    });
  }

  const loadSite = (): void => {
    everypageClient.get_site_by_slug(props.slug).then((site: Site) => {
      setSite(site);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setSite(null);
    });
  }

  const loadVersions = (): void => {
    everypageClient.list_site_versions(site.siteId).then((siteVersions: SiteVersion[]) => {
      setVersions(siteVersions.reverse());
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setVersions([]);
    });
  }

  const loadPrimaryVersion = (): void => {
    everypageClient.get_site_primary_version(site.siteId).then((siteVersion: SiteVersion) => {
      setPrimaryVersionId(siteVersion.siteVersionId);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setPrimaryVersionId(undefined);
    });
  }

  const loadNewVersionDefaultName = (): void => {
    everypageClient.retrieve_next_version_name(site.siteId).then((nextVersionName: string) => {
      setNewVersionDefaultName(nextVersionName);
    }).catch((error: KibaException): void => {
      console.error('error', error);
    });
  }

  const getSiteUrl = (): string => {
    return site.customDomain ? `https://${site.customDomain}` : `https://${site.slug}.evrpg.com`;
  }

  const onSetPrimaryClicked = (version: SiteVersion): void => {
    setIsLoading(true);
    everypageClient.promote_site_version(site.siteId, version.siteVersionId).then((): void => {
      setVersions(undefined);
      setPrimaryVersionId(undefined);
      loadSite();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  }

  const onArchiveClicked = (version: SiteVersion): void => {
    setArchivingSiteVersionId(version.siteVersionId);
  }

  const onArchiveSiteVersionConfirmClicked = (): void => {
    everypageClient.archive_site_version(site.siteId, archivingSiteVersionId).then((): void => {
      setVersions(undefined);
      loadSite();
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
    setArchivingSiteVersionId(null);
  }

  const onArchiveSiteVersionCancelClicked = (): void => {
    setArchivingSiteVersionId(null);
  }

  const onCreateNewVersionClicked = (): void => {
    loadNewVersionDefaultName();
    setIsNewVersionPopupShowing(true);
  }

  const onCreateFromTemplateClicked = (): void => {
    setIsNewVersionPopupShowing(false);
    setIsTemplateChooserPopupShowing(true);
  }

  const onNewVersionPopupCloseClicked = (): void => {
    setIsNewVersionPopupShowing(false);
  }

  const onNewVersionNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNewVersionName(event.target.value);
  }

  const onClonePrimaryClicked = (): void => {
    setIsNewVersionPopupShowing(false);
    setIsLoading(true);
    everypageClient.clone_site_version(site.siteId, primaryVersionId, newVersionName).then((): void => {
      loadVersions();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  }

  const onChooseTemplateClicked = (template: Template) => {
    setIsTemplateChooserPopupShowing(false);
    setIsLoading(true);
    everypageClient.create_site_version(site.siteId, undefined, undefined, newVersionName, template.templateId).then((): void => {
      loadVersions();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  };

  const onSetCustomDomainClicked = (): void => {
    const accountPlan = consoleConfig.plans.filter((plan: IPlan): boolean => plan.code == account.accountType).shift();
    if (!accountPlan.hasCustomDomain) {
      setIsAccountUpgradePopupShowing(true);
    } else {
      setIsCustomDomainPanelShowing(true);
    }
  }

  const onNewCustomDomainValueChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNewCustomDomainValue(event.target.value);
    setNewCustomDomainError(undefined);
  }

  const onCustomDomainNextClicked = (): void => {
    if (!/^[A-Za-z0-9-\.]*\.[A-Za-z0-9-]+/.test(newCustomDomainValue)) {
      setNewCustomDomainError('This doesn\'t look like a valid domain. It must only contain letters, numbers and hyphens. e.g. eversize.kibalabs.com, www.kiba.dev');
      return;
    }
    if (newCustomDomainValue.endsWith('.evrpg.com')) {
      setNewCustomDomainError(`Your site is already hosted at ${site.slug}.evrpg.com. Please enter a domain you own to point it to this site.`);
      return;
    }
    setNewCustomDomain(newCustomDomainValue);
  }

  const onCustomDomainSetClicked = (): void => {
    everypageClient.update_domain_for_site(site.siteId, newCustomDomainValue).then((site: Site) => {
      setSite(site);
      setIsCustomDomainPanelShowing(false);
      setNewCustomDomain(undefined);
      setNewCustomDomainValue('');
      setNewCustomDomainError(undefined);
      setNewCustomDomainApiError(undefined);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setNewCustomDomainApiError(error.message);
    });
  }

  const onSiteStatusClicked = (): void => {
    everypageClient.update_domain_for_site(site.siteId, site.customDomain).then((site: Site) => {
      setSite(site);
      setIsCustomDomainPanelShowing(false);
      setNewCustomDomain(undefined);
      setNewCustomDomainValue('');
      setNewCustomDomainError(undefined);
      setNewCustomDomainApiError(undefined);
    }).catch((error: KibaException): void => {
      console.error('error', error);
    });
  }

  const onAccountUpgradePopupCloseClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
  }

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    history.navigate(`/accounts/${account.accountId}#plan`);
    setIsAccountUpgradePopupShowing(false);
  }

  const onRemoveBrandingClicked = (): void => {
    history.navigate(`/accounts/${account.accountId}#plan`);
  }

  const onArchiveSiteClicked = (): void => {
    setIsArchivingSite(true);
  }

  const onArchiveSiteConfirmClicked = (): void => {
    everypageClient.archive_site(site.siteId).then((): void => {
      history.navigate('/');
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setIsLoading(false);
    });
  }

  const onArchiveSiteCancelClicked = (): void => {
    setIsArchivingSite(false);
  }

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <Container maxWidth='lg'>
          {site === null ? (
            <div>Site not found</div>
          ) : isLoading || site === undefined || versions === undefined || primaryVersionId === undefined || account === undefined ? (
            <div>Loading...</div>
          ) : (
            <React.Fragment>
              <Paper className={classes.paper}>
                <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                  <Typography variant='h6' className={classes.siteNameText}>{site.name}</Typography>
                  <Button href={getSiteUrl()} color='primary'>Open</Button>
                  <Box flexGrow={1} />
                  <Button onClick={onArchiveSiteClicked} color='secondary'>Archive</Button>
                </Box>
                <Typography color='textSecondary'>
                  Site slug: {site.slug}
                </Typography>
                <Typography color='textSecondary'>
                  Status: {site.isPublishing ? <Typography color='secondary' component='span'>Promoting new version</Typography> : 'Ready'}
                </Typography>
                {!isCustomDomainPanelShowing && (
                  <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                    <Typography color='textSecondary'>
                      Url: {getSiteUrl()}
                    </Typography>
                    {!site.customDomain && <Button onClick={onSetCustomDomainClicked} color='primary'>Customise</Button> }
                    {site.customDomain && site.customDomainStatus != 'completed' && <Button onClick={onSiteStatusClicked} color='secondary'>{site.customDomainStatus}</Button> }
                  </Box>
                )}
                {isCustomDomainPanelShowing && (
                  <Box width={1} display='flex' justifyContent='start' alignItems='start' flexDirection='column' className={classes.customDomainBox}>
                    <Typography color='textPrimary'>
                      <strong>Custom domain set up</strong>
                    </Typography>
                    <Box mt={2}/>
                    {!newCustomDomain && (
                      <React.Fragment>
                        <Typography color='textPrimary'>
                          What domain would you like to point to this site?
                        </Typography>
                        <TextField
                          autoFocus
                          variant='outlined'
                          margin='normal'
                          required
                          fullWidth
                          name='domain'
                          type='domain'
                          id='domain'
                          value={newCustomDomainValue}
                          onChange={onNewCustomDomainValueChanged}
                          error={newCustomDomainError !== undefined}
                          helperText={newCustomDomainError}
                        />
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={onCustomDomainNextClicked}
                        >Next</Button>
                      </React.Fragment>
                    )}
                    {newCustomDomain && (
                      <React.Fragment>
                        <Typography color='textPrimary'>
                          Great! Now please create the following DNS CNAME record with your hosting provider:
                        </Typography>
                        <Typography color='textSecondary' variant='caption'>
                        (just message us if you need help with this)
                        </Typography>
                        <Box width={1} display='flex' justifyContent='start' alignItems='baseline' mt={2} mb={2}>
                          <Typography color='textPrimary'>
                            {newCustomDomain}
                          </Typography>
                          <Typography color='textSecondary'>
                            {' ➡️ '}
                          </Typography>
                          <Typography color='textPrimary'>
                            {site.slug}.int.evrpg.com
                          </Typography>
                        </Box>
                        {newCustomDomainApiError && (
                          <Typography color='error'>
                            Something went wrong on our side. Please try again later or contact support.
                          </Typography>
                        )}
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={onCustomDomainSetClicked}
                        >Done</Button>
                        <Typography color='textSecondary' variant='caption'>
                          {'It can take up to 1 hour for this to work. If it\'s taken longer, please get in touch with us, something might have failed :('}
                        </Typography>
                      </React.Fragment>
                    )}
                  </Box>
                )}
                {(account.accountType === 'core' || account.accountType === 'starter') && (
                  <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                    <Typography color='textSecondary'>
                      Branding: Made with everypage
                    </Typography>
                    {!site.customDomain && <Button onClick={onRemoveBrandingClicked} color='primary'>Upgrade to remove</Button> }
                  </Box>
                )}
              </Paper>
              <Paper className={classes.paper}>
                <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                  <Typography variant='h6' className={classes.siteNameText}>Site Versions</Typography>
                  {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && <Button color='primary' onClick={onCreateNewVersionClicked}>Create new version</Button>}
                </Box>
                { versions && versions.map((version: SiteVersion, index: number): React.ReactElement => {
                  return version.archiveDate ? null : (
                    <Box key={index} mt={2}>
                      <Box display='flex' justifyContent='start' alignItems='baseline'>
                        <Typography variant='subtitle1' className={classes.versionNameLabel}>{version.name || 'Unnamed'}</Typography>
                        {version.siteVersionId === primaryVersionId && <Typography color='textSecondary' className={classes.versionPrimaryLabel}>(PRIMARY)</Typography>}
                        {version.isPublishing && <Typography color='secondary' component='span'>Promoting</Typography>}
                        {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && !version.publishDate && !version.isPublishing && <Button color='primary' disabled={site.isPublishing} className={classes.versionButton} onClick={() => onSetPrimaryClicked(version)}>Set primary</Button>}
                        {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && version.siteVersionId !== primaryVersionId && <Button color='primary' disabled={site.isPublishing} className={classes.versionButton} onClick={() => onArchiveClicked(version)}>ARCHIVE</Button>}
                        {authManager.getHasJwtPermission(`st-${site.siteId}-ed`) && !version.publishDate && !version.isPublishing && <Button color='primary' className={classes.versionButton}><Link href={`/sites/${props.slug}/preview/${version.siteVersionId}`}>EDIT</Link></Button>}
                        {version.publishDate && <Button color='primary' className={classes.versionButton}><Link href={`/sites/${props.slug}/preview/${version.siteVersionId}`}>VIEW</Link></Button>}
                      </Box>
                      {version.publishDate ? (
                        <Typography color='textSecondary' className={classes.versionDate}>Published: {dateToString(version.publishDate, 'yyyy-MM-dd HH:mm')}</Typography>
                      ) : (
                        <Typography color='textSecondary' className={classes.versionDate}>Last updated: {dateToString(version.lastUpdateDate, 'yyyy-MM-dd HH:mm')}</Typography>
                      )}
                    </Box>
                  );
                })}
              </Paper>
            </React.Fragment>
          )}
        </Container>
      </main>
      <AccountUpgradeDomainDialog isOpen={isAccountUpgradePopupShowing} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />
      <Dialog
        open={isNewVersionPopupShowing}
        onClose={onNewVersionPopupCloseClicked}
      >
        <DialogTitle>Create new version</DialogTitle>
        <DialogContent>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='name'
            label={newVersionName ? 'Name' : `Name (default: ${newVersionDefaultName})`}
            placeholder={newVersionDefaultName}
            value={newVersionName}
            onChange={onNewVersionNameChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained' onClick={onCreateFromTemplateClicked}>
            Choose Template
          </Button>
          <Button color='primary' variant='contained' onClick={onClonePrimaryClicked}>
            Clone primary
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={onNewVersionPopupCloseClicked}>
            Cancel
          </Button>
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
    </div>
  );
}
