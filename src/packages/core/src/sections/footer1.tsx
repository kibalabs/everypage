import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Stack, Alignment, Direction, KibaIcon, PaddingSize, IconButton } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { useWebsite } from '../util';
import { SectionSubtitleText } from '../components';

interface IFooter1IconLink {
  iconId?: string;
  target: string;
  label?: string;
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
  const copyrightText = (props.copyrightText !== undefined && props.copyrightText !== null) ? props.copyrightText : `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps} className={getClassName(Footer1.displayName, props.className)}>
      <Stack childAlignment={Alignment.Center} shouldAddGutters={true} paddingStart={PaddingSize.Wide2} paddingEnd={PaddingSize.Wide2}>
        {props.iconLinks && (
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} isScrollableHorizontally={true}>
            {props.iconLinks.map((iconLink: IFooter1IconLink, index: number): React.ReactElement => (
              <IconButton key={index} target={iconLink.target} icon={<KibaIcon variant='large' iconId={iconLink.iconId || 'ion-globe'} />} />
            ))}
          </Stack>
        )}
        {props.subtitleText && <SectionSubtitleText text={props.subtitleText}/>}
        <MarkdownText source={copyrightText}/>
      </Stack>
    </Section>
  );
};
Footer1.displayName = 'footer-1';
