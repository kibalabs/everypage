import React from 'react';

import { IMediaProps, Media } from '@kibalabs/ui-react';

export const LazyMedia = (props: IMediaProps): React.ReactElement => {
  return <Media maxWidth='100%' {...props} isLazyLoadable={props.isLazyLoadable !== undefined ? props.isLazyLoadable : true } />;
};
