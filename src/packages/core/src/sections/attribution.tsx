import React from 'react';

import { Section } from '.';
import { Text, Stack, TextAlignment, PaddingSize, Link, Alignment, useTheme } from '@kibalabs/ui-react';


export const Attribution = (): React.ReactElement => {
  const theme = useTheme();
  return (
    <Section background={{color: String(theme.alternateColors.inverse.background)}} isInverse={true}>
      <Stack childAlignment={Alignment.Center} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide} isFullWidth={true}>
        <Text alignment={TextAlignment.Center}>
          Made with <Link target='https://www.everypagehq.com' text='everypage' /> 
        </Text>
      </Stack>
    </Section>
  );
};
Attribution.displayName = 'attribution';
