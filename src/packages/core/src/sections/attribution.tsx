import React from 'react';

import { Section } from '.';
import { Text, Stack, TextAlignment, Spacing, Link, Alignment, useColors } from '@kibalabs/ui-react';


export const Attribution = (): React.ReactElement => {
  const theme = useColors();
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
