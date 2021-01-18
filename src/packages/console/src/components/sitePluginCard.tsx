import React from 'react';

import { deepCompare } from '@kibalabs/core';
import { IWebsitePlugin } from '@kibalabs/everypage';
import { Box, Text } from '@kibalabs/ui-react';

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
