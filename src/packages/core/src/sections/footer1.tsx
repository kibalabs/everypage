import React from 'react';

import { Section, ISectionProps } from '.';
import { Markdown, Stack, Alignment, Spacing, Direction, KibaIcon, LinkBase } from '@kibalabs/ui-react';
import { useWebsite } from '../util';

interface IFooter1IconLink {
  iconId?: string;
  target: string;
}

interface IFooter1Props extends ISectionProps {
  copyrightText?: string;
  subtitleText?: string;
  iconLinks?: IFooter1IconLink[];
}

export const Footer1 = (props: IFooter1Props): React.ReactElement => {
  const website = useWebsite();
  let companyText = `${website.company}`;
  if (website.companyUrl) {
    companyText = `[${companyText}](${website.companyUrl})`;
  }
  const copyrightText = props.copyrightText || `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps}>
      <Stack childAlignment={Alignment.Center} shouldAddGutters={true}>
        <Spacing direction={Direction.Vertical} mode='default'/>
        {props.iconLinks && (
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} isFullHeight={true}>
            {props.iconLinks.map((iconLink: IFooter1IconLink, index: number): React.ReactElement => (
              <LinkBase key={index} target={iconLink.target}>
                <KibaIcon size='large' iconId={iconLink.iconId || 'ion-globe'} />
              </LinkBase>
            ))}
          </Stack>
        )}
        {props.subtitleText && (
          <Markdown text={props.subtitleText} />
        )}
        <Markdown text={copyrightText}/>
        <Spacing direction={Direction.Vertical} mode='default'/>
      </Stack>
    </Section>
  );
};
Footer1.displayName = 'footer-1';
