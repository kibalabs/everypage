import * as React from 'react';


import { KibaException } from '@kibalabs/core';
import { useInitialization, useNavigator } from '@kibalabs/core-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe, PaymentIntent, Stripe, StripeElements, StripeError } from '@stripe/stripe-js';
import Helmet from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AccountUpgradeDialog } from '../components/accountUpgradeDialog';
import { NavigationBar } from '../components/navigationBar';
import { SiteCard } from '../components/siteCard';
import { IPlan } from '../consoleConfig';
import { Account, Site, StripePortalSession, StripeSubscription } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

const stripePromise = loadStripe('pk_live_74pJIhvxX0m61Ub6NDjFiFBy00Q8aDg61J');
// const stripePromise = loadStripe('pk_test_51GqarKBhdc2gIBl2s6qZ2AUFhlRXQOE0l7y4dnUC5YUoKdLSpobrz3h4hFC3PJduu91lTvWJrPW6YwdrCzxExljh00YB1xWyma');

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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: theme.spacing(2, 4),
    marginBottom: theme.spacing(4),
  },
  siteCardGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  accountName: {
    marginRight: theme.spacing(1),
  },
  accountType: {
  },
  paperTitle: {
    fontWeight: 'bold',
    display: 'inline',
    marginRight: theme.spacing(4),
  },
  planBoxHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  planBox: {
    padding: theme.spacing(2, 4),
    margin: theme.spacing(0, 2),
    flexGrow: 1,
  },
  planBoxTitle: {
    fontWeight: 'bold',
  },
  planPrice: {
    fontWeight: 'bold',
    fontSize: '3em',
    marginTop: theme.spacing(2),
  },
  planButton: {
    marginTop: theme.spacing(2),
  },
  planCurrentText: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  upgradeDialogLoadingBox: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    margin: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export interface IAccountPageProps {
  accountId: string;
}

