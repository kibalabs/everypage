import React from 'react';

import { ISectionProps } from '.';
import { AppDownload1 } from './appDownload1';

// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IAppButtons1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  iosAppId?: string;
  androidAppId?: string;
  macAppId?: string;
  appButtonMode?: string;
  appButtonVariant?: string;
}

export const AppButtons1 = (props: IAppButtons1Props): React.ReactElement => {
  console.warn(`${AppButtons1.displayName} is now deprecated. Please use ${AppDownload1.displayName} instead.`);
  return (
    <AppDownload1 {...props} />
  );
};
AppButtons1.displayName = 'app-buttons-1';
AppButtons1.defaultProps = {
};
