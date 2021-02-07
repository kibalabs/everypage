import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Direction, EqualGrid, Grid, IconButton, Image, KibaIcon, Link, MarkdownText, PaddingSize, ResponsiveTextAlignmentView, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';
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
      <Stack direction={Direction.Vertical} paddingHorizontal={PaddingSize.Wide3} paddingTop={EverypagePaddingSize.SectionTop} paddingBottom={EverypagePaddingSize.SectionBottom}>
        <Grid childAlignment={Alignment.Center}>
          <Grid.Item sizeResponsive={{ base: 12, medium: 6 }}>
            <Stack childAlignmentResponsive={{ base: Alignment.Center, medium: Alignment.Start }} shouldAddGutters={true} paddingStart={PaddingSize.Default} paddingEnd={PaddingSize.Wide2}>
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
            </Stack>
          </Grid.Item>
          <Grid.Item sizeResponsive={{ base: 0, medium: 1 }} />
          <Grid.Item sizeResponsive={{ base: 10, medium: 5 }}>
            <ResponsiveTextAlignmentView alignmentResponsive={{ base: TextAlignment.Center, medium: TextAlignment.Left }}>
              <EqualGrid childSizeResponsive={{ base: 12, small: 6, medium: 4, large: 3 }} isFullHeight={false} contentAlignment={Alignment.Start} shouldAddGutters={true}>
                {props.linkSections && props.linkSections.map((section: IFooter2LinkSection, index: number): React.ReactElement => (
                  <Stack key={index} direction={Direction.Vertical} isFullWidth={false} contentAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
                    <Text variant='header6'>{section.sectionName}</Text>
                    {section.links && section.links.map((link: IFooter2Link, linkIndex: number): React.ReactElement => (
                      <Link key={linkIndex} variant='footerLink' target={link.target} text={link.label} />
                    ))}
                  </Stack>
                ))}
              </EqualGrid>
            </ResponsiveTextAlignmentView>
          </Grid.Item>
        </Grid>
        {copyrightText && (
          <Stack.Item alignment={Alignment.Center} gutterBefore={PaddingSize.Wide2}>
            <MarkdownText textAlignment={TextAlignment.Center} source={copyrightText} />
          </Stack.Item>
        )}
      </Stack>
    </Section>
  );
};
Footer2.displayName = 'footer-2';
