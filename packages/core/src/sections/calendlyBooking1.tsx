import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Direction, Head, Link, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, Text, TextAlignment, useColors } from '@kibalabs/ui-react';
import styled from 'styled-components';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface ICalendlyBooking1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  username: string;
  calendarId: string;
  shouldHideEventType?: boolean;
  shouldHideCookieBanner?: boolean;
  embedHeight?: string;
  embedHeightMobile?: string;
}

export const CalendlyBooking1 = (props: ICalendlyBooking1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(CalendlyBooking1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <CalendlyEmbed
              username={props.username}
              calendarId={props.calendarId}
              shouldHideEventType={props.shouldHideEventType}
              shouldHideCookieBanner={props.shouldHideCookieBanner}
              embedHeight={props.embedHeight}
              embedHeightMobile={props.embedHeightMobile}
            />
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
CalendlyBooking1.displayName = 'calendly-booking-1';
CalendlyBooking1.defaultProps = {
};

interface ICalendlyEmbedProps {
  username: string;
  calendarId: string;
  shouldHideEventType?: boolean;
  shouldHideCookieBanner?: boolean;
  embedHeight?: string;
  embedHeightMobile?: string;
}

interface IStyledCalendlyEmbedProps {
  embedHeight: string;
  embedHeightMobile: string;
}

const StyledCalendlyEmbed = styled.div<IStyledCalendlyEmbedProps>`
  z-index: -1;
  height: ${(props: IStyledCalendlyEmbedProps): string => props.embedHeightMobile};
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  @media (min-width: 827px) {
    height: ${(props: IStyledCalendlyEmbedProps): string => props.embedHeight};
    margin-bottom: -30px;
    margin-top: -66px;
    box-shadow: none;
  }

  .no-js & {
    display: none;
  }
`;

const CalendlyEmbed = (props: ICalendlyEmbedProps): React.ReactElement => {
  const colors = useColors();
  const queryParams = {
    hide_event_type_details: String(props.shouldHideEventType ? 1 : 0),
    hide_gdpr_banner: String(props.shouldHideCookieBanner ? 1 : 0),
    background_color: colors.background.replace('#', ''),
    text_color: colors.text.replace('#', ''),
    primary_color: colors.brandPrimary.replace('#', ''),
  }
  const url = `https://calendly.com/${props.username}/${props.calendarId}?${new URLSearchParams(queryParams).toString()}`;
  console.log('url', url);
  const embedHeight = props.embedHeight ? props.embedHeight : props.shouldHideEventType ? '700px' : '1100px';
  const embedHeightMobile = props.embedHeightMobile ? props.embedHeightMobile : props.shouldHideEventType ? '600px' : '1000px';

  return (
    <React.Fragment>
      <StyledCalendlyEmbed
        className={getClassName(CalendlyEmbed.displayName, 'calendly-inline-widget')}
        embedHeight={embedHeight}
        embedHeightMobile={embedHeightMobile}
        data-url={url}
      />
      <Head>
        {/* NOTE(krishan711): async and defer to ensure it happens as late as possible */}
        <script async={true} defer={true} src='https://assets.evrpg.com/calendly-widget.js' />
      </Head>
      <noscript>
        <Text>
          {'Please '}
          <Link target={url} text='click here' />
          {' to choose a time.'}
        </Text>
      </noscript>
    </React.Fragment>
  );
};
CalendlyEmbed.displayName = 'CalendlyEmbed';
CalendlyEmbed.defaultProps = {
};
