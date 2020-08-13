import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Button, PaddingSize, Stack, Direction, Alignment, TextAlignment, ResponsiveTextAlignmentView, KibaIcon } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';

interface IButtons1Button {
  text: string;
  target: string;
  mode?: string;
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
      <ResponsiveContainingView size={10} sizeSmall={8} sizeLarge={6}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraExtraWide}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
              {props.buttons.map((button: IButtons1Button, index: number): React.ReactElement => {
                return (
                  <Button
                    key={index}
                    text={button.text}
                    onClicked={(): void => {window.open(button.target)}} mode={button.mode}
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
