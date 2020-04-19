import React from 'react';

import { Section } from '.';
import { Text, Stack, TextAlignment, Spacing, Link } from '../components';
import { useTheme, IColorGuide } from '../theming';


export const Attribution = (): React.ReactElement => {
  const theme = useTheme<IColorGuide>('colors');
  return (
    <Section background={{solidColor: theme.backgroundDark}}>
      <Stack contentAlignment='center' shouldShowGutters={true}>
        <Spacing mode='extra-narrow'/>
        <Text alignment={TextAlignment.Center} mode='inverse'>
          <span>Made with <Link mode='inverse' destination='https://everypagehq.com' shouldOpenNewTab={true} text='everypage' /></span>
        </Text>
        <Spacing mode='extra-narrow'/>
      </Stack>
    </Section>
  );
};
