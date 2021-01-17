import React from 'react';

import { IWebsitePlugin } from '@kibalabs/everypage';
import { Box, Text } from '@kibalabs/ui-react';
import { deepCompare } from '@kibalabs/core';

interface ISitePluginCardProps {
  plugin: IWebsitePlugin;
}

export const SitePluginCard = React.memo((props: ISitePluginCardProps): React.ReactElement => {
  return (
    <Box variant='bordered'>
      <Text variant='header5'>{props.plugin.type}</Text>
    </Box>
  );
}, deepCompare);

SitePluginCard.displayName = 'SitePluginCard';
