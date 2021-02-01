import React from 'react';

import { Button, Direction, PaddingSize, SingleLineInput, Stack } from '@kibalabs/ui-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface ICreateNewVersionDialogProps {
  isOpen: boolean;
  newVersionDefaultName: string;
  onCloseClicked: () => void;
  onClonePrimaryClicked: (newVersionName: string) => void;
  onCreateFromTemplateClicked: (newVersionName: string) => void;
}

export const CreateNewVersionDialog = (props: ICreateNewVersionDialogProps): React.ReactElement => {
  const [newVersionName, setNewVersionName] = React.useState<string | null>(null);

  const onCloseClicked = () => {
    props.onCloseClicked();
  };

  const onClonePrimaryClicked = () => {
    props.onClonePrimaryClicked(newVersionName);
  };

  const onCreateFromTemplateClicked = () => {
    props.onCreateFromTemplateClicked(newVersionName);
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
          label={newVersionName ? 'Name' : `Name (default: ${props.newVersionDefaultName})`}
          placeholderText={props.newVersionDefaultName}
          value={newVersionName}
          onValueChanged={setNewVersionName}
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
