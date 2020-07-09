import React from 'react';
import { getClassName } from '@kibalabs/core';
import { ResponsiveContainingView, Button, Markdown, Spacing, PaddingSize, TextAlignment, Stack, Direction, Alignment } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';

interface IButtons1Button {
  text: string;
  target: string;
  mode?: string;
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
        <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraWide}>
          <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
          {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
          <Spacing mode={PaddingSize.ExtraWide} />
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
            {props.buttons.map((button: IButtons1Button, index: number): React.ReactElement => {
              return (
                <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />
              );
            })}
          </Stack>
        </Stack>
      </ResponsiveContainingView>
    </Section>
  );
};
Buttons1.displayName = 'buttons-1';
Buttons1.defaultProps = {
};
