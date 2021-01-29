import React from 'react';

import { Button } from '@kibalabs/ui-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface IStartOverDialogProps {
  isOpen: boolean;
  onCloseClicked: () => void;
  onStartOverAlertConfirmClicked: () => void;
}

export const StartOverDialog = (props: IStartOverDialogProps): React.ReactElement => {
  const onCloseClicked = () => {
    props.onCloseClicked();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={onCloseClicked}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>Starting over will clear all your current work. If you want to create more than one site at a time, please sign up - the core package is totally free and requires no credit card!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClicked={props.onStartOverAlertConfirmClicked} variant='secondary' text='Start over anyway' />
        <Button onClicked={onCloseClicked} variant='primary' text='Cancel' />
      </DialogActions>
    </Dialog>
  );
};
