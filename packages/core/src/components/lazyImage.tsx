import React from 'react';

import { IImageProps, Image } from '@kibalabs/ui-react';

export const LazyImage = (props: IImageProps): React.ReactElement => {
  return <Image {...props} isLazyLoadable={props.isLazyLoadable !== undefined ? props.isLazyLoadable : true } />;
};
