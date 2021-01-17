import React from 'react';


import { useObjectLocalStorageState } from '@kibalabs/core-react';
import { IndexPage } from '@kibalabs/everypage';
import { Box } from '@kibalabs/ui-react';
import Helmet from 'react-helmet';

import { KibaFrame } from '../components/kibaFrame';

export const CanvasPreviewPage = (): React.ReactElement => {
  const [siteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme] = useObjectLocalStorageState('siteTheme');

  return (
    <React.Fragment>
      <Helmet>
        <title>Canvas Preview | Everypage Console</title>
      </Helmet>
      <Box height='100%'>
        <KibaFrame>
          <IndexPage pageContent={siteContent} pageTheme={siteTheme} shouldIncludeHeadSection={false} shouldIncludeAttributionSection={false} />
        </KibaFrame>
      </Box>
    </React.Fragment>
  );
};
