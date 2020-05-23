import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing } from '../components';
import { useWebsite } from '../util';

interface IFooter1Props extends ISectionProps {
  text?: string;
}

export const Footer1 = (props: IFooter1Props): React.ReactElement => {
  const website = useWebsite();
  let companyText = `${website.company}`;
  if (website.companyUrl) {
    companyText = `[${companyText}](${website.companyUrl})`;
  }
  const text = props.text || `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps}>
      <Stack childAlignment={Alignment.Center} shouldAddGutters={true}>
        <Spacing mode='extra-narrow'/>
        <MarkdownText text={text}/>
        <Spacing mode='extra-narrow'/>
      </Stack>
    </Section>
  );
};
Footer1.displayName = 'footer-1';
