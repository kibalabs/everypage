import React from 'react';

import { Alignment, Link, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';

interface IAttribution extends ISectionProps {
}

export const Attribution = (props: IAttribution): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} type={Attribution.displayName} colorVariant='everypageAttribution'>
      <Stack childAlignment={Alignment.Center} isFullWidth={true}>
        <Text alignment={TextAlignment.Center}>
          {'Made with '}
          <Link target='https://www.everypagehq.com' text='everypage' />
        </Text>
      </Stack>
    </Section>
  );
};
Attribution.displayName = 'attribution';
Attribution.defaultProps = {
  paddingTop: PaddingSize.Wide,
  paddingBottom: PaddingSize.Wide,
};
