import React from 'react';
import styled from 'styled-components';
import { Link, useInitialization } from '@kibalabs/core-react';
import { KibaException, dateToString } from '@kibalabs/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { Site, SiteVersion } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';
import { NavigationBar } from '../components/navigationBar';

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
  },
  versionEditButtonLabel: {
    fontSize: '1em',
  },
  versionNameLabel: {
    marginRight: theme.spacing(2),
  },
  siteNameText: {
    fontWeight: 'bold',
  },
}));

export interface ISitePageProps {
  slug: string;
}

export const SitePage = (props: ISitePageProps): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient } = useGlobals();
  const [site, setSite] = React.useState<Site | null | undefined>(undefined);
  const [versions, setVersions] = React.useState<SiteVersion[] | undefined>(undefined);
  const [primaryVersionId, setPrimaryVersionId] = React.useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useInitialization((): void => {
    loadSite();
  });

  React.useEffect((): void => {
    if (site) {
      loadVersions(site.siteId);
      loadPrimaryVersion(site.siteId);
    }
  }, [site]);

  const onSetPrimaryClicked = (version: SiteVersion): void => {
    setIsLoading(true);
    everypageClient.promote_site_version(site.siteId, version.siteVersionId).then((): void => {
      setVersions(undefined);
      setPrimaryVersionId(undefined);
      loadVersions(site.siteId);
      loadPrimaryVersion(site.siteId);
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setIsLoading(false);
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

  const loadVersions = (siteId: number): void => {
    everypageClient.list_site_versions(siteId).then((siteVersions: SiteVersion[]) => {
      setVersions(siteVersions);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setVersions([]);
    });
  }

  const loadPrimaryVersion = (siteId: number): void => {
    everypageClient.get_site_primary_version(siteId).then((siteVersion: SiteVersion) => {
      setPrimaryVersionId(siteVersion.siteVersionId);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setPrimaryVersionId(undefined);
    });
  }

  const getSiteUrl = (): string => {
    return site.customDomain ? `https://${site.customDomain}` : `https://${site.slug}.evrpg.com`;
  }

  const onCreateNewVersionClicked = (): void => {
    setIsLoading(true);
    everypageClient.clone_site_version(site.siteId, primaryVersionId).then((): void => {
      loadVersions(site.siteId);
      setIsLoading(false);
    }).catch((error: KibaException): void => {
      console.log('error', error);
      setIsLoading(false);
    });
  }

  return (
    <div className={classes.root}>
      <NavigationBar />
      <main className={classes.content}>
        <Container maxWidth='lg'>
          {isLoading || site === undefined || versions === undefined || primaryVersionId === undefined ? (
            <div>Loading...</div>
          ) : site === null ? (
            <div>Site not found</div>
          ) : (
            <React.Fragment>
              <Paper className={classes.paper}>
                <Typography variant='h6' className={classes.siteNameText}>
                  {site.name}
                </Typography>
                <Typography color='textSecondary'>
                  {site.slug}
                </Typography>
                <Typography color='textSecondary'>
                  <a href={getSiteUrl()}>{getSiteUrl()}</a>
                </Typography>
              </Paper>
              <Paper className={classes.paper}>
                <Typography variant='h6' className={classes.siteNameText}>Site Versions</Typography>
                { versions && versions.map((version: SiteVersion, index: number): React.ReactElement => {
                  return (
                    <Box key={index} mt={2}>
                      <Box display='flex' justifyContent='start' alignItems='baseline'>
                        <Typography variant='subtitle1' className={classes.versionNameLabel}>{version.name || 'Unnamed'}</Typography>
                        {version.siteVersionId === primaryVersionId && <Typography color='textSecondary' className={classes.versionPrimaryLabel}>(PRIMARY)</Typography>}
                        {!version.isArchived && !version.isPublished && <Button color='primary'><Link target={`/sites/${props.slug}/preview/${version.siteVersionId}`} text='EDIT' /></Button>}
                        {!version.isArchived && !version.isPublished && <Button color='primary' onClick={() => onSetPrimaryClicked(version)}>Set primary</Button>}
                      </Box>
                      <Typography color='textSecondary' className={classes.versionDate}>Last edited: {dateToString(version.creationDate, 'YYYY-MM-DD HH:mm')}</Typography>
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
    </div>
  );
}
