import React from 'react';

import { KibaException } from '@kibalabs/core';
import { useHistory, useInitialization, useIntegerUrlQueryState } from '@kibalabs/core-react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { Button, ResponsiveContainingView, ContainingView, Text, SingleLineInput, Box, Stack, Direction, PaddingSize, Alignment, Form, TextAlignment, InputType } from "@kibalabs/ui-react";

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { Account, Template } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

export const CreateSitePage = (): React.ReactElement => {
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
    everypageClient.retrieveAccounts().then((receivedAccounts: Account[]) => {
      setAccounts(receivedAccounts);
      if (!selectedAccountId) {
        setSelectedAccountId(receivedAccounts[0].accountId);
      }
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAccounts(null);
    });
  };

  const onCreateSiteClicked = (): void => {
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

  const onSlugChanged = (value: string): void => {
    setSlug(value);
    setSlugError(undefined);
  };

  const onNameChanged = (value: string): void => {
    setName(value);
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
  // event: React.SyntheticEvent<HTMLDivElement>
  const onTemplateChoiceClicked = (): void => {
    // event.preventDefault();
    setIsTemplateChooserOpen(true);
  };

  const onChooseTemplateClicked = (clickedTemplate: Template) => {
    setTemplate(clickedTemplate);
    setIsTemplateChooserOpen(false);
  };

  return (
    <ContainingView>
    <ResponsiveContainingView size={12} sizeResponsive={{small: 12, medium: 8, large: 5}}>
      <NavigationBar />
      <Stack direction={Direction.Vertical} paddingVertical={PaddingSize.Wide2} isFullHeight={true}>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
        <Box variant='card'>
        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
          <Stack.Item alignment={Alignment.Center} gutterAfter={PaddingSize.Wide2}>
            <Text tag='h1' variant='header5'>Create a new site</Text>
          </Stack.Item>
          {accounts === null ? (
            <Text tag='p'>
              {'An error occurred. Please try again later.'}
            </Text>
          ) : (
            <Form isLoading={isLoading || accounts === undefined}  onFormSubmitted={onCreateSiteClicked}>
              <Stack direction={Direction.Vertical} shouldAddGutters={true} isFullWidth={true}>
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
                  {accounts?.map((account: Account, index: number): React.ReactElement => (
                    <MenuItem key={index} value={account.accountId}>{account.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <SingleLineInput
              id='slug'
              label='Site slug'
              name='slug'
              value={slug}
              onValueChanged={onSlugChanged}
              inputType={InputType.Text}
              inputWrapperVariant={slugError ? 'error' : ''}
              messageText={slugError}
              placeholderText='Site slug'
              />
              <Text variant='small' alignment={TextAlignment.Left}>
                {!slug ? 'This will be your everypage sub-domain e.g. hello.evrpg.com' : `Your everypage sub-domain will be ${slug}.evrpg.com`}
              </Text>
              <SingleLineInput
              id='name'
              label='Site name'
              name='name'
              value={name}
              onValueChanged={onNameChanged}
              inputType={InputType.Text}
              inputWrapperVariant={nameError ? 'error' : ''}
              messageText={nameError}
              placeholderText='Site name'
              />
              <SingleLineInput
              id='template'
              label='Site template'
              name='template'
              value={template ? template.name : 'Blank'}
              inputType={InputType.Text}
              onClick={onTemplateChoiceClicked}
              placeholderText='Site template'
              />
              <Stack.Item alignment={Alignment.Center} gutterBefore={PaddingSize.Wide} gutterAfter={PaddingSize.Wide}>
              <Button
                buttonType='submit'
                isFullWidth={true}
                variant='primary'
                text='Create Site'
              />
              </Stack.Item>
              </Stack>
            </Form>
          )}
          </Stack>
        </Box>
        <Stack.Item growthFactor={1} shrinkFactor={1} />
        </Stack>
      {accounts && <AccountUpgradeDialog isOpen={isAccountUpgradePopupShowing} account={accounts.filter((account: Account): boolean => account.accountId === selectedAccountId).shift()} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />}
      <TemplateChooserModal isOpen={isTemplateChooserOpen} onChooseTemplateClicked={onChooseTemplateClicked} />
    </ResponsiveContainingView>
    </ContainingView>
  );
};
