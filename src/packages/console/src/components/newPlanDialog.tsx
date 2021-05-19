import React from 'react';

import { Alignment, Button, Dialog, Direction, InputWrapper, LoadingSpinner, PaddingSize, SingleLineInput, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';
import { CardElement } from '@stripe/react-stripe-js';

import { IPlan } from '../consoleConfig';

export interface IAccountUpgradeResult {
  isSuccessful: boolean;
  errorMessage?: string;
  cardErrorMessage?: string;
  discountCodeErrorMessage?: string;
}

export interface INewPlanDialogProps {
  newPlan: IPlan;
  currentPlan: IPlan;
  onCloseClicked: () => void;
  onUpgradeClicked: (discountCode: string) => Promise<IAccountUpgradeResult>;
}

export const NewPlanDialog = (props: INewPlanDialogProps): React.ReactElement => {
  const [discountCode, setDiscountCode] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cardError, setCardError] = React.useState<string | null>(null);
  const [discountCodeError, setDiscountCodeError] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onDiscountCodeChanged = (value: string): void => {
    setDiscountCode(value);
    setDiscountCodeError(null);
  };

  const onUpgradeClicked = async (): Promise<void> => {
    setCardError(null);
    setDiscountCodeError(null);
    setError(null);
    setIsLoading(true);
    const response = await props.onUpgradeClicked(discountCode);
    if (!response.isSuccessful) {
      if (response.cardErrorMessage) {
        setCardError(response.cardErrorMessage);
      }
      if (response.discountCodeErrorMessage) {
        setDiscountCodeError(response.discountCodeErrorMessage);
      }
      if (response.errorMessage) {
        setError(response.errorMessage);
      }
    }
    setIsLoading(false);
  };

  const onCloseClicked = () => {
    props.onCloseClicked();
  };

  return (
    <Dialog isOpen={true} onCloseClicked={onCloseClicked}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Text variant='header3' alignment={TextAlignment.Center}>{`${props.newPlan.planIndex > props.currentPlan.planIndex ? 'Upgrade' : 'Downgrade'} to ${props.newPlan.name}`}</Text>
        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
          {props.newPlan.planIndex < props.currentPlan.planIndex && (
            <React.Fragment>
              <Text>If you downgrade we may have to remove some sites and other features from your existing sites to meet the new quotas 😢</Text>
              <Text>If we can help you get more value out of your current plan instead, just reach out to us, we are always open to feedback 👀</Text>
              <Text>If you are sure you want to do this just click downgrade and we will email you to confirm next steps.</Text>
            </React.Fragment>
          )}
          {props.newPlan.planIndex > props.currentPlan.planIndex && (
            <React.Fragment>
              <Text>We are so glad you are enjoying everypage 🙌</Text>
              <Spacing />
              <SingleLineInput
                inputWrapperVariant={discountCodeError ? 'error' : 'default'}
                isEnabled={!isLoading}
                placeholderText='Discount Code (if you have one)'
                label='Discount Code (if you have one)'
                value={discountCode}
                onValueChanged={onDiscountCodeChanged}
                messageText={discountCodeError}
              />
              {props.currentPlan.code === 'core' ? (
                <React.Fragment>
                  <Stack.Item gutterAfter={PaddingSize.None}>
                    <InputWrapper variant={`stripeField-${cardError && 'error'}`} messageText={cardError} isEnabled={!isLoading}>
                      <CardElement />
                    </InputWrapper>
                  </Stack.Item>
                  <Text variant='note'>Secured by Stripe</Text>
                </React.Fragment>
              ) : (
                <Text>When upgrading, you will not be charged straight away - your next bill will just include a pro-rated amount to pay for the remaining time in this month, so you can start using your new powers immediately 🥳.</Text>
              )}
              {error && <Text variant='error'>{error}</Text>}
            </React.Fragment>
          )}
        </Stack>
        <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} contentAlignment={Alignment.Center}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <React.Fragment>
              {props.newPlan.planIndex < props.currentPlan.planIndex && (
                <Button
                  variant='tertiary'
                  text='Downgrade'
                  onClicked={onUpgradeClicked}
                />
              )}
              <Button
                variant={props.newPlan.planIndex < props.currentPlan.planIndex ? 'primary' : 'default'}
                text='Cancel'
                onClicked={onCloseClicked}
              />
              {props.newPlan.planIndex > props.currentPlan.planIndex && (
                <Button
                  variant='primary'
                  text='Upgrade'
                  onClicked={onUpgradeClicked}
                />
              )}
            </React.Fragment>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};
