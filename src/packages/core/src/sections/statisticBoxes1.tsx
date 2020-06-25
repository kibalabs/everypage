import React from 'react';

import { Section, ISectionProps } from '.';
import { Markdown, Stack, Alignment, Spacing, TextAlignment, Grid, EqualGrid, Box, Text, Direction } from '@kibalabs/ui-react';

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
        <Grid.Item size={10} sizeLarge={12}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode='wide' />
            <Stack childAlignment={Alignment.Fill} isFullWidth={true}>
              <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
              {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            </Stack>
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={3} childSizeMedium={4} childSizeSmall={6}>
              {props.boxes.map((box: IStatisticBoxes1Box, index: number): React.ReactElement => (
                <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true}>
                    <Text alignment={TextAlignment.Center} mode='supersize'>{box.value}</Text>
                    <Spacing direction={Direction.Vertical} mode='narrow' />
                    <Markdown rootTextAlignment={TextAlignment.Center} source={box.name} />
                  </Stack>
                </Box>
              ))}
            </EqualGrid>
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
