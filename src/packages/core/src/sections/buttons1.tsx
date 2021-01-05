import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Button, Direction, KibaIcon, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface IButtons1Button {
  text: string;
  target: string;
  mode?: string;
  variant?: string;
  iconIdRight?: string;
  iconIdLeft?: string;
}

interface IButtons1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  buttons?: IButtons1Button[];
}

export const Buttons1 = (props: IButtons1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps} className={getClassName(Buttons1.displayName, props.className)}>
      <ResponsiveContainingView sizeResponsive={{ base: 10, small: 8, large: 6 }}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
              {props.buttons.map((button: IButtons1Button, index: number): React.ReactElement => {
                return (
                  <Button
                    key={index}
                    text={button.text}
                    variant={button.variant || button.mode}
                    target={button.target}
                    iconLeft={button.iconIdLeft ? <KibaIcon iconId={button.iconIdLeft} /> : undefined}
                    iconRight={button.iconIdRight ? <KibaIcon iconId={button.iconIdRight} /> : undefined}
                  />
                );
              })}
            </Stack>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
Buttons1.displayName = 'buttons-1';
Buttons1.defaultProps = {
};
