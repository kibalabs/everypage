import React from 'react';
import { IVideoProps, Video } from '@kibalabs/ui-react';

export const LazyVideo = (props: IVideoProps): React.ReactElement => {
  return <Video {...props} />
}

LazyVideo.defaultProps = {
  isLazyLoadable: true,
}
