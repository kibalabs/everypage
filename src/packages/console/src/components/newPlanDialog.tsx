import React from 'react';

import { Button, Text } from '@kibalabs/ui-react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Stripe, StripeElements } from '@stripe/stripe-js';

import { IPlan } from '../consoleConfig';

const useStyles = makeStyles((theme) => ({
  upgradeDialogLoadingBox: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    margin: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export interface INewPlanDialogProps {
  // isOpen: boolean;
  isUpgradeDialogLoading: boolean;
  newPlan: IPlan;
  currentPlan: IPlan;
  upgradeCardError: string;
  upgradeDiscountCode: string;
  upgradeDiscountCodeError: string;
  onUpgradeDialogClosed: () => void;
  onUpgradeDiscountCodeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  upgradeError: string;
  onUpgradeDialogUpgradeClicked: (stripe: Stripe, elements: StripeElements) => Promise<void>;
}

export const NewPlanDialog = (props: INewPlanDialogProps): React.ReactElement => {
  const classes = useStyles();
  const { newPlan, currentPlan, isUpgradeDialogLoading: isLoading, upgradeCardError, upgradeDiscountCode, upgradeDiscountCodeError, onUpgradeDiscountCodeChanged, upgradeError, onUpgradeDialogUpgradeClicked } = props;
  const onCloseClicked = () => {
    props.onUpgradeDialogClosed();
  };

  return (
    <Dialog
      open={true}
      onClose={onCloseClicked}
    >
      <DialogTitle>{`${newPlan.planIndex > currentPlan.planIndex ? 'Upgrade' : 'Downgrade'} to ${newPlan.name}`}</DialogTitle>
      <DialogContent>
        {newPlan.planIndex < currentPlan.planIndex && (
          <Text>
                    If you downgrade we may have to remove some sites and other features from your existing sites to meet the new quotas 😢
            <br />
            <br />
                    If we can help you get more value out of your current plan instead, just reach out to us, we&apos;re always open to feedback 👀
            <br />
            <br />
                    If you are sure you want to do this just click downgrade and we will email you to confirm next steps.
          </Text>
        )}
        {newPlan.planIndex > currentPlan.planIndex && (
          <React.Fragment>
            <Text>We&apos;re so glad you&apos;re enjoying everypage. 🙌</Text>
            {currentPlan.code === 'core' ? (
              <React.Fragment>
                <br />
                <Text>Since you haven&apos; got a current subscription for this account, we&apos;ll need your credit card details to continue.</Text>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  label='Card Details'
                  disabled={isLoading}
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
                <Text variant='subtitle'>Secured by Stripe</Text>
              </React.Fragment>
            ) : (
              <Text>When upgrading, you won&apos;t be charged straight away - your next bill will just include a pro-rated amount to pay for the remaining time in this month, so you can start using your new powers immediately 🥳.</Text>
            )}
            <br />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Discount Code (if you have one)'
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              value={upgradeDiscountCode}
              onChange={onUpgradeDiscountCodeChanged}
              error={upgradeDiscountCodeError !== undefined}
              helperText={upgradeDiscountCodeError}
            />
            {upgradeError && <Text variant='error'>{upgradeError}</Text>}
          </React.Fragment>
        )}
      </DialogContent>
      {isLoading ? (
        <Box className={classes.upgradeDialogLoadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <ElementsConsumer>
          {(stripeProps) => (
            <DialogActions>
              {newPlan.planIndex < currentPlan.planIndex && (
                <Button onClicked={(): Promise<void> => onUpgradeDialogUpgradeClicked(stripeProps.stripe, stripeProps.elements)} variant='secondary' text='Downgrade' />
              )}
              <Button onClicked={onCloseClicked} text='Cancel' />
              {newPlan.planIndex > currentPlan.planIndex && (
                <Button onClicked={(): Promise<void> => onUpgradeDialogUpgradeClicked(stripeProps.stripe, stripeProps.elements)} text='Upgrade' />
              )}
            </DialogActions>
          )}
        </ElementsConsumer>
      )}
    </Dialog>
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
