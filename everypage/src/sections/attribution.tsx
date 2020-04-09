import React from 'react';

import { Section } from '.';
import { MarkdownText, Stack, TextAlignment } from '../components';


export const Attribution = (): React.ReactElement => (
  <Section>
    <Stack contentAlignment='center' shouldShowGutters={true}>
      <Stack.Item>
        <MarkdownText alignment={TextAlignment.Center} text='Made with [EveryPage](https://everypagehq.com)' />
      </Stack.Item>
    </Stack>
  </Section>
);
