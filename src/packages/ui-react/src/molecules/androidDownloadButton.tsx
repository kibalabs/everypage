import React from 'react';
import { getClassName } from '@kibalabs/core';

import { IMoleculeProps, defaultMoleculeProps } from '.';
import { LinkBase } from '../atoms/linkBase';
import { Image } from '../subatoms/image';

export interface IAndroidDownloadButtonTheme {
}

export interface IAndroidDownloadButtonProps extends IMoleculeProps<IAndroidDownloadButtonTheme> {
  appId: string;
  onClick?(): void;
}

export const AndroidDownloadButton = (props: IAndroidDownloadButtonProps): React.ReactElement => {
  return (
    <LinkBase
      id={props.id}
      className={getClassName('android-download-button', props.className)}
      mode='image'
      target={`https://play.google.com/store/apps/details?id=${props.appId}`}
    >
      <Image
        source='https://assets.evrpg.com/android/download-button/v3/dark.svg'
        alternativeText='Download from the Play Store'
      />
    </LinkBase>
  );
};

AndroidDownloadButton.defaultProps = {
  ...defaultMoleculeProps,
};
