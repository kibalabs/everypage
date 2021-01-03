import React from 'react';
import { useObjectLocalStorageState } from '@kibalabs/core-react';
import { Box } from '@kibalabs/ui-react';
import { IndexPage } from '@kibalabs/everypage';

import { KibaFrame } from '../components/kibaFrame';

export const CanvasPreviewPage = (): React.ReactElement => {
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');

  return (
    <Box height='100%'>
      <KibaFrame>
        <IndexPage pageContent={siteContent} pageTheme={siteTheme} shouldIncludeHeadSection={false} shouldIncludeAttributionSection={false} />
      </KibaFrame>
    </Box>
  )
}
