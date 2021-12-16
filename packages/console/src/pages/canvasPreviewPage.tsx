import React from 'react';


import { useObjectLocalStorageState } from '@kibalabs/core-react';
import { IndexPage } from '@kibalabs/everypage';
import { Box, Head, IHead } from '@kibalabs/ui-react';

import { KibaFrame } from '../components/kibaFrame';
import { useGlobals } from '../globalsContext';

export const CanvasPreviewPage = (): React.ReactElement => {
  const { localStorageClient } = useGlobals();
  const [siteContent] = useObjectLocalStorageState('siteContent', localStorageClient);
  const [siteTheme] = useObjectLocalStorageState('siteTheme', localStorageClient);

  const headRef = React.useRef<IHead | null>(null);
  const setHead = React.useCallback((newHead: IHead): void => {
    headRef.current = newHead;
  }, [headRef]);

  return (
    <React.Fragment>
      <Head>
        <title>Canvas Preview | Everypage Console</title>
      </Head>
      <Box height='100%'>
        <KibaFrame head={headRef.current}>
          <IndexPage
            setHead={setHead}
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