export const AccountPage = (props: IAccountPageProps): React.ReactElement => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Elements stripe={stripePromise}>
        <NavigationBar />
        <Helmet>
          <title>{`${account ? account.name : 'Account page'} | Everypage Console`}</title>
        </Helmet>
        <main className={classes.content}>
          <Container maxWidth='lg'>
            {account === undefined || accountSites === undefined ? (
              <Typography component='p'>loading...</Typography>
            ) : account === null || accountSites === null ? (
              <Typography component='p'>An error occurred. Please try again later.</Typography>
            ) : (
              <React.Fragment>
                <Paper elevation={0} className={classes.paper}>
                  <Typography variant='h5' className={classes.accountName}>{account.name}</Typography>
                  <br />
                  <Typography>
                    {' You are currently on the '}
                    <b>{currentPlan.name}</b>
                    {' plan'}
                  </Typography>
                  {nextPlan && (
                    <Typography variant='caption'>
                      <Button color='primary' size='small' onClick={(): void => onChangePlanClicked(nextPlan)}>Upgrade</Button>
                      {' to '}
                      <b>{nextPlan.name}</b>
                      {` to ${nextPlan.highlightFeature} and more 🚀`}
                    </Typography>
                  )}
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                  <Box width={1} display='flex' justifyContent='start' alignItems='baseline'>
                    <Typography variant='h6' className={classes.paperTitle}>Sites</Typography>
                    {authManager.getHasJwtPermission(`acc-${account.accountId}-adm`) && <Button color='primary' onClick={onCreateSiteClicked}>Create site</Button>}
                  </Box>
                  <Typography>{`${accountSites.length} sites`}</Typography>
                  <Grid container spacing={2} className={classes.siteCardGrid}>
                    {accountSites.map((site: Site, innerIndex: number): React.ReactElement => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={innerIndex}>
                        <SiteCard site={site} onSiteClicked={onSiteClicked} isEnabled={authManager.getHasJwtPermission(`st-${site.siteId}-vw`)} />
                      </Grid>
                    ))}
                    {accountSites.length === 0 && (
                      <Grid item xs={12}>
                        <Typography color='textSecondary'>
                          {'No sites yet. Create one now!'}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
                <Paper id='plan' elevation={0} className={classes.paper}>
                  <Box width={1} display='flex' mb={1} justifyContent='start' alignItems='baseline'>
                    <Typography variant='h6' className={classes.paperTitle}>Subscription</Typography>
                    <Button color='primary' onClick={onManageWithStripeClicked}>Manage with Stripe</Button>
                  </Box>
                  <Box className={classes.planBoxHolder}>
                    {consoleConfig.plans.map((plan: IPlan, index: number): React.ReactElement => {
                      if (!plan.isPurchasable) {
                        return null;
                      }
                      return (
                        <Paper key={index} className={classes.planBox}>
                          <Typography variant='h6' className={classes.planBoxTitle}>{plan.name}</Typography>
                          <Typography variant='caption'>{plan.highlightFeature.toUpperCase()}</Typography>
                          <Typography color='primary' className={classes.planPrice}>{`$${plan.priceMonthly / 100}`}</Typography>
                          <Typography variant='caption'>per month</Typography>
                          {plan.planIndex < currentPlan.planIndex && <Button variant='outlined' fullWidth={true} className={classes.planButton} onClick={(): void => onChangePlanClicked(plan)}>Downgrade</Button>}
                          {plan.planIndex === currentPlan.planIndex && <Button disabled={true} variant='outlined' fullWidth={true} className={classes.planButton} onClick={(): void => onChangePlanClicked(plan)}>Your plan</Button>}
                          {plan.planIndex > currentPlan.planIndex && <Button color='primary' variant='contained' fullWidth={true} className={classes.planButton} onClick={(): void => onChangePlanClicked(plan)}>Upgrade</Button>}
                        </Paper>
                      );
                    })}
                  </Box>
                </Paper>
              </React.Fragment>
            )}
          </Container>
        </main>
        {account && <AccountUpgradeDialog isOpen={isAccountUpgradePopupShowing} account={account} onCloseClicked={onAccountUpgradePopupCloseClicked} onUpgradeClicked={onAccountUpgradePopupUpgradeClicked} />}
        {newPlan && (
          <Dialog
            open={true}
            onClose={onUpgradeDialogClosed}
          >
            <DialogTitle>{`${newPlan.planIndex > currentPlan.planIndex ? 'Upgrade' : 'Downgrade'} to ${newPlan.name}`}</DialogTitle>
            <DialogContent>
              {newPlan.planIndex < currentPlan.planIndex && (
                <Typography>
                  If you downgrade we may have to remove some sites and other features from your existing sites to meet the new quotas 😢
                  <br />
                  <br />
                  If we can help you get more value out of your current plan instead, just reach out to us, we&apos;re always open to feedback 👀
                  <br />
                  <br />
                  If you are sure you want to do this just click downgrade and we will email you to confirm next steps.
                </Typography>
              )}
              {newPlan.planIndex > currentPlan.planIndex && (
                <React.Fragment>
                  <Typography>We&apos;re so glad you&apos;re enjoying everypage. 🙌</Typography>
                  {currentPlan.code === 'core' ? (
                    <React.Fragment>
                      <br />
                      <Typography>Since you haven&apos; got a current subscription for this account, we&apos;ll need your credit card details to continue.</Typography>
                      <TextField
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        label='Card Details'
                        disabled={isUpgradeDialogLoading}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          inputComponent: StripeInput,
                          inputProps: {
                            component: CardElement,
                          },
                        }}
                        error={upgradeCardError !== undefined}
                        helperText={upgradeCardError}
                      />
                      <Typography variant='caption'>Secured by Stripe</Typography>
                    </React.Fragment>
                  ) : (
                    <Typography>When upgrading, you won&apos;t be charged straight away - your next bill will just include a pro-rated amount to pay for the remaining time in this month, so you can start using your new powers immediately 🥳.</Typography>
                  )}
                  <br />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    label='Discount Code (if you have one)'
                    disabled={isUpgradeDialogLoading}
                    InputLabelProps={{ shrink: true }}
                    value={upgradeDiscountCode}
                    onChange={onUpgradeDiscountCodeChanged}
                    error={upgradeDiscountCodeError !== undefined}
                    helperText={upgradeDiscountCodeError}
                  />
                  {upgradeError && <Typography color='error'>{upgradeError}</Typography>}
                </React.Fragment>
              )}
            </DialogContent>
            {isUpgradeDialogLoading ? (
              <Box className={classes.upgradeDialogLoadingBox}>
                <CircularProgress />
              </Box>
            ) : (
              <ElementsConsumer>
                {(stripeProps) => (
                  <DialogActions>
                    {newPlan.planIndex < currentPlan.planIndex && (
                      <Button onClick={(): Promise<void> => onUpgradeDialogUpgradeClicked(stripeProps.stripe, stripeProps.elements)} color='secondary'>
                        Downgrade
                      </Button>
                    )}
                    <Button onClick={onUpgradeDialogClosed} autoFocus>
                      Cancel
                    </Button>
                    {newPlan.planIndex > currentPlan.planIndex && (
                      <Button onClick={(): Promise<void> => onUpgradeDialogUpgradeClicked(stripeProps.stripe, stripeProps.elements)} variant='contained' color='primary'>
                        Upgrade
                      </Button>
                    )}
                  </DialogActions>
                )}
              </ElementsConsumer>
            )}
          </Dialog>
        )}
        <ToastContainer />
      </Elements>
    </div>
  );
};


interface StripeInputProps {
  component: React.Component;
  inputRef: React.Ref<HTMLInputElement>;
}

const StripeInput = (props: StripeInputProps): React.ReactElement => {
  const elementRef = React.useRef();
  React.useImperativeHandle(props.inputRef, () => ({
    focus: () => elementRef.current.focus,
  }));
  return (
    <props.component
      // eslint-disable-next-line no-return-assign
      onReady={(element) => (elementRef.current = element)}
      {...props}
    />
  );
};
export default StripeInput;
