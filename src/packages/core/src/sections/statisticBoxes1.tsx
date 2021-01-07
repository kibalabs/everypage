import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Alignment, Box, Direction, EqualGrid, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';
import { MissingPropError, warnDeprecated } from '../util';

interface IStatisticBoxes1Box {
  value: string;
  name: string;
}

interface IStatisticBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxVariant?: string;
  boxes?: IStatisticBoxes1Box[];
}

export const StatisticBoxes1 = (props: IStatisticBoxes1Props): React.ReactElement => {
  warnDeprecated(StatisticBoxes1.displayName, props, 'boxMode', 'boxVariant');
  const boxVariant = props.boxVariant || props.boxMode;
  if (props.boxes == null) {
    throw new MissingPropError(StatisticBoxes1.displayName, 'boxes');
  }
  
  return (
    <Section {...props as ISectionProps} className={getClassName(StatisticBoxes1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={{ base: 12, small: 6, medium: 4, large: 3 }}>
              {props.boxes.map((box: IStatisticBoxes1Box, index: number): React.ReactElement => (
                <Box key={index} variant={boxVariant} isFullHeight={boxVariant !== 'card'}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} isFullWidth={true}>
                    <Text alignment={TextAlignment.Center} variant='supersize'>{box.value}</Text>
                    <Spacing direction={Direction.Vertical} variant='narrow' />
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
  boxVariant: 'default',
};
