import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, IconButton, KibaIcon, Link, MarkdownText, PaddingSize, Stack, Text, Image } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText } from '../components';
import { useWebsiteMeta } from '../util';

interface IFooter2IconLink {
  iconId?: string;
  target: string;
  label?: string;
}

interface IFooter2Link {
  label: string;
  target: string;
}

interface IFooter2LinkSection {
  sectionName: string;
  links: IFooter2Link[];
}

interface IFooter2Props extends ISectionProps {
  logoImageUrl?: string;
  subtitleText?: string;
  copyrightText?: string;
  iconLinks?: IFooter2IconLink[];
  linkSections?: IFooter2LinkSection[];
}

export const Footer2 = (props: IFooter2Props): React.ReactElement => {
  const websiteMeta = useWebsiteMeta();
  let companyText = `${websiteMeta.company}`;
  if (websiteMeta.companyUrl) {
    companyText = `[${companyText}](${websiteMeta.companyUrl})`;
  }
  const copyrightText = (props.copyrightText !== undefined && props.copyrightText !== null) ? props.copyrightText : `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps} className={getClassName(Footer2.displayName, props.className)}>
      <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} paddingTop={PaddingSize.Wide3} paddingHorizontal={PaddingSize.Wide} shouldAddGutters={true} defaultGutter={PaddingSize.Wide4}>
        <Stack childAlignment={Alignment.Start} shouldAddGutters={true} paddingStart={PaddingSize.Default} paddingEnd={PaddingSize.Wide2}>
          {props.logoImageUrl && <Image source={props.logoImageUrl} isFullWidth={true} alternativeText='logo' />}
          <Stack.Item growthFactor={1} shrinkFactor={1} />
          {props.subtitleText && <SectionSubtitleText text={props.subtitleText} />}
          {props.iconLinks && (
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} isScrollableHorizontally={true}>
              {props.iconLinks.map((iconLink: IFooter2IconLink, index: number): React.ReactElement => (
                <IconButton key={index} target={iconLink.target} icon={<KibaIcon iconId={iconLink.iconId || 'ion-globe'} />} />
              ))}
            </Stack>
          )}
          <MarkdownText source={copyrightText} />
        </Stack>
        <Stack.Item growthFactor={0.5} shrinkFactor={1} />
        <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Center} childAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Wide2}>
          {props.linkSections && props.linkSections.map((section: IFooter2LinkSection, index: number): React.ReactElement => (
            <Stack key={index} direction={Direction.Vertical} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
              <Text variant='header6'>{section.sectionName}</Text>
              {section.links && section.links.map((link: IFooter2Link, linkIndex: number): React.ReactElement => (
                <Link key={linkIndex} variant='footerLink' target={link.target} text={link.label} />
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Section>
  );
};
Footer2.displayName = 'footer-2';
