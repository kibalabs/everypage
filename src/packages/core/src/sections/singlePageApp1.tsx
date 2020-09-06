import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Image, PaddingSize, Stack, Direction, TextAlignment, Alignment, ResponsiveTextAlignmentView, MarkdownText, IconButton, KibaIcon, AppDownloadButton } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { HeroSectionTitleText, SectionSubtitleText } from '../components';
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
  const copyrightText = props.copyrightText !== undefined || props.copyrightText !== null ? props.copyrightText : `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps} className={getClassName(SinglePageApp1.displayName, props.className)} isFullHeight={true}>
      <ResponsiveContainingView size={10} sizeSmall={8}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center}>
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeAfter={PaddingSize.Wide}></Stack.Item>
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeAfter={PaddingSize.Wide}></Stack.Item>
            {props.logoImageUrl && <Stack.Item gutterSizeAfter={PaddingSize.Wide}><ResponsiveContainingView size={12} sizeMedium={10}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' /></ResponsiveContainingView></Stack.Item>}
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Default : PaddingSize.None}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Stack direction={Direction.Vertical} directionSmall={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} gutterSizeBefore={PaddingSize.ExtraWide}>
              {iosAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='ios' buttonMode={props.appButtonMode} appId={iosAppId} /></Stack.Item>}
              {androidAppId && <Stack.Item shrinkFactor={1} ><AppDownloadButton appType='android' buttonMode={props.appButtonMode} appId={androidAppId} /></Stack.Item>}
              {macAppId && <Stack.Item shrinkFactor={1}><AppDownloadButton appType='mac' buttonMode={props.appButtonMode} appId={macAppId} /></Stack.Item>}
            </Stack>
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeAfter={PaddingSize.Wide}></Stack.Item>
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeAfter={PaddingSize.Wide}></Stack.Item>
            {props.bottomText && <Stack.Item><MarkdownText source={props.bottomText}/></Stack.Item>}
            <Stack.Item growthFactor={1} shrinkFactor={1} gutterSizeAfter={PaddingSize.Wide}></Stack.Item>
            {props.iconLinks && (
              <Stack.Item gutterSizeAfter={PaddingSize.Wide}>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true}>
                  {props.iconLinks.map((iconLink: ISinglePageApp1IconLink, index: number): React.ReactElement => (
                    <IconButton key={index} target={iconLink.target} icon={<KibaIcon size='large' iconId={iconLink.iconId || 'ion-globe'} />} />
                  ))}
                </Stack>
              </Stack.Item>
            )}
            <Stack.Item gutterSizeAfter={PaddingSize.Default}><MarkdownText source={copyrightText}/></Stack.Item>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
SinglePageApp1.displayName = 'single-page-app-1';
SinglePageApp1.defaultProps = {
};
