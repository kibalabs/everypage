import React from 'react';

import { Alignment, Button, Direction, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { Dialog } from './dialog';

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
    <Dialog onCloseClicked={onCloseClicked} isOpen={props.isOpen}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Text variant='header3' alignment={TextAlignment.Center}>You need to upgrade to set a custom domain</Text>
        <Stack paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Wide}>
          <Text tag='p'>
To add a custom domain to your site, and gain access to an ever-growing list of more features,
          upgrade to a paid account which suits you - they start from just $5/month!
          </Text>
        </Stack>
        <Stack.Item gutterBefore={PaddingSize.Default}>
          <Stack direction={Direction.Horizontal} paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Wide} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            <Button variant='secondary' onClicked={onCloseClicked} text='Maybe later' />

            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Button variant='primary' onClicked={onUpgradeClicked} text='Manage Account' />
          </Stack>
        </Stack.Item>
      </Stack>
    </Dialog>
  );
};
