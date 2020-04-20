import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing } from '../components';
import { useWebsite } from '../util';

interface IFooter1Props extends ISectionProps {
  text?: string;
}

export const Footer1 = (props: IFooter1Props): React.ReactElement => {
  const website = useWebsite();
  const text = props.text || `© 2020 ${website.company}`;
  return (
    <Section
      id={props.id}
      className={props.className}
      background={props.background}
    >
      <Stack childAlignment={Alignment.Center} shouldShowGutters={true}>
        <Spacing mode='extra-narrow'/>
        <MarkdownText text={text}/>
        <Spacing mode='extra-narrow'/>
      </Stack>
    </Section>
  );
};
Footer1.displayName = 'footer-1';
