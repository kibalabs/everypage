import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { Stack, ResponsiveContainingView, TextAlignment, Direction, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';
import { EverypagePaddingSize } from '../internal';
import { Head } from '../util';

interface ICalendlyBooking1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  username: string;
  calendarId: string;
  shouldHideEventType?: boolean;
}

export const CalendlyBooking1 = (props: ICalendlyBooking1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(CalendlyBooking1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={PaddingSize.Default}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <CalendlyEmbed username={props.username} calendarId={props.calendarId} shouldHideEventType={props.shouldHideEventType} />
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
CalendlyBooking1.displayName = 'calendly-booking-1';
CalendlyBooking1.defaultProps = {
};

interface ICalendelyEmbedProps {
  username: string;
  calendarId: string;
  shouldHideEventType?: boolean;
}

interface IStyledCalendlyEmbedProps {
  shouldHideEventType?: boolean;
}

const StyledCalendlyEmbed = styled.div<IStyledCalendlyEmbedProps>`
  height: ${(props: IStyledCalendlyEmbedProps): string => props.shouldHideEventType ? '600px' : '950px'};
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  @media (min-width: 795px) {
    height: ${(props: IStyledCalendlyEmbedProps): string => props.shouldHideEventType ? '700px' : '1050px'};
    margin-top: -66px;
    margin-bottom: -30px;
    box-shadow: none;
  }
`;

const CalendlyEmbed = (props: ICalendelyEmbedProps): React.ReactElement => {
  let url = `https://calendly.com/${props.username}/${props.calendarId}?hide_event_type_details=${props.shouldHideEventType ? 1 : 0}`;
  return (
    <React.Fragment>
      <StyledCalendlyEmbed
        className={getClassName(CalendlyEmbed.displayName, 'calendly-inline-widget')}
        shouldHideEventType={props.shouldHideEventType}
        data-url={url}
      />
      <Head>
        <script src='https://assets.calendly.com/assets/external/widget.js' />
      </Head>
    </React.Fragment>
  );
};
CalendlyEmbed.displayName = 'calendly-embed';
CalendlyEmbed.defaultProps = {
};
