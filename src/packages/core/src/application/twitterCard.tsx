import React from 'react';

import { Text, Stack, Alignment, Spacing, Image, Box } from '@kibalabs/ui-react';

interface ITwitterCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const TwitterCard = (props: ITwitterCardProps): React.ReactElement => {
  return (
    <Box width={'300px'} mode='card'>
      <Stack childAlignment={Alignment.Fill} shouldAddGutters={false}>
        <Image source={props.imageUrl} alternativeText='' isFullWidth={true} />
        <Spacing mode='narrow' />
        <Text mode='strong'>{props.title}</Text>
        <Spacing mode='narrow' />
        <Text>{props.description}</Text>
        <Spacing mode='default' />
      </Stack>
    </Box>
  );
};
