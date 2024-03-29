import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, AppDownloadButton, Direction, IconButton, KibaIcon, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { HeroLogo, HeroSectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';
import { useWebsite } from '../util';

interface ISinglePageApp1IconLink {
  iconId?: string;
  target: string;
  label?: string;
}
interface ISinglePageApp1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  copyrightText?: string;
  iosAppId?: string;
  androidAppId?: string;
  macAppId?: string;
  appButtonMode?: string;
  appButtonVariant?: string;
  bottomText?: string;
  iconLinks?: ISinglePageApp1IconLink[];
}

export const SinglePageApp1 = (props: ISinglePageApp1Props): React.ReactElement => {
  const website = useWebsite();
  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;
  const macAppId = props.macAppId || website.macAppId;
  let companyText = `${website.company}`;
  if (website.companyUrl) {
    companyText = `[${companyText}](${website.companyUrl})`;
  }
  const copyrightText = (props.copyrightText !== undefined && props.copyrightText !== null) ? props.copyrightText : `© ${new Date().getFullYear()} ${companyText}`;
  let appButtonVariant = props.appButtonVariant;
  if (props.appButtonMode) {
    console.warn('appButtonMode is deprecated. Please use appButtonVariant instead');
    appButtonVariant = props.appButtonMode;
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(SinglePageApp1.displayName, props.className)} isFullHeight={true}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, small: 8 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center}>
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterAfter={PaddingSize.Wide} />
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterAfter={PaddingSize.Wide} />
            {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide3}><HeroLogo source={props.logoImageUrl} /></Stack.Item>}
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Default : PaddingSize.None}><HeroSectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <Stack.Item gutterBefore={PaddingSize.Wide3}>
              <Stack directionResponsive={{ base: Direction.Vertical, small: Direction.Horizontal }} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                {iosAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='ios' buttonVariant={appButtonVariant} appId={iosAppId} /></Stack.Item>}
                {androidAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='android' buttonVariant={appButtonVariant} appId={androidAppId} /></Stack.Item>}
                {macAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='mac' buttonVariant={appButtonVariant} appId={macAppId} /></Stack.Item>}
              </Stack>
            </Stack.Item>
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterAfter={PaddingSize.Wide} />
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterAfter={PaddingSize.Wide} />
            {props.bottomText && <Stack.Item><MarkdownText source={props.bottomText} /></Stack.Item>}
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterAfter={PaddingSize.Wide3} />
            {props.iconLinks && (
              <Stack.Item gutterAfter={PaddingSize.Wide}>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true}>
                  {props.iconLinks.map((iconLink: ISinglePageApp1IconLink, index: number): React.ReactElement => (
                    <IconButton key={index} target={iconLink.target} icon={<KibaIcon variant='large' iconId={iconLink.iconId || 'ion-globe'} />} />
                  ))}
                </Stack>
              </Stack.Item>
            )}
            <Stack.Item gutterAfter={PaddingSize.Wide}><MarkdownText source={copyrightText} /></Stack.Item>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
SinglePageApp1.displayName = 'single-page-app-1';
SinglePageApp1.defaultProps = {
  paddingTop: EverypagePaddingSize.HeroTop,
  paddingBottom: PaddingSize.None,
};
