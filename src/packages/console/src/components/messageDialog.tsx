import * as React from 'react';

import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export interface IMessageDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirmClicked: () => void;
  onCloseClicked: () => void;
}

export const MessageDialog = (props: IMessageDialogProps): React.ReactElement => {
  return (
    <Dialog onClose={props.onCloseClicked} open={props.isOpen}>
      <DialogTitle>{props.title}</DialogTitle>
      <Box marginX={4} marginBottom={4}>
        <Typography>{props.message}</Typography>
        <Box marginTop={2} width={1} display='flex' flexDirection='row' justifyContent='start' alignItems='baseline'>
          <Box flexGrow={1} />
          <Button color='primary' onClick={props.onCloseClicked}>Cancel</Button>
          <Box flexGrow={1} />
          <Button color='primary' onClick={props.onConfirmClicked}>Confirm</Button>
          <Box flexGrow={1} />
        </Box>
      </Box>
    </Dialog>
  );
};
