import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Button, Markdown, Spacing, PaddingSize, TextAlignment, Stack, Direction, Alignment } from '@kibalabs/ui-react';

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
    <Section {...props as ISectionProps}>
      <Grid>
        <Grid.Item size={10} sizeSmall={8} sizeLarge={6}>
          <Stack direction={Direction.Vertical}>
            <Spacing mode={PaddingSize.ExtraExtraWide}/>
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
            <Spacing mode={PaddingSize.ExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
Buttons1.displayName = 'buttons-1';
Buttons1.defaultProps = {
};
