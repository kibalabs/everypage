import React from 'react';

import { IWebsiteMeta } from '@kibalabs/everypage';
import { Alignment, Box, Direction, KibaIcon, Spacing, Stack, Text } from '@kibalabs/ui-react';
import { deepCompare } from '@kibalabs/core';

interface IMetaItemProps {
  isChecked: boolean;
  text: string;
}

const MetaItem = (props: IMetaItemProps): React.ReactElement => {
  return (
    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
      <KibaIcon variant='small' iconId={props.isChecked ? 'ion-checkmark-circle-outline' : 'ion-close-circle-outline'} />
      <Text variant='small'>{ props.text }</Text>
    </Stack>
  );
};

interface ISiteMetaCardProps {
  website: IWebsiteMeta;
}

export const SiteMetaCard = React.memo((props: ISiteMetaCardProps): React.ReactElement => {
  return (
    <Box variant='bordered'>
      <Stack direction={Direction.Vertical}>
        <Text variant='header5'>Metadata</Text>
        <Spacing />
        <MetaItem text='name' isChecked={!!props.website.name} />
        <MetaItem text='description' isChecked={!!props.website.description} />
        <MetaItem text='faviconImageUrl' isChecked={!!props.website.faviconImageUrl} />
        <MetaItem text='socialCardImageUrl' isChecked={!!props.website.socialCardImageUrl} />
      </Stack>
    </Box>
  );
}, deepCompare);
