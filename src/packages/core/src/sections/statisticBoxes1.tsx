import React from 'react';
import { getClassName } from '@kibalabs/core';
import { MarkdownText, Stack, Alignment, Spacing, TextAlignment, ResponsiveContainingView, EqualGrid, Box, Text, Direction, PaddingSize, ResponsiveTextAlignmentView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { SectionTitleText, SectionSubtitleText } from '../components';

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
    <Section {...props as ISectionProps} className={getClassName(StatisticBoxes1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={PaddingSize.ExtraExtraWide} paddingEnd={PaddingSize.ExtraExtraWide}>
            {props.titleText && <Stack.Item gutterSizeAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.ExtraWide}><SectionTitleText text={props.titleText}/></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterSizeAfter={PaddingSize.ExtraWide}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeLarge={3} childSizeMedium={4} childSizeSmall={6}>
              {props.boxes.map((box: IStatisticBoxes1Box, index: number): React.ReactElement => (
                <Box key={index} mode={props.boxMode} isFullHeight={props.boxMode !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true}>
                    <Text alignment={TextAlignment.Center} mode='supersize'>{box.value}</Text>
                    <Spacing direction={Direction.Vertical} mode='narrow' />
                    <MarkdownText textAlignment={TextAlignment.Center} source={box.name} />
                  </Stack>
                </Box>
              ))}
            </EqualGrid>
          </Stack>
        </ResponsiveTextAlignmentView>
      </ResponsiveContainingView>
    </Section>
  );
};
StatisticBoxes1.displayName = 'statistic-boxes-1';
StatisticBoxes1.defaultProps = {
  boxMode: 'default',
};
