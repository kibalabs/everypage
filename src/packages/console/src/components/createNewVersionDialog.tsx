import React from 'react';

import { Button, Direction, PaddingSize, SingleLineInput, Stack } from '@kibalabs/ui-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface ICreateNewVersionDialogProps {
  isOpen: boolean;
  newVersionName: string;
  newVersionDefaultName: string;
  onClonePrimaryClicked: () => void;
  onCloseClicked: () => void;
  onCreateFromTemplateClicked: () => void;
  onNewVersionNameChanged: (value: string) => void;
}

export const CreateNewVersionDialog = (props: ICreateNewVersionDialogProps): React.ReactElement => {
  const onCloseClicked = () => {
    props.onCloseClicked();
  };
  const onNewVersionNameChanged = (value: string) => {
    props.onNewVersionNameChanged(value);
  };
  const onClonePrimaryClicked = () => {
    props.onClonePrimaryClicked();
  };
  const onCreateFromTemplateClicked = () => {
    props.onCreateFromTemplateClicked();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={onCloseClicked}
    >
      <DialogTitle>Create new version</DialogTitle>
      <DialogContent>
        <SingleLineInput
          name='name'
          label={props.newVersionName ? 'Name' : `Name (default: ${props.newVersionDefaultName})`}
          placeholderText={props.newVersionDefaultName}
          value={props.newVersionName}
          onValueChanged={onNewVersionNameChanged}
        />
      </DialogContent>
      <DialogActions>
        <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Default} paddingHorizontal={PaddingSize.Wide}>
          <Button variant='primary' onClicked={onCreateFromTemplateClicked} text='Choose Template' />
          <Button variant='primary' onClicked={onClonePrimaryClicked} text='Clone Published' />
        </Stack>
      </DialogActions>
      <DialogActions>
        <Button onClicked={onCloseClicked} text='Cancel' />
      </DialogActions>
    </Dialog>
  );
};
