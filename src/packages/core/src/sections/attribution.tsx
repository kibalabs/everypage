import React from 'react';

import { Section } from '.';
import { Text, Stack, TextAlignment, PaddingSize, Link, Alignment, useColors } from '@kibalabs/ui-react';


export const Attribution = (): React.ReactElement => {
  const theme = useColors();
  return (
    <Section background={{color: String(theme.backgroundInverse)}}>
      <Stack childAlignment={Alignment.Center} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide} isFullWidth={true}>
        <Text alignment={TextAlignment.Center} mode='inverse'>
          <span>Made with <Link mode='inverse' target='https://www.everypagehq.com' text='everypage' /></span>
        </Text>
      </Stack>
    </Section>
  );
};
Attribution.displayName = 'attribution';
