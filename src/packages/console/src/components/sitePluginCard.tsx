import React from 'react';
import { IWebsitePlugin } from '@kibalabs/everypage-core'
import { Box, Text } from '@kibalabs/ui-react'

interface ISitePluginCardProps {
  plugin: IWebsitePlugin;
}

export const SitePluginCard = (props: ISitePluginCardProps): React.ReactElement => {
  return (
    <Box variant='bordered'>
      <Text variant='header5'>{props.plugin.type}</Text>
    </Box>
  );
}
