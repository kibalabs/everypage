import React from 'react';

import { Section } from '.';
import { Text, Stack, TextAlignment, PaddingSize, Link, Alignment, useColors } from '@kibalabs/ui-react';


export const Attribution = (): React.ReactElement => {
  const theme = useColors();
  return (
    <Section background={{color: String(theme.backgroundInverse)}}>
      <Stack childAlignment={Alignment.Center} gutterSizeStart={PaddingSize.Wide} gutterSizeEnd={PaddingSize.Wide} isFullWidth={true}>
        <Text alignment={TextAlignment.Center} mode='inverse'>
          <span>Made with <Link mode='inverse' destination='https://www.everypagehq.com' shouldOpenNewTab={true} text='everypage' /></span>
        </Text>
      </Stack>
    </Section>
  );
};
Attribution.displayName = 'attribution';
