import React from 'react';
import { useObjectLocalStorageState } from '@kibalabs/core-react';
import { IndexPage } from '@kibalabs/everypage-core';
import { makeStyles } from '@material-ui/core/styles';

import { KibaFrame } from '../components/kibaFrame';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

export const CanvasSectionPage = (): React.ReactElement => {
  const classes = useStyles();
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');

  return (
    <div className={classes.root}>
      <KibaFrame>
        <IndexPage pageContent={siteContent} pageTheme={siteTheme} shouldIncludeHeadSection={false} shouldIncludeHead={false} shouldIncludeAttributionSection={false} />
      </KibaFrame>
    </div>
  )
}
