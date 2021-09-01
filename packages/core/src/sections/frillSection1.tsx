import React from 'react';

import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { Direction, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';
import { Head } from '../util';
import { useInitialization } from '@kibalabs/core-react';

interface IFrillWidget1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  frillKey: string;
};

export const FrillWidget1 = (props: IFrillWidget1Props): React.ReactElement => {
  return <Section {...props as ISectionProps} className={getClassName(FrillWidget1.displayName, props.className)}>
    <ResponsiveContainingView size={10}>
      <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
        <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
          {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
          {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
          <FrillEmbed widgetKey={props.frillKey || "11153d6c-cf12-4e26-ae28-4cda8848abf7"} />
        </Stack>
      </ResponsiveTextAlignmentView>
    </ResponsiveContainingView>
  </Section>;
}

FrillWidget1.displayName = 'frill-widget';
FrillWidget1.defaultProps = {
};

declare global {
  interface Window {
    Frill: Frill;
    Frill_Config: FrillConfig[];
  }

  class Frill {
    widget(config: FrillConfig): FrillWidget;
  }

  class FrillWidget {
    open(): void;
    close(): void;
    destroy(): void;
  }

  interface FrillConfig {
    key: string;
    container?: HTMLElement;
    ssoToken?: string;
    callbacks: {
      onReady(frillWidget: FrillWidget): void;
    };
  }
}

interface IFrillEmbedProps {
  widgetKey: string;
};

interface IStyledFrillEmbed {
  // style props width and height maybe
}

const StyledFrillEmbed = styled.div<IStyledFrillEmbed>`
  height: 600px;
  border: 1px solid #000;
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  @media (min-width: 827px) {
    height: 700px;
    margin-top: -66px;
    margin-bottom: -30px;
    box-shadow: none;
  }

  .no-js & {
    display: none;
  }
`;

const FrillEmbed = (props: IFrillEmbedProps): React.ReactElement => {
  const url = `https://widget.frill.co/v2/widget.js`;
  const widgetRef = React.useRef<HTMLDivElement>(null);

  useInitialization(() => {

    if(!props.widgetKey){
      console.error('widgetKey should be provided to Frill');
      return;
    }
    let widget: FrillWidget;

    const config: FrillConfig = {
      key: props.widgetKey, // <-- Add Widget key here
      container: widgetRef.current!,
      callbacks: {
        onReady: (frillWidget) => {
          widget = frillWidget;
        },
      },
    };

    window.Frill_Config = window.Frill_Config || [];
    window.Frill_Config.push(config);

    if ('Frill' in window) {
      widget = window.Frill.widget(config);
      console.log("Frill found")
    }else{
      console.log("Frill not found")
    }

    return () => {
      widget?.destroy();
      window.Frill_Config = window.Frill_Config.filter((c) => c !== config);
    };
  });

  return (
    <React.Fragment>
      <StyledFrillEmbed
        ref={widgetRef}
        className={getClassName(FrillEmbed.displayName, 'frill-inline-widget')}
        data-url={url}
      />
      <Head>
        {/* NOTE(krishan711): async and defer to ensure it happens as late as possible */}
        <script async={true} defer={true} src={url} />
      </Head>
    </React.Fragment>
  );
};
FrillEmbed.displayName = 'FrillEmbed';
FrillEmbed.defaultProps = {
};
