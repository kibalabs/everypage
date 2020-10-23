import React from 'react';
import { Text, Stack, TextAlignment, PaddingSize, Link, Alignment } from '@kibalabs/ui-react';

import { Section } from '.';

export const Attribution = (): React.ReactElement => {
  return (
    <Section colorVariant='everypageAttribution'>
      <Stack childAlignment={Alignment.Center} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide} isFullWidth={true}>
        <Text alignment={TextAlignment.Center}>
          Made with <Link target='https://www.everypagehq.com' text='everypage' />
        </Text>
      </Stack>
    </Section>
  );
};
Attribution.displayName = 'attribution';
