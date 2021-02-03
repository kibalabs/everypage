import React from 'react';

import { Alignment, Button, Direction, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Stripe, StripeElements } from '@stripe/stripe-js';

import { IPlan } from '../consoleConfig';
import { Dialog } from './dialog';

export interface INewPlanDialogProps {
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
  const { newPlan, currentPlan, isUpgradeDialogLoading: isLoading, upgradeCardError, upgradeDiscountCode, upgradeDiscountCodeError, onUpgradeDiscountCodeChanged, upgradeError, onUpgradeDialogUpgradeClicked } = props;
  const onCloseClicked = () => {
    props.onUpgradeDialogClosed();
  };

  return (
    <Dialog isOpen={true} onCloseClicked={onCloseClicked}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Text variant='header3' alignment={TextAlignment.Center}>{`${newPlan.planIndex > currentPlan.planIndex ? 'Upgrade' : 'Downgrade'} to ${newPlan.name}`}</Text>
        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
          {newPlan.planIndex < currentPlan.planIndex && (
            <React.Fragment>
              <Text>If you downgrade we may have to remove some sites and other features from your existing sites to meet the new quotas 😢</Text>
              <Text>If we can help you get more value out of your current plan instead, just reach out to us, we are always open to feedback 👀</Text>
              <Text>If you are sure you want to do this just click downgrade and we will email you to confirm next steps.</Text>
            </React.Fragment>
          )}
          {newPlan.planIndex > currentPlan.planIndex && (
            <React.Fragment>
              <Text>We are so glad you are enjoying everypage 🙌</Text>
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
              {currentPlan.code === 'core' ? (
                <React.Fragment>
                  <Stack.Item gutterAfter={PaddingSize.None}>
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
                  </Stack.Item>
                  <Text variant='note'>Secured by Stripe</Text>
                </React.Fragment>
              ) : (
                <Text>When upgrading, you will not be charged straight away - your next bill will just include a pro-rated amount to pay for the remaining time in this month, so you can start using your new powers immediately 🥳.</Text>
              )}
              {upgradeError && <Text variant='error'>{upgradeError}</Text>}
            </React.Fragment>
          )}
        </Stack>
        {isLoading ? (
          <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Center} childAlignment={Alignment.Center} padding={PaddingSize.Wide}>
            <CircularProgress />
          </Stack>
        ) : (
          <ElementsConsumer>
            {(stripeProps) => (
              <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} contentAlignment={Alignment.Center}>
                {newPlan.planIndex < currentPlan.planIndex && (
                  <Button
                    variant='tertiary'
                    text='Downgrade'
                    onClicked={(): Promise<void> => onUpgradeDialogUpgradeClicked(stripeProps.stripe, stripeProps.elements)}
                  />
                )}
                <Button
                  variant={newPlan.planIndex < currentPlan.planIndex ? 'primary' : 'default'}
                  text='Cancel'
                  onClicked={onCloseClicked}
                />
                {newPlan.planIndex > currentPlan.planIndex && (
                  <Button
                    variant='primary'
                    text='Upgrade'
                    onClicked={(): Promise<void> => onUpgradeDialogUpgradeClicked(stripeProps.stripe, stripeProps.elements)}
                  />
                )}
              </Stack>
            )}
          </ElementsConsumer>
        )}
      </Stack>
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
