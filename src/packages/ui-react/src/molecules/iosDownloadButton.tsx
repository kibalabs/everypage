import React from 'react';
import { getClassName } from '@kibalabs/core';

import { IMoleculeProps, defaultMoleculeProps } from '.';
import { LinkBase } from '../atoms/linkBase';
import { Image } from '../subatoms/image';

export interface IIosDownloadButtonTheme {
}

export interface IIosDownloadButtonProps extends IMoleculeProps<IIosDownloadButtonTheme> {
  appId: string;
  onClick?(): void;
}

export const IosDownloadButton = (props: IIosDownloadButtonProps): React.ReactElement => {
  return (
    <LinkBase
      id={props.id}
      className={getClassName('ios-download-button', props.className)}
      mode='image'
      target={`https://apps.apple.com/app/id${props.appId}`}
    >
      <Image
        source='https://assets.evrpg.com/ios/download-button/v3/dark.svg'
        alternativeText='Download from the App Store'
      />
    </LinkBase>
  );
};

IosDownloadButton.defaultProps = {
  ...defaultMoleculeProps,
};
