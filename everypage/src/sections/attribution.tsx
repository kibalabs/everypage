import React from 'react';

import { Section } from '.';
import { MarkdownText, Stack, TextAlignment, Spacing } from '../components';
import { useTheme, IColorGuide } from '../theming';


export const Attribution = (): React.ReactElement => {
  const theme = useTheme<IColorGuide>('colors');
  return (
    <Section background={{solidColor: theme.backgroundDark}}>
      <Stack contentAlignment='center' shouldShowGutters={true}>
        <Spacing mode='extra-narrow'/>
        <MarkdownText alignment={TextAlignment.Center} mode='dark' text='Made with **[everypage](https://everypagehq.com)**' />
        <Spacing mode='extra-narrow'/>
      </Stack>
    </Section>
  );
};
