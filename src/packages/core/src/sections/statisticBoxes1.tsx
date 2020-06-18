import React from 'react';

import { Section, ISectionProps } from '.';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, Grid, Box, Text, Direction, useTheme, ITheme } from '@kibalabs/ui-react';

interface IStatisticBoxes1Box {
  value: string;
  name: string;
}

interface IStatisticBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxes?: IStatisticBoxes1Box[];
}

export const StatisticBoxes1 = (props: IStatisticBoxes1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={1} sizeLarge={0}><div /></Grid.Item>
        <Grid.Item size={10} sizeLarge={12}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              <MarkdownText mode='title' alignment={TextAlignment.Center} text={props.titleText}/>
              {props.subtitleText && <MarkdownText alignment={TextAlignment.Center} text={props.subtitleText}/>}
            </Stack>
            <Grid childAlignment={Alignment.Fill} shouldAddGutters={true}>
              {props.boxes.map((box: IStatisticBoxes1Box, index: number): React.ReactElement => (
                <Grid.Item key={index} sizeLarge={3} sizeMedium={4} sizeSmall={6}>
                  <Box mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                    <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true}>
                      <Text alignment={TextAlignment.Center} mode='supersize'>{box.value}</Text>
                      <Spacing direction={Direction.Vertical} mode='narrow' />
                      <MarkdownText alignment={TextAlignment.Center} text={box.name} />
                    </Stack>
                  </Box>
                </Grid.Item>
              ))}
            </Grid>
            <Spacing mode='wide' />
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
StatisticBoxes1.displayName = 'statistic-boxes-1';
StatisticBoxes1.defaultProps = {
  boxMode: 'default',
};
