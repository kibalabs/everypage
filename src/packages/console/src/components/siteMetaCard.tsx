import React from 'react';
import { IWebsite } from '@kibalabs/everypage-core'
import { Box, Text, Stack, Direction, KibaIcon, Alignment, Spacing } from '@kibalabs/ui-react'

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
}

interface ISiteMetaCardProps {
  website: IWebsite;
}

export const SiteMetaCard = (props: ISiteMetaCardProps): React.ReactElement => {
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
}
