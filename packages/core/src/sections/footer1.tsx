import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, IconButton, KibaIcon, MarkdownText, PaddingSize, Stack } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText } from '../components';
import { useWebsiteMeta } from '../util';

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
  const websiteMeta = useWebsiteMeta();
  let companyText = `${websiteMeta.company}`;
  if (websiteMeta.companyUrl) {
    companyText = `[${companyText}](${websiteMeta.companyUrl})`;
  }
  const copyrightText = (props.copyrightText !== undefined && props.copyrightText !== null) ? props.copyrightText : `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps} className={getClassName(Footer1.displayName, props.className)}>
      <Stack childAlignment={Alignment.Center} shouldAddGutters={true}>
        {props.iconLinks && (
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} isScrollableHorizontally={true}>
            {props.iconLinks.map((iconLink: IFooter1IconLink, index: number): React.ReactElement => (
              <IconButton key={index} target={iconLink.target} icon={<KibaIcon variant='large' iconId={iconLink.iconId || 'ion-globe'} />} />
            ))}
          </Stack>
        )}
        {props.subtitleText && <SectionSubtitleText text={props.subtitleText} />}
        <MarkdownText source={copyrightText} />
      </Stack>
    </Section>
  );
};
Footer1.displayName = 'footer-1';
Footer1.defaultProps = {
  paddingTop: PaddingSize.Wide2,
  paddingBottom: PaddingSize.Wide2,
};
