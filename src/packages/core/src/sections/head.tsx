import React from 'react';

import { Section, ISectionProps } from '.';
import { Text, Stack, Alignment, Spacing, Direction, Image, Box, PaddingSize } from '@kibalabs/ui-react';
import { useWebsite } from '../util';
import { IWebsite } from '../model';
import { TwitterCard, TwitterAppCard } from '../application/twitterCard';

interface IHeadProps extends ISectionProps {
  website?: IWebsite;
}

export const Head = (props: IHeadProps): React.ReactElement => {
  const website = props.website || useWebsite();
  const title = website.title || `${website.name} - ${website.tagline}`;
  let socialCardImageUrl = website.socialCardImageUrl;
  if (!socialCardImageUrl) {
    // TODO(krish): set a default image!
  } else if (socialCardImageUrl.startsWith('/')) {
    socialCardImageUrl = `https://${website.siteHost}${socialCardImageUrl}`;
  }
  return (
    <Section {...props as ISectionProps}>
      <Stack direction={Direction.Vertical} childAlignment={Alignment.Fill} isFullHeight={true} isFullWidth={true} shouldAddGutters={false} gutterSizeStart={PaddingSize.Wide} gutterSizeEnd={PaddingSize.Wide}>
        <Text mode='note'>(This is the metadata on your site - it won't be shown on the actual page but it's important because it's what Google and other search engines see when they visit your site for indexing 👀)</Text>
        <Spacing mode='default' />
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={false}>
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <Stack direction={Direction.Vertical} childAlignment={Alignment.Fill} shouldAddGutters={false}>
              <Text mode='strong'>Title</Text>
              <Text>{title}</Text>
              <Spacing mode='default' />
              <Text mode='strong'>Description</Text>
              <Text>{website.description || '(not set)'}</Text>
              <Spacing mode='default' />
              <Text mode='strong'>Keywords</Text>
              <Text>{(website.keywords || ['(not set)']).join(', ')}</Text>
              <Spacing mode='default' />
              <Text mode='strong'>Author</Text>
              <Text>{website.company || '(not set)'}</Text>
              <Spacing mode='default' />
              <Text mode='strong'>Copyright</Text>
              <Text>{website.company || '(not set)'}</Text>
              <Spacing mode='default' />
              <Text mode='strong'>Favicon</Text>
              <Box width='100px' mode='transparent'>
                <Image source={website.faviconImageUrl} />
              </Box>
              <Spacing mode='wide' />
            </Stack>
          </Stack.Item>
          <Spacing mode='wide' direction={Direction.Horizontal} />
          <Stack.Item>
            <Stack direction={Direction.Vertical} childAlignment={Alignment.Fill} shouldAddGutters={false}>
              <Text mode='strong'>Twitter Card</Text>
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
Head.displayName = 'head';
