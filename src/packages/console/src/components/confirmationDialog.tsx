import React from 'react';

import { Button, Direction, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';
import { Dialog } from './dialog';

export interface IConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirmClicked: () => void;
  onCloseClicked: () => void;
}

export const ConfirmationDialog = (props: IConfirmationDialogProps): React.ReactElement => {
  const cancelButtonText = props.cancelButtonText || 'Cancel';
  const confirmButtonText = props.confirmButtonText || 'Confirm';

  return (
    <Dialog isOpen={props.isOpen} onCloseClicked={props.onCloseClicked}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Text variant='header3' alignment={TextAlignment.Center}>{props.title}</Text>
        <Text alignment={TextAlignment.Center}>{props.message}</Text>
        <Stack.Item gutterBefore={PaddingSize.Default}>
          <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Button variant='secondary' onClicked={props.onCloseClicked} text={cancelButtonText} />
            <Button variant='primary' onClicked={props.onConfirmClicked} text={confirmButtonText} />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
          </Stack>
        </Stack.Item>
      </Stack>
    </Dialog>
  );
};
