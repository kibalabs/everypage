import React from 'react';


import { KibaException } from '@kibalabs/core';
import { useInitialization, useIntegerUrlQueryState, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, Form, Head, IconButton, InputType, IOption, KibaIcon, OptionSelect, PaddingSize, ResponsiveContainingView, SingleLineInput, Stack, Text } from '@kibalabs/ui-react';
import styled from 'styled-components';

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { Account, Template } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

interface IStyledBox {
  bordered?: boolean;
}

const StyledBox = styled.div<IStyledBox>`
  border: ${(props: IStyledBox): string => (props.bordered ? '0.5px solid #e8e8e8' : 'none')};
  border-radius: ${(props: IStyledBox): string => (props.bordered ? '0.5em' : '')};
`;

StyledBox.defaultProps = {
  bordered: false,
};

export const CreateSitePage = (): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const navigator = useNavigator();
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
      navigator.navigateTo(`/sites/${slug}`);
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

  const onAccountSelected = (itemKey: string): void => {
    setSelectedAccountId(parseInt(itemKey, 10));
  };

  const onAccountUpgradePopupCloseClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
  };

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
    navigator.navigateTo(`/accounts/${selectedAccountId}#plan`);
  };
  const onTemplateChoiceClicked = (): void => {
    setIsTemplateChooserOpen(true);
  };

  const onTemplateChooserCloseClicked = (): void => {
    setIsTemplateChooserOpen(false);
  };

  const onChooseTemplateClicked = (clickedTemplate: Template) => {
    setTemplate(clickedTemplate);
    setIsTemplateChooserOpen(false);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Create Site | Everypage Console</title>
      </Head>
      <ResponsiveContainingView size={12} sizeResponsive={{ small: 12, medium: 8, large: 5 }}>
        <NavigationBar />
        <Stack direction={Direction.Vertical} paddingVertical={PaddingSize.Wide2} isFullHeight={true}>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
          <Box variant='card'>
            <Stack direction={Direction.Vertical} shouldAddGutters={true}>
              <Stack.Item alignment={Alignment.Center} gutterAfter={PaddingSize.Wide2}>
                <Text tag='h1' variant='header5'>Create a new site</Text>
              </Stack.Item>
              {accounts === null ? (
                <Text variant='note'>An error occurred. Please try again later.</Text>
              ) : (
                <Form isLoading={isLoading || accounts === undefined} onFormSubmitted={onCreateSiteClicked}>
                  <Stack direction={Direction.Vertical} shouldAddGutters={true} isFullWidth={true} defaultGutter={PaddingSize.Wide}>
                    <OptionSelect
                      selectedItemKey={String(selectedAccountId)}
                      inputWrapperVariant={selectedAccountIdError && 'error'}
                      messageText={selectedAccountIdError} onItemClicked={onAccountSelected}
                      options={(accounts || []).map((account: Account): IOption => ({
                        itemKey: String(account.accountId),
                        text: account.name,
                        textVariant: 'selectItemText',
                      }))}
                    />
                    <SingleLineInput
                      id='slug'
                      label='Site slug'
                      name='slug'
                      value={slug}
                      onValueChanged={onSlugChanged}
                      inputType={InputType.Text}
                      inputWrapperVariant={slugError ? 'error' : 'default'}
                      messageText={slugError || (!slug ? 'This will be your site\'s URL prefix e.g. hello.evrpg.com' : `Your site URL will be ${slug}.evrpg.com`)}
                      placeholderText='Site slug'
                    />
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
                    <StyledBox bordered>
                      <Stack direction={Direction.Horizontal} padding={PaddingSize.Narrow} paddingLeft={PaddingSize.Wide1}>
                        <Stack.Item alignment={Alignment.Center}>
                          <Text tag='h2'>{template ? template.name : 'Blank'}</Text>
                        </Stack.Item>
                        <Stack.Item growthFactor={1} shrinkFactor={1} />
                        <IconButton
                          variant='primary'
                          icon={<KibaIcon iconId='ion-pencil' />}
                          onClicked={onTemplateChoiceClicked}
                        />
                      </Stack>
                    </StyledBox>
                    <Stack.Item alignment={Alignment.Center} gutterBefore={PaddingSize.Wide} gutterAfter={PaddingSize.Wide}>
                      <Button
                        buttonType='submit'
                        isFullWidth={true}
                        variant='primary-padded'
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

        {accounts && (
          <AccountUpgradeDialog
            isOpen={isAccountUpgradePopupShowing}
            account={accounts.filter((account: Account): boolean => account.accountId === selectedAccountId).shift()}
            onCloseClicked={onAccountUpgradePopupCloseClicked}
            onUpgradeClicked={onAccountUpgradePopupUpgradeClicked}
          />
        )}

        <TemplateChooserModal
          isOpen={isTemplateChooserOpen}
          onChooseTemplateClicked={onChooseTemplateClicked}
          onCloseClicked={onTemplateChooserCloseClicked}
        />
      </ResponsiveContainingView>
    </React.Fragment>
  );
};
