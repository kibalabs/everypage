import React from 'react';

// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Text from '@material-ui/core/Text';

import { Alignment, Button, Direction, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';


import { IPlan } from '../consoleConfig';
import { Account } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';
import { Dialog } from './dialog';

export interface IAccountUpgradeDialogProps {
  isOpen: boolean;
  account: Account;
  onCloseClicked: () => void;
  onUpgradeClicked: () => void;
}

export const AccountUpgradeDialog = (props: IAccountUpgradeDialogProps): React.ReactElement => {
  const { consoleConfig } = useGlobals();

  const plan = consoleConfig.plans.filter((candidate: IPlan): boolean => candidate.code === props.account.accountType).shift();
  const nextPlan = plan ? consoleConfig.plans[consoleConfig.plans.indexOf(plan) + 1] : undefined;

  const onCloseClicked = () => {
    props.onCloseClicked();
  };

  const onUpgradeClicked = () => {
    props.onUpgradeClicked();
  };

  return (
    <Dialog onCloseClicked={onCloseClicked} isOpen={props.isOpen}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Text variant='header3' alignment={TextAlignment.Center}>{`You've reached the site limit for ${plan.name} accounts`}</Text>
        <Stack paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Wide}>
          <Text tag='p'>{`${plan.name} everypage accounts have a limit of ${plan.siteLimit} sites.`}</Text>
          <br />
          {plan.code === 'core' ? (
            <Text tag='p'>{`To create more sites, and gain access to an ever-growing list of more features, upgrade to a paid account which suits you - they start from just ${nextPlan.priceMonthly}/month!`}</Text>
          ) : nextPlan ? (
            <Text tag='p'>To create more sites, and gain access to an ever-growing list of more features, upgrade to a paid account which suits you - they start from just $5/month!</Text>
          ) : (
            <Text tag='p'>Please email us at help@everypagehq.com and we&apos;ll sort something out for you.</Text>
          )}
          <br />
          <Text tag='p'>You can always reach us through the support chat on the bottom-right ↘️</Text>
        </Stack>
        <Stack.Item gutterBefore={PaddingSize.Default}>
          <Stack direction={Direction.Horizontal} paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Wide} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            {nextPlan && <Button variant='secondary' onClicked={onCloseClicked} text='Maybe later' />}
            {!nextPlan && <Button variant='secondary' onClicked={onCloseClicked} text='Cancel' />}
            {nextPlan && <Stack.Item growthFactor={1} shrinkFactor={1} />}
            {nextPlan && <Button variant='primary' onClicked={onUpgradeClicked} text='Manage Account' />}
          </Stack>
        </Stack.Item>
      </Stack>
    </Dialog>
  );
};
