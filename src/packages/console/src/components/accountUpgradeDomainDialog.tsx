import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export interface IAccountUpgradeDomainDialogProps {
  isOpen: boolean;
  onCloseClicked: () => void;
  onUpgradeClicked: () => void;
}

export const AccountUpgradeDomainDialog = (props: IAccountUpgradeDomainDialogProps): React.ReactElement => {
  const onCloseClicked = () => {
    props.onCloseClicked();
  };

  const onUpgradeClicked = () => {
    props.onUpgradeClicked();
  };

  return (
    <Dialog onClose={onCloseClicked} open={props.isOpen}>
      <DialogTitle>You need to upgrade to set a custom domain</DialogTitle>
      <Box marginX={4} marginBottom={4}>
        <Typography component='p'>
          To add a custom domain to your site, and gain access to an ever-growing list of more features,
          upgrade to a paid account which suits you - they start from just $5/month!
        </Typography>
        <Box marginTop={2} width={1} display='flex' flexDirection='row' justifyContent='start' alignItems='baseline'>
          <Box flexGrow={1} />
          <Button color='primary' onClick={onCloseClicked}>Maybe later</Button>
          <Box flexGrow={1} />
          <Button color='primary' variant='contained' onClick={onUpgradeClicked}>Manage Account</Button>
          <Box flexGrow={1} />
        </Box>
      </Box>
    </Dialog>
  );
};
