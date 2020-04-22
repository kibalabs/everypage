import React from 'react';

import { Section } from '.';
import { Text, Stack, TextAlignment, Spacing, Link, Alignment, useTheme, IColorGuide } from '../components';


export const Attribution = (): React.ReactElement => {
  const theme = useTheme<IColorGuide>('colors');
  return (
    <Section background={{color: theme.backgroundDark}}>
      <Stack childAlignment={Alignment.Center} shouldShowGutters={true}>
        <Spacing mode='extra-narrow'/>
        <Text alignment={TextAlignment.Center} mode='inverse'>
          <span>Made with <Link mode='inverse' destination='https://everypagehq.com' shouldOpenNewTab={true} text='everypage' /></span>
        </Text>
        <Spacing mode='extra-narrow'/>
      </Stack>
    </Section>
  );
};
Attribution.displayName = 'attribution';
