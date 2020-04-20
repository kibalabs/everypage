import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText } from '../components';
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
      <MarkdownText text={text}/>
    </Section>
  );
};
Footer1.displayName = 'footer-1';
