import React from 'react';


import { useObjectLocalStorageState } from '@kibalabs/core-react';
import { IndexPage } from '@kibalabs/everypage';
import { Box } from '@kibalabs/ui-react';
import Helmet from 'react-helmet';

import { KibaFrame } from '../components/kibaFrame';
import { useGlobals } from '../globalsContext';

export const CanvasPreviewPage = (): React.ReactElement => {
  const { localStorageClient } = useGlobals();
  const [siteContent] = useObjectLocalStorageState('siteContent', localStorageClient);
  const [siteTheme] = useObjectLocalStorageState('siteTheme', localStorageClient);

  return (
    <React.Fragment>
      <Helmet>
        <title>Canvas Preview | Everypage Console</title>
      </Helmet>
      <Box height='100%'>
        <KibaFrame>
          <IndexPage
            pageContent={siteContent}
            pageTheme={siteTheme}
            shouldIncludeHeadSection={false}
            shouldIncludeAttributionSection={false}
          />
        </KibaFrame>
      </Box>
    </React.Fragment>
  );
};
