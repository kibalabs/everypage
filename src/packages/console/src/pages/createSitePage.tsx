import React from 'react';

import { KibaException } from '@kibalabs/core';
import { useHistory, useInitialization, useIntegerUrlQueryState } from '@kibalabs/core-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { Account, Template } from '../everypageClient/resources';
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
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
  },
}));

export const CreateSitePage = (): React.ReactElement => {
  const classes = useStyles();
  const { everypageClient } = useGlobals();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedAccountId, setSelectedAccountId] = useIntegerUrlQueryState('accountId');
  const [selectedAccountIdError, setSelectedAccountIdError] = React.useState<string | undefined>(undefined);
  const [slug, setSlug] = React.useState<string>('');
  const [slugError, setSlugError] = React.useState<string | undefined>(undefined);
  const [name, setName] = React.useState<string>('');
  const [nameError, setNameError] = React.useState<string | undefined>(undefined);
  const [accounts, setAccounts] = React.useState<Account[] | null | undefined>(undefined);
  const [isAccountUpgradePopupShowing, setIsAccountUpgradePopupShowing] = React.useState<boolean>(false);
  const [isTemplateChooserOpen, setIsTemplateChooserOpen] = React.useState<boolean>(false);
  const [template, setTemplate] = React.useState<Template | null>(null);

  useInitialization((): void => {
    loadAccounts();
  });

  const loadAccounts = (): void => {
    everypageClient.retrieveAccounts().then((accounts: Account[]) => {
      setAccounts(accounts);
      if (!selectedAccountId) {
        setSelectedAccountId(accounts[0].accountId);
      }
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAccounts(null);
    });
  };

  const onCreateSiteClicked = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSlugError(undefined);
    setNameError(undefined);
    setSelectedAccountIdError(undefined);
    if (!selectedAccountId) {
      setSelectedAccountIdError('Please select an account to create this site in.');
      return;
    }
    if (!slug || slug.length < 3) {
      setSlugError('Please enter a valid slug. The site slug must be at least 3 characters long');
      return;
    }
    setIsLoading(true);
    everypageClient.createSite(selectedAccountId, slug, name || undefined, template ? template.templateId : null).then((): void => {
      history.navigate(`/sites/${slug}`);
    }).catch((error: KibaException): void => {
      if (error.message === 'SITE_LIMIT_REACHED_CORE') {
        setIsAccountUpgradePopupShowing(true);
        setSlugError('You have reached the site limit for your account. Please upgrade to add more.');
      } else if (error.statusCode && error.statusCode === 400) {
        setSlugError(error.message);
      } else {
        setSlugError('Something went wrong on our side. Please try again later.');
      }
      setIsLoading(false);
    });
  };

  const onSlugChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setSlug(event.target.value);
    setSlugError(undefined);
  };

  const onNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setName(event.target.value);
    setNameError(undefined);
  };

  const onAccountSelected = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setSelectedAccountId(event.target.value);
  };

  const onAccountUpgradePopupCloseClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
  };

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
    history.navigate(`/accounts/${selectedAccountId}#plan`);
  };

  const onTemplateChoiceClicked = (event: React.SyntheticEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsTemplateChooserOpen(true);
  };

  const onChooseTemplateClicked = (template: Template) => {
    setTemplate(template);
    setIsTemplateChooserOpen(false);
  };

  return (
    <div className={classes.root}>
      <NavigationBar />
      <Container component='main' maxWidth='sm' className={classes.content}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Create a new site
          </Typography>
          <Box m={0.5} />
          {isLoading || accounts === undefined ? (
            <CircularProgress />
          ) : accounts === null ? (
            <Typography component='p'>
              {'An error occurred. Please try again later.'}
            </Typography>
          ) : (
            <form className={classes.form} noValidate onSubmit={onCreateSiteClicked}>
              <FormControl
                variant='outlined'
                margin='normal'
                required
                fullWidth
              >
                <InputLabel id='account-select-label'>Account</InputLabel>
                <Select
                  labelId='account-select-label'
                  value={selectedAccountId}
                  onChange={onAccountSelected}
                  error={selectedAccountIdError !== undefined}
                  label='Account'
                  // helperText={selectedAccountIdError}
                >
                  {accounts.map((account: Account, index: number): React.ReactElement => (
                    <MenuItem key={index} value={account.accountId}>{account.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='slug'
                label='Site slug'
                name='slug'
                autoComplete='slug'
                autoFocus
                value={slug}
                onChange={onSlugChanged}
                error={slugError !== undefined}
                helperText={slugError}
              />
              <Typography variant='subtitle2'>
                {!slug ? 'This will be your everypage sub-domain e.g. hello.evrpg.com' : `Your everypage sub-domain will be ${slug}.evrpg.com`}
              </Typography>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='name'
                label='Site name'
                type='name'
                id='name'
                value={name}
                onChange={onNameChanged}
                error={nameError !== undefined}
                helperText={nameError}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='template'
                label='Site template'
                type='template'
                id='template'
                value={template ? template.name : 'Blank'}
                onClick={onTemplateChoiceClicked}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >Create Site</Button>
            </form>
          )}
        </Paper>
      </Container>
      {accounts && <AccountUpgradeDialog isOpen={isAccountUpgradePopupShowing} account={accounts.filter((account: Account): boolean => account.accountId === selectedAccountId).shift()} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />}
      <TemplateChooserModal isOpen={isTemplateChooserOpen} onChooseTemplateClicked={onChooseTemplateClicked} />
    </div>
  );
};
