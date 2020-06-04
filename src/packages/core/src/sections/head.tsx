import React from 'react';

import { Section, ISectionProps } from '.';
import { Text, Stack, Alignment, Spacing } from '../components';
import { useWebsite } from '../util';
import { IWebsite } from '../model';

interface IHeadProps extends ISectionProps {
  website?: IWebsite;
}

export const Head = (props: IHeadProps): React.ReactElement => {
  const website = props.website || useWebsite();
  return (
    <Section {...props as ISectionProps}>
      <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={false}>
        <Spacing mode='wide' />
        <Text mode='note'>(This is the metadata on your site - it won't be shown on the actual page but it's important because it's what Google and other search engines see when they visit your site for indexing 👀)</Text>
        <Spacing mode='default' />
        <Text mode='strong'>Title</Text>
        <Text>{website.title || `${website.name} - ${website.tagline}`}</Text>
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
        <Spacing mode='wide' />
        <hr />
      </Stack>
    </Section>
  );
};
Head.displayName = 'head';
