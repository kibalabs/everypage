import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Markdown, Stack, Alignment, Direction, KibaIcon, LinkBase, PaddingSize } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { useWebsite } from '../util';

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
  const copyrightText = props.copyrightText || `© ${new Date().getFullYear()} ${companyText}`;
  return (
    <Section {...props as ISectionProps} className={getClassName(Footer1.displayName, props.className)}>
      <Stack childAlignment={Alignment.Center} shouldAddGutters={true} gutterSizeStart={PaddingSize.Wide} gutterSizeEnd={PaddingSize.Wide}>
        {props.iconLinks && (
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} isFullHeight={true}>
            {props.iconLinks.map((iconLink: IFooter1IconLink, index: number): React.ReactElement => (
              <LinkBase key={index} mode='icon' target={iconLink.target} label={iconLink.label}>
                <KibaIcon size='large' iconId={iconLink.iconId || 'ion-globe'} />
              </LinkBase>
            ))}
          </Stack>
        )}
        {props.subtitleText && (
          <Markdown source={props.subtitleText} />
        )}
        <Markdown source={copyrightText}/>
      </Stack>
    </Section>
  );
};
Footer1.displayName = 'footer-1';
