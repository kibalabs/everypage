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

import { Site, SiteVersion, Account } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';
import { NavigationBar } from '../components/navigationBar';
import { AccountUpgradeDomainDialog } from '../components/accountUpgradeDomainDialog';

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
}));

export interface ISitePageProps {
  slug: string;
}

export const SitePage = (props: ISitePageProps): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient } = useGlobals();
  const history = useHistory();
  const [site, setSite] = React.useState<Site | null | undefined>(undefined);
  const [account, setAccount] = React.useState<Account | null | undefined>(undefined);
  const [versions, setVersions] = React.useState<SiteVersion[] | undefined>(undefined);
  const [primaryVersionId, setPrimaryVersionId] = React.useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isAccountUpgradePopupShowing, setIsAccountUpgradePopupShowing] = React.useState<boolean>(false);

  useInitialization((): void => {
    loadSite();
  });

  React.useEffect((): void => {
    if (site) {
      loadAccount();
      loadVersions();
      loadPrimaryVersion();
    }
  }, [site]);

  const loadAccount = (): void => {
    everypageClient.get_account(Number(site.accountId)).then((account: Account) => {
      setAccount(account);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setAccount(null);
    });
  }

  const loadSite = (): void => {
    everypageClient.get_site_by_slug(props.slug).then((site: Site) => {
      setSite(site);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setSite(null);
    });
  }

  const loadVersions = (): void => {
    everypageClient.list_site_versions(site.siteId).then((siteVersions: SiteVersion[]) => {
      setVersions(siteVersions);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setVersions([]);
    });
  }

  const loadPrimaryVersion = (): void => {
    everypageClient.get_site_primary_version(site.siteId).then((siteVersion: SiteVersion) => {
      setPrimaryVersionId(siteVersion.siteVersionId);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setPrimaryVersionId(undefined);
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
      loadVersions();
      loadPrimaryVersion();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setIsLoading(false);
    });
  }

  const onCreateNewVersionClicked = (): void => {
    setIsLoading(true);
    everypageClient.clone_site_version(site.siteId, primaryVersionId).then((): void => {
      loadVersions();
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setIsLoading(false);
    });
  }

  const onSetCustomDomainClicked = (): void => {
    if (account.accountType == 'core') {
      setIsAccountUpgradePopupShowing(true);
    } else {
      // TODO(krish): implement the flow
    }
  }

  const onAccountUpgradePopupCloseClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
  }

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    history.navigate(`/accounts/${account.accountId}#billing`);
    setIsAccountUpgradePopupShowing(false);
  }

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <Container maxWidth='lg'>
          {isLoading || site === undefined || versions === undefined || primaryVersionId === undefined || account === undefined ? (
            <div>Loading...</div>
          ) : site === null ? (
            <div>Site not found</div>
          ) : (
            <React.Fragment>
              <Paper className={classes.paper}>
                <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                  <Typography variant='h6' className={classes.siteNameText}>
                    {site.name}
                  </Typography>
                  <Button href={getSiteUrl()} color='primary'>Open</Button>
                </Box>
                <Typography color='textSecondary'>
                  Site slug: {site.slug}
                </Typography>
                <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                  <Typography color='textSecondary'>
                    Custom domain: {site.customDomain || 'not set'}
                  </Typography>
                  {!site.customDomain && <Button onClick={onSetCustomDomainClicked} color='primary'>Set custom domain</Button> }
                </Box>
                {(account.accountType === 'core' || account.accountType === 'starter') && (
                  <Typography color='textSecondary'>
                    <Link href={`/accounts/${account.accountId}#billing`}>Upgrade</Link> to remove everypage branding.
                  </Typography>
                )}
              </Paper>
              <Paper className={classes.paper}>
                <Typography variant='h6' className={classes.siteNameText}>Site Versions</Typography>
                { versions && versions.map((version: SiteVersion, index: number): React.ReactElement => {
                  return (
                    <Box key={index} mt={2}>
                      <Box display='flex' justifyContent='start' alignItems='baseline'>
                        <Typography variant='subtitle1' className={classes.versionNameLabel}>{version.name || 'Unnamed'}</Typography>
                        {version.siteVersionId === primaryVersionId && <Typography color='textSecondary' className={classes.versionPrimaryLabel}>(PRIMARY)</Typography>}
                        {!version.archiveDate && !version.publishDate && <Button color='primary'  className={classes.versionButton} onClick={() => onSetPrimaryClicked(version)}>Set primary</Button>}
                        {!version.archiveDate && !version.publishDate && <Button color='primary' className={classes.versionButton}><Link href={`/sites/${props.slug}/preview/${version.siteVersionId}`}>EDIT</Link></Button>}
                        {version.publishDate && <Button color='primary' className={classes.versionButton}><Link href={`/sites/${props.slug}/preview/${version.siteVersionId}`}>VIEW</Link></Button>}
                      </Box>
                      {version.archiveDate ? (
                        <Typography color='textSecondary' className={classes.versionDate}>Archived: {dateToString(version.archiveDate, 'YYYY-MM-DD HH:mm')}</Typography>
                      ) : version.publishDate ? (
                        <Typography color='textSecondary' className={classes.versionDate}>Published: {dateToString(version.publishDate, 'YYYY-MM-DD HH:mm')}</Typography>
                      ) : (
                        <Typography color='textSecondary' className={classes.versionDate}>Last updated: {dateToString(version.lastUpdateDate, 'YYYY-MM-DD HH:mm')}</Typography>
                      )}
                    </Box>
                  );
                })}
                <br />
                <br />
                <Button variant='contained' color='primary' onClick={onCreateNewVersionClicked}>Create new version</Button>
              </Paper>
            </React.Fragment>
          )}
        </Container>
      </main>
      <AccountUpgradeDomainDialog isOpen={isAccountUpgradePopupShowing} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />
    </div>
  );
}
