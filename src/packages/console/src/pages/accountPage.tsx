import React from 'react';

import { KibaException } from '@kibalabs/core';
import { useInitialization, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, Grid, PaddingSize, ResponsiveContainingView, Stack, Text } from '@kibalabs/ui-react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe, PaymentIntent, Stripe, StripeElements, StripeError } from '@stripe/stripe-js';
import Helmet from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { NewPlanDialog } from '../components/newPlanDialog';
import { SiteCard } from '../components/siteCard';
import { IPlan } from '../consoleConfig';
import { Account, Site, StripePortalSession, StripeSubscription } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

const stripePromise = loadStripe('pk_live_74pJIhvxX0m61Ub6NDjFiFBy00Q8aDg61J');
// const stripePromise = loadStripe('pk_test_51GqarKBhdc2gIBl2s6qZ2AUFhlRXQOE0l7y4dnUC5YUoKdLSpobrz3h4hFC3PJduu91lTvWJrPW6YwdrCzxExljh00YB1xWyma');

export interface IAccountPageProps {
  accountId: string;
}

export const AccountPage = (props: IAccountPageProps): React.ReactElement => {
  const navigator = useNavigator();
  const { everypageClient, authManager, consoleConfig } = useGlobals();
  const [account, setAccount] = React.useState<Account | null | undefined>(undefined);
  const [accountSites, setAccountSites] = React.useState<Site[] | null | undefined>(undefined);
  const [isAccountUpgradePopupShowing, setIsAccountUpgradePopupShowing] = React.useState<boolean>(false);
  const [newPlan, setNewPlan] = React.useState<IPlan | undefined>(undefined);
  const [upgradeCardError, setUpgradeCardError] = React.useState<string | undefined>(undefined);
  const [upgradeError, setUpgradeError] = React.useState<string | undefined>(undefined);
  const [isUpgradeDialogLoading, setIsUpgradeDialogLoading] = React.useState<boolean>(false);
  const [upgradeDiscountCode, setUpgradeDiscountCode] = React.useState<string | undefined>(undefined);
  const [upgradeDiscountCodeError, setUpgradeDiscountCodeError] = React.useState<string | undefined>(undefined);
  const currentPlan = account ? consoleConfig.plans.filter((plan: IPlan): boolean => plan.code === account.accountType).shift() : undefined;
  const nextPlan = currentPlan ? consoleConfig.plans[consoleConfig.plans.indexOf(currentPlan) + 1] : undefined;

  useInitialization((): void => {
    loadAccount();
    loadAccountSites();
  });

  const loadAccount = (): void => {
    everypageClient.getAccount(Number(props.accountId)).then((receivedAccount: Account) => {
      setAccount(receivedAccount);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAccount(null);
    });
  };

  const loadAccountSites = (): void => {
    everypageClient.retrieveSitesForAccount(Number(props.accountId)).then((sites: Site[]): void => {
      setAccountSites(sites);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      setAccountSites(null);
    });
  };

  const onSiteClicked = (site: Site): void => {
    navigator.navigateTo(`/sites/${site.slug}`);
  };

  const onCreateSiteClicked = (): void => {
    const accountPlan = consoleConfig.plans.filter((plan: IPlan): boolean => plan.code === account.accountType).shift();
    if (accountPlan && accountSites.length >= accountPlan.siteLimit) {
      setUpgradeError(undefined);
      setUpgradeCardError(undefined);
      setUpgradeDiscountCode('');
      setUpgradeDiscountCodeError(undefined);
      setIsAccountUpgradePopupShowing(true);
    } else {
      navigator.navigateTo(`/sites/create?accountId=${account.accountId}`);
    }
  };

  const onAccountUpgradePopupCloseClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
  };

  const onAccountUpgradePopupUpgradeClicked = (): void => {
    setIsAccountUpgradePopupShowing(false);
    navigator.navigateTo(`/accounts/${account.accountId}#plan`);
  };

  const onChangePlanClicked = (plan: IPlan): void => {
    if (plan.planIndex !== currentPlan.planIndex) {
      setNewPlan(plan);
    }
  };

  const onUpgradeDialogClosed = (): void => {
    setNewPlan(undefined);
  };

  const onUpgradeDiscountCodeChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUpgradeDiscountCode(event.target.value);
    setUpgradeDiscountCodeError(undefined);
  };

  const onUpgradeDialogUpgradeClicked = async (stripe: Stripe, elements: StripeElements): Promise<void> => {
    setUpgradeError(undefined);
    setUpgradeCardError(undefined);
    setUpgradeDiscountCodeError(undefined);
    const stripeCardElement = elements.getElement(CardElement);
    if (newPlan.planIndex > currentPlan.planIndex && currentPlan.code === 'core' && !stripeCardElement) {
      setUpgradeCardError('Please enter your card details');
      return;
    }
    setIsUpgradeDialogLoading(true);
    let callPromise: Promise<StripeSubscription>;
    let stripePaymentMethod = null;
    if (stripeCardElement) {
      stripePaymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: stripeCardElement,
      });
      if (stripePaymentMethod.error) {
        setUpgradeCardError(stripePaymentMethod.error.message);
        setIsUpgradeDialogLoading(false);
        return;
      }
      callPromise = everypageClient.createSubscriptionForAccount(account.accountId, newPlan.code, newPlan.priceCodeMonthly, stripePaymentMethod.paymentMethod.id, upgradeDiscountCode || undefined);
    } else {
      callPromise = everypageClient.changeSubscriptionForAccount(account.accountId, newPlan.code, newPlan.priceCodeMonthly, upgradeDiscountCode || undefined);
    }
    callPromise.then((stripeSubscription: StripeSubscription): void => {
      if (stripeSubscription.status === 'active' || stripeSubscription.status === 'canceled') {
        toast.success('Moved to new plan');
        loadAccount();
        setNewPlan(undefined);
      } else if (stripeSubscription.status === 'incomplete' && stripeSubscription.latestInvoicePaymentStatus === 'requires_action' && stripePaymentMethod) {
        stripe.confirmCardPayment(stripeSubscription.latestInvoicePaymentActionSecret, { payment_method: stripePaymentMethod.paymentMethod.id }).then((result: {paymentIntent?: PaymentIntent; error?: StripeError}): void => {
          if (result.error) {
            setUpgradeError(result.error.message);
          } else {
            toast.success(newPlan.planIndex > currentPlan.planIndex ? "Woo! you're upgraded 🚀" : 'Moved to new plan');
            loadAccount();
            setNewPlan(undefined);
          }
        });
      } else if (stripeSubscription.status === 'incomplete' && stripeSubscription.latestInvoicePaymentStatus === 'requires_payment_method' && stripePaymentMethod) {
        // TODO(krishan711): this is https://stripe.com/docs/billing/subscriptions/fixed-price?lang=python#manage-subscription-payment-failure, but not sure what to do with it!
        setUpgradeError('Something went wrong on our side. Please try use the "Manage with stripe" feature below.');
      } else {
        setUpgradeError('Something went wrong on our side. Please try use the "Manage with stripe" feature below.');
      }
      setIsUpgradeDialogLoading(false);
    }).catch((error: KibaException): void => {
      console.error('error', error);
      if (error.message.includes('Coupon not found')) {
        setUpgradeDiscountCodeError('This coupon is not valid anymore. If you really want one reach out to us on Twitter 😘');
      } else {
        setUpgradeError(error.message);
      }
      setIsUpgradeDialogLoading(false);
    });
  };

  const onManageWithStripeClicked = (): void => {
    everypageClient.createPortalSessionForAccount(account.accountId).then((stripePortalSession: StripePortalSession): void => {
      window.open(stripePortalSession.url, '_blank');
    }).catch((error: KibaException): void => {
      console.error('error', error);
      toast.error('Something went wrong. Please try again later');
    });
  };

  return (
    <Elements stripe={stripePromise}>
      <NavigationBar />
      <Helmet>
        <title>{`${account ? account.name : 'Account page'} | Everypage Console`}</title>
      </Helmet>
      <ResponsiveContainingView size={12}>
        <Stack direction={Direction.Vertical} isFullWidth={true} paddingTop={PaddingSize.Wide4} paddingBottom={PaddingSize.Wide2} isScrollableHorizontally={false}>
          {account === undefined || accountSites === undefined ? (
            <Text tag='p'>loading...</Text>
          ) : account === null || accountSites === null ? (
            <Text tag='p'>An error occurred. Please try again later.</Text>
          ) : (
            <React.Fragment>
              <Box variant='card'>
                <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
                  <Text variant='header5'>{account.name}</Text>
                  <Text>
                    {' You are currently on the '}
                    <Text variant='bold'>{currentPlan.name}</Text>
                    {' plan'}
                  </Text>
                  {nextPlan && (
                    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
                      <Button variant='small-secondary' onClicked={(): void => onChangePlanClicked(nextPlan)} text='Upgrade' />
                      <Text variant='note'> to </Text>
                      <Text variant='note-bold'>{nextPlan.name}</Text>
                      <Text variant='note'>{` to ${nextPlan.highlightFeature} and more 🚀`}</Text>
                    </Stack>
                  )}
                </Stack>
              </Box>
              <Box variant='card'>
                <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide} paddingBottom={PaddingSize.Default}>
                  <Text variant='header6'>Sites</Text>
                  {authManager.getHasJwtPermission(`acc-${account.accountId}-adm`) && (
                    <Button variant='default' onClicked={onCreateSiteClicked} text='Create site' />
                  )}
                  <Stack.Item growthFactor={1} shrinkFactor={1} />
                  <Text>{`${accountSites.length} sites`}</Text>
                </Stack>
                <Grid contentAlignment={Alignment.Start} shouldAddGutters={true} paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Wide}>
                  {accountSites.map((site: Site, innerIndex: number) => {
                    return (
                      <Grid.Item sizeResponsive={{ base: 12, small: 6, medium: 4, large: 3 }} key={innerIndex}>
                        <SiteCard site={site} onSiteClicked={onSiteClicked} isEnabled={authManager.getHasJwtPermission(`st-${site.siteId}-vw`)} />
                      </Grid.Item>
                    );
                  })}
                  {accountSites.length === 0 && (
                    <Grid.Item size={12}>
                      <Text variant='colored'>No sites yet. Create one now!</Text>
                    </Grid.Item>
                  )}
                </Grid>
              </Box>
              <Box variant='card'>
                <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} paddingHorizontal={PaddingSize.Wide} paddingBottom={PaddingSize.Default}>
                  <Text variant='header6'>Subscription</Text>
                  <Stack.Item growthFactor={1} shrinkFactor={1} />
                  <Button variant='secondary' onClicked={onManageWithStripeClicked} text='Manage with Stripe' />
                </Stack>
                <Grid shouldAddGutters={true} paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Wide}>
                  {consoleConfig.plans.map((plan: IPlan, index: number): React.ReactElement => {
                    if (!plan.isPurchasable) {
                      return null;
                    }
                    return (
                      <Grid.Item sizeResponsive={{ base: 12, small: 6, medium: 4, large: 3 }} key={index}>
                        <Box variant='card' isFullHeight={true}>
                          <Stack direction={Direction.Vertical} isFullWidth={false} contentAlignment={Alignment.Start} defaultGutter={PaddingSize.Default} shouldAddGutters={true}>
                            <Text variant='header6'>{plan.name}</Text>
                            <Stack.Item growthFactor={1} shrinkFactor={1}>
                              <Text variant='light'>{plan.highlightFeature.toUpperCase()}</Text>
                            </Stack.Item>
                            <Text variant='bold'>{`$${plan.priceMonthly / 100}`}</Text>
                            <Text variant='light'>per month</Text>
                            {plan.planIndex < currentPlan.planIndex && <Button variant='secondary' isFullWidth={true} onClicked={(): void => onChangePlanClicked(plan)} text='Downgrade' />}
                            {plan.planIndex === currentPlan.planIndex && <Button isEnabled={false} variant='secondary' isFullWidth={true} onClicked={(): void => onChangePlanClicked(plan)} text='Your plan' />}
                            {plan.planIndex > currentPlan.planIndex && <Button variant='primary' isFullWidth={true} onClicked={(): void => onChangePlanClicked(plan)} text='Upgrade' />}
                          </Stack>
                        </Box>
                      </Grid.Item>
                    );
                  })}
                </Grid>
              </Box>
            </React.Fragment>
          )}
        </Stack>
      </ResponsiveContainingView>
      {account && (
        <AccountUpgradeDialog
          isOpen={isAccountUpgradePopupShowing}
          account={account}
          onCloseClicked={onAccountUpgradePopupCloseClicked}
          onUpgradeClicked={onAccountUpgradePopupUpgradeClicked}
        />
      )}

      {newPlan && (
        <NewPlanDialog
          isUpgradeDialogLoading={isUpgradeDialogLoading}
          newPlan={newPlan}
          currentPlan={currentPlan}
          upgradeCardError={upgradeCardError}
          upgradeDiscountCode={upgradeDiscountCode}
          upgradeDiscountCodeError={upgradeDiscountCodeError}
          onUpgradeDialogClosed={onUpgradeDialogClosed}
          onUpgradeDiscountCodeChanged={onUpgradeDiscountCodeChanged}
          upgradeError={upgradeError}
          onUpgradeDialogUpgradeClicked={onUpgradeDialogUpgradeClicked}
        />
      )}
      <ToastContainer />
    </Elements>
  );
};
