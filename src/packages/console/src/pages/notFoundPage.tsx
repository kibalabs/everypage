import * as React from 'react';

import Helmet from 'react-helmet';

export const NotFoundPage = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Not Found | Everypage Console</title>
      </Helmet>
      <div>Not Found</div>
    </React.Fragment>
  );
};
