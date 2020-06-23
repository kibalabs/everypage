import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Button, Markdown, Spacing, SpacingSize, TextAlignment, Stack, Direction, Alignment } from '@kibalabs/ui-react';

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
        <Grid.Item size={1} sizeSmall={2} sizeLarge={3}><div /></Grid.Item>
        <Grid.Item size={10} sizeSmall={8} sizeLarge={6}>
          <Stack direction={Direction.Vertical}>
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
            <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
            {props.subtitleText && <Markdown rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            <Spacing mode={SpacingSize.ExtraWide} />
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true}>
              <Stack.Item growthFactor={1} shrinkFactor={1} />
              {props.buttons.map((button: IButtons1Button, index: number): React.ReactElement => {
                return (
                  <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />
                );
              })}
              <Stack.Item growthFactor={1} shrinkFactor={1} />
            </Stack>
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
Buttons1.displayName = 'buttons-1';
Buttons1.defaultProps = {
};
