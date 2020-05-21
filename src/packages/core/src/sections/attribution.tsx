import React from 'react';

import { Section } from '.';
import { Text, Stack, TextAlignment, Spacing, Link, Alignment, useTheme, IColorGuide } from '../components';


export const Attribution = (): React.ReactElement => {
  const theme = useTheme<IColorGuide>('colors');
  return (
    <Section background={{color: String(theme.backgroundInverse)}}>
      <Stack childAlignment={Alignment.Center} shouldAddGutters={false} isFullWidth={true}>
        <Spacing mode='wide'/>
        <Text alignment={TextAlignment.Center} mode='inverse'>
          <span>Made with <Link mode='inverse' destination='https://www.everypagehq.com' shouldOpenNewTab={true} text='everypage' /></span>
        </Text>
        <Spacing mode='wide'/>
      </Stack>
    </Section>
  );
};
Attribution.displayName = 'attribution';
