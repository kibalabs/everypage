import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, EqualGrid, IconButton, KibaIcon, Link, MarkdownText, PaddingSize, ResponsiveTextAlignmentView, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText } from '../components';
import { useWebsiteMeta } from '../util';

interface IFooter3IconLink {
  iconId?: string;
  target: string;
  label?: string;
}

interface IFooter3Link {
  label: string;
  target: string;
}

interface IFooter3LinkSection {
  sectionName?: string;
  links: IFooter3Link[];
}

interface IFooter3Props extends ISectionProps {
  copyrightText?: string;
  subtitleText?: string;
  iconLinks?: IFooter3IconLink[];
  linkSections?: IFooter3LinkSection[];
}

export const Footer3 = (props: IFooter3Props): React.ReactElement => {
  const websiteMeta = useWebsiteMeta();
  let companyText = `${websiteMeta.company}`;
  if (websiteMeta.companyUrl) {
    companyText = `[${companyText}](${websiteMeta.companyUrl})`;
  }
  const copyrightText = (props.copyrightText !== undefined && props.copyrightText !== null) ? props.copyrightText : `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps} className={getClassName(Footer3.displayName, props.className)}>
      <Stack childAlignment={Alignment.Center} shouldAddGutters={true}>
        <ResponsiveTextAlignmentView alignmentResponsive={{ base: TextAlignment.Center, medium: TextAlignment.Left }}>
          <EqualGrid childSizeResponsive={{ base: 12, small: 6 }} isFullHeight={false} contentAlignment={Alignment.Start} shouldAddGutters={true}>
            {props.linkSections && props.linkSections.map((section: IFooter3LinkSection, index: number): React.ReactElement => (
              <Stack key={index} direction={Direction.Vertical} isFullWidth={false} contentAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
                {section.sectionName && <Text variant='header6'>{section.sectionName}</Text>}
                {section.links && section.links.map((link: IFooter3Link, linkIndex: number): React.ReactElement => (
                  <Link key={linkIndex} variant='footerLink' target={link.target} text={link.label} />
                ))}
              </Stack>
            ))}
          </EqualGrid>
        </ResponsiveTextAlignmentView>
        {props.iconLinks && (
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} isScrollableHorizontally={true}>
            {props.iconLinks.map((iconLink: IFooter3IconLink, index: number): React.ReactElement => (
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
Footer3.displayName = 'footer-3';
Footer3.defaultProps = {
  paddingTop: PaddingSize.Wide2,
  paddingBottom: PaddingSize.Wide2,
};
