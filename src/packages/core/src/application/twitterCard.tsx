import React from 'react';

import { KibaResponse, Requester, RestMethod } from '@kibalabs/core';
import { Link, useInitialization } from '@kibalabs/core-react';
import { Alignment, Box, LoadingSpinner, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { LazyImage } from '../components';

interface ITwitterCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const TwitterCard = (props: ITwitterCardProps): React.ReactElement => {
  return (
    <Box width={'300px'} variant='card'>
      <Stack childAlignment={Alignment.Fill}>
        <LazyImage source={props.imageUrl} alternativeText='' isFullWidth={true} />
        <Spacing variant={PaddingSize.Narrow} />
        <Text variant='strong'>{props.title}</Text>
        <Spacing variant={PaddingSize.Narrow} />
        <Text>{props.description}</Text>
        <Spacing variant={PaddingSize.Default} />
      </Stack>
    </Box>
  );
};

interface ITwitterAppCardProps {
  iosAppId?: string;
  androidAppId?: string;
}

interface IosApp {
  readonly androidAppId: string;
  readonly name: string;
  readonly description: string;
  readonly publisherName: string;
  readonly iconImageUrl: string;
  readonly storeUrl: string;
}

interface AndroidApp {
  readonly androidAppId: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly publisherName: string;
  readonly iconImageUrl: string;
  readonly storeUrl: string;
}

export const TwitterAppCard = (props: ITwitterAppCardProps): React.ReactElement => {
  const [iosAppData, setIosAppData] = React.useState<IosApp | null | undefined>(undefined);
  const [androidAppData, setAndroidAppData] = React.useState<AndroidApp | null | undefined>(undefined);

  useInitialization((): void => {
    const requester = new Requester();
    if (props.iosAppId) {
      requester.makeRequest(RestMethod.GET, `https://api.everypagehq.com/v1/ios-apps/${props.iosAppId}`).then((response: KibaResponse): void => {
        setIosAppData(JSON.parse(response.content).iosApp);
      }).catch((error: Error): void => {
        console.error('error', error);
        setIosAppData(null);
      });
    }
    if (props.androidAppId) {
      requester.makeRequest(RestMethod.GET, `https://api.everypagehq.com/v1/android-apps/${props.androidAppId}`).then((response: KibaResponse): void => {
        setAndroidAppData(JSON.parse(response.content).androidApp);
      }).catch((error: Error): void => {
        console.error('error', error);
        setAndroidAppData(null);
      });
    }
  });

  return (
    <Box width={'300px'} variant='card'>
      <Stack childAlignment={Alignment.Fill}>
        <Text>iOS:</Text>
        { !props.iosAppId ? (
          <Text>ios app not set</Text>
        ) : iosAppData === undefined ? (
          <LoadingSpinner variant={'small'} />
        ) : iosAppData === null ? (
          <Text>app not found with id: {props.iosAppId}</Text>
        ) : (
          <Stack childAlignment={Alignment.Center}>
            <Box width={'100px'} variant='transparent'>
              <LazyImage source={iosAppData.iconImageUrl} />
            </Box>
            <Text>{iosAppData.name}</Text>
            <Text variant='note'>{iosAppData.description ? `${iosAppData.description.substr(0, 150)}...` : 'no description found'}</Text>
            <Link target={iosAppData.storeUrl} text='App Store Link' />
          </Stack>
        )}
        <hr />
        <Text>Android:</Text>
        { !props.androidAppId ? (
          <Text>android app not set</Text>
        ) : androidAppData === undefined ? (
          <LoadingSpinner variant={'small'} />
        ) : androidAppData === null ? (
          <Text>app not found with id: {props.androidAppId}</Text>
        ) : (
          <Stack childAlignment={Alignment.Center}>
            <Box width={'100px'} variant='transparent'>
              <LazyImage source={androidAppData.iconImageUrl} />
            </Box>
            <Text>{androidAppData.name}</Text>
            <Text variant='note'>{androidAppData.description ? `${androidAppData.description.substr(0, 150)}...` : 'no description found'}</Text>
            <Link target={androidAppData.storeUrl} text='Play Store Link' />
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
