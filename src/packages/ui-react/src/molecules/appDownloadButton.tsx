import React from 'react';
import { getClassName, KibaException } from '@kibalabs/core';

import { IMoleculeProps, defaultMoleculeProps } from '.';
import { LinkBase } from '../atoms/linkBase';
import { Image } from '../subatoms/image';

export interface AppDownloadButtonTheme {
}

export interface AppDownloadButtonProps extends IMoleculeProps<AppDownloadButtonTheme> {
  appId: string;
  appType: 'android' | 'ios' | 'mac' | 'appletv';
  buttonVariant: string;
  onClick?(): void;
}

export const AppDownloadButton = (props: AppDownloadButtonProps): React.ReactElement => {
  if (['dark', 'dark-clear', 'light', 'light-clear'].indexOf(props.buttonVariant) === -1) {
    console.error(`The buttonVariant was not recognized: ${props.buttonVariant}`);
  }
  if (['android', 'ios', 'mac', 'appletv'].indexOf(props.appType) === -1) {
    throw new KibaException(`appType not recognized: ${props.appType}`);
  }

  const getAppUrl = (): string => {
    if (props.appType === 'android') {
      return `https://play.google.com/store/apps/details?id=${props.appId}`;
    }
    if (props.appType === 'ios') {
      return `https://apps.apple.com/app/id${props.appId}`;
    }
    if (props.appType === 'mac') {
      return `https://apps.apple.com/app/id${props.appId}`;
    }
    if (props.appType === 'appletv') {
      return ``;
    }
    return '';
  }

  const getAlternativeText = (): string => {
    if (props.appType === 'android') {
      return `Download from the Play Store`;
    }
    if (props.appType === 'ios') {
      return `Download from the iOS App Store`;
    }
    if (props.appType === 'mac') {
      return `Download from the Mac App Store`;
    }
    if (props.appType === 'appletv') {
      return `Download from the AppleTV App Store`;
    }
    return '';
  }

  return (
    <LinkBase
      id={props.id}
      className={getClassName(AppDownloadButton.displayName, props.className)}
      variant='image'
      target={getAppUrl()}
    >
      <Image
        source={`https://assets.evrpg.com/${props.appType}/download-button/v5/${props.buttonVariant}.svg`}
        alternativeText={getAlternativeText()}
      />
    </LinkBase>
  );
};

AppDownloadButton.defaultProps = {
  ...defaultMoleculeProps,
  buttonVariant: 'dark',
};
AppDownloadButton.displayName = 'app-download-button';
