import React from 'react';

import { IVideoProps, Video } from '@kibalabs/ui-react';

export const LazyVideo = (props: IVideoProps): React.ReactElement => {
  return <Video maxWidth='100%' {...props} />;
};

LazyVideo.defaultProps = {
  isLazyLoadable: true,
};
