import React from 'react';

import Helmet from 'react-helmet';

export const EmptyPage = (): React.ReactElement => {
  return (
    <div>
      <Helmet>
        <title>... | Everypage Console</title>
      </Helmet>
    </div>
  );
};
