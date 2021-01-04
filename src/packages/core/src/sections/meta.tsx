import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Box, Direction, Image, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { TwitterAppCard, TwitterCard } from '../application/twitterCard';
import { IWebsite } from '../model';
import { useWebsite } from '../util';

interface IMetaProps extends ISectionProps {
  website?: IWebsite;
}

export const Meta = (props: IMetaProps): React.ReactElement => {
  const website = useWebsite(props.website);
  const title = website.title || `${website.name} - ${website.tagline}`;
  let socialCardImageUrl = website.socialCardImageUrl;
  if (!socialCardImageUrl) {
    // TODO(krishan711): set a default image!
  } else if (socialCardImageUrl.startsWith('/')) {
    socialCardImageUrl = `https://${website.siteHost}${socialCardImageUrl}`;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(Meta.displayName, props.className)}>
      <Stack direction={Direction.Vertical} childAlignment={Alignment.Fill} isFullHeight={true} isFullWidth={true} shouldAddGutters={false} padding={PaddingSize.Wide}>
        <Text variant='note'>(This is the metadata on your site - it won&apos;t be shown on the actual page but it&apos;s important because it&apos;s what Google and other search engines see when they visit your site for indexing 👀)</Text>
        <Spacing variant={PaddingSize.Default} />
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={false}>
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <Stack direction={Direction.Vertical} childAlignment={Alignment.Fill} shouldAddGutters={false}>
              <Text variant='strong'>Title</Text>
              <Text>{title}</Text>
              <Spacing variant={PaddingSize.Default} />
              <Text variant='strong'>Description</Text>
              <Text>{website.description || '(not set)'}</Text>
              <Spacing variant={PaddingSize.Default} />
              <Text variant='strong'>Keywords</Text>
              <Text>{(website.keywords || ['(not set)']).join(', ')}</Text>
              <Spacing variant={PaddingSize.Default} />
              <Text variant='strong'>Author</Text>
              <Text>{website.company || '(not set)'}</Text>
              <Spacing variant={PaddingSize.Default} />
              <Text variant='strong'>Copyright</Text>
              <Text>{website.company || '(not set)'}</Text>
              <Spacing variant={PaddingSize.Default} />
              <Text variant='strong'>Favicon</Text>
              {website.faviconImageUrl && !website.faviconImageUrl.startsWith('<') ? (
                <Box width='100px' variant='transparent'>
                  <Image source={website.faviconImageUrl} />
                </Box>
              ) : (
                <Text>(not set)</Text>
              )}
              <Spacing variant={PaddingSize.Wide} />
            </Stack>
          </Stack.Item>
          <Spacing variant={PaddingSize.Wide} direction={Direction.Horizontal} />
          <Stack.Item>
            <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start} shouldAddGutters={false}>
              <Text variant='strong'>Twitter Card</Text>
              { (website.iosAppId || website.androidAppId) ? (
                <TwitterAppCard
                  iosAppId={website.iosAppId}
                  androidAppId={website.androidAppId}
                />
              ) : (
                <TwitterCard
                  imageUrl={socialCardImageUrl}
                  title={title}
                  description={website.description || '(not set)'}
                />
              )}
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack>
    </Section>
  );
};
Meta.displayName = 'meta';
