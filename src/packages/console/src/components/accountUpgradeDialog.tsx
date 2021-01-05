import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { IPlan } from '../consoleConfig';
import { Account } from '../everypageClient/resources';
import { useGlobals } from '../globalsContext';

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
    <Dialog onClose={onCloseClicked} open={props.isOpen}>
      <DialogTitle>{`You've reached the site limit for ${plan.name} accounts`}</DialogTitle>
      <Box marginX={4} marginBottom={4}>
        <Typography component='p'>{`${plan.name} everypage accounts have a limit of ${plan.siteLimit} sites.`}</Typography>
        <br />
        {plan.code === 'core' ? (
          <Typography component='p'>{`To create more sites, and gain access to an ever-growing list of more features, upgrade to a paid account which suits you - they start from just ${nextPlan.priceMonthly}/month!`}</Typography>
        ) : nextPlan ? (
          <Typography component='p'>To create more sites, and gain access to an ever-growing list of more features, upgrade to a paid account which suits you - they start from just $5/month!</Typography>
        ) : (
          <Typography component='p'>Please email us at help@everypagehq.com and we&apos;ll sort something out for you.</Typography>
        )}
        <br />
        <Typography component='p'>You can always reach us through the support chat on the bottom-right ↘️</Typography>
        <Box marginTop={2} width={1} display='flex' flexDirection='row' justifyContent='start' alignItems='baseline'>
          <Box flexGrow={1} />
          {nextPlan && <Button color='primary' onClick={onCloseClicked}>Maybe later</Button>}
          {!nextPlan && <Button color='primary' onClick={onCloseClicked}>Cancel</Button>}
          {nextPlan && <Box flexGrow={1} />}
          {nextPlan && <Button color='primary' variant='contained' onClick={onUpgradeClicked}>Manage Account</Button>}
          <Box flexGrow={1} />
        </Box>
      </Box>
    </Dialog>
  );
};
