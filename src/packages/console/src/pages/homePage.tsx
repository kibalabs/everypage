import React from 'react';
import { useHistory } from '@kibalabs/core-react';
import Button from '@material-ui/core/Button';

import { useGlobals } from '../globalsContext';

export const HomePage = (): React.ReactElement => {
  const { everypageClient, localStorageClient } = useGlobals();
  const history = useHistory();

  const onLogoutClicked = (): void => {
    everypageClient.logout_user().then((): void => {
      localStorageClient.clear();
      history.navigate('/');
    });
  }

  return (
    <React.Fragment>
      <div>Welcome to the everypage console</div>
      <br />
      <br />
      <Button
        variant='contained'
        color='secondary'
        onClick={onLogoutClicked}
      >Log out</Button>
    </React.Fragment>
  )
}
