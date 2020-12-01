import React from 'react';
import { IMediaProps, Media } from '@kibalabs/ui-react';

export const LazyMedia = (props: IMediaProps): React.ReactElement => {
  return <Media {...props} />
}

LazyMedia.defaultProps = {
  isLazyLoadable: true,
}
