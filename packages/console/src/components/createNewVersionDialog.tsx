import React from 'react';

import { Alignment, Button, Dialog, Direction, PaddingSize, SingleLineInput, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

export interface ICreateNewVersionDialogProps {
  isOpen: boolean;
  newVersionDefaultName: string;
  onCloseClicked: () => void;
  onClonePrimaryClicked: (newVersionName?: string) => void;
  onCreateFromTemplateClicked: (newVersionName?: string) => void;
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
      isOpen={props.isOpen}
      onCloseClicked={onCloseClicked}
    >
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Text variant='header3' alignment={TextAlignment.Center}>Create new version</Text>
        <SingleLineInput
          name='name'
          label={newVersionName ? 'Name' : `Name (default: ${props.newVersionDefaultName})`}
          placeholderText={props.newVersionDefaultName}
          value={newVersionName}
          onValueChanged={setNewVersionName}
        />
        <Stack.Item gutterBefore={PaddingSize.Default}>
          <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Button variant='primary' onClicked={onCreateFromTemplateClicked} text='Choose Template' />
            <Button variant='primary' onClicked={onClonePrimaryClicked} text='Clone Published' />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
          </Stack>
        </Stack.Item>
        <Stack.Item gutterBefore={PaddingSize.Default} alignment={Alignment.Center}>
          <Button onClicked={onCloseClicked} text='Cancel' />
        </Stack.Item>
      </Stack>
    </Dialog>
  );
};
