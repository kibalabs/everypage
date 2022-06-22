import React from 'react';

import { getClassName } from '@kibalabs/core';
import { MissingPropError, warnDeprecated } from '@kibalabs/core-react';
import { Alignment, Box, Direction, EqualGrid, KibaIcon, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyImage, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface ITeamBoxes {
  name: string
  image: string
  summaryText?: string
  bodyText?: string
  twitter?: string
  linkedin?: string
}

interface ITeamBoxesProps extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxVariant?: string;
  boxes?: ITeamBoxes[];
}

export const TeamBoxes = (props: ITeamBoxesProps): React.ReactElement => {
  warnDeprecated(TeamBoxes.displayName, props, 'boxMode', 'boxVariant');
  const boxVariant = props.boxVariant || props.boxMode;
  if (props.boxes == null) {
    throw new MissingPropError(TeamBoxes.displayName, 'boxes');
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(TeamBoxes.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={{ base: 12, small: 12, medium: 6, large: 4 }}>
              {props.boxes.map((box: ITeamBoxes, index: number): React.ReactElement => (
                <Box key={index} variant={boxVariant} isFullHeight={true}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} isFullWidth={true}>
                    <Box width='50px' height='50px'>
                      <LazyImage isFullHeight={true} isFullWidth={true} variant={'profile'} source={box.image} alternativeText={box.name} fitType='crop' />
                    </Box>
                    <Text>{box.name}</Text>
                    {box.summaryText && (
                      <MarkdownText textAlignment={TextAlignment.Left} source={box.summaryText} />
                    )}
                    {box.bodyText && (
                      <MarkdownText textAlignment={TextAlignment.Left} source={box.bodyText} />
                    )}
                    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} shouldAddGutters={true}>
                      {box.twitter && (
                        <React.Fragment>
                          <Text alignment={TextAlignment.Center} variant='bold'>{box.twitter}</Text>
                          <KibaIcon _color='#1DA1F2' iconId='ion-logo-twitter' />
                        </React.Fragment>
                      )}
                    </Stack>
                    <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} shouldAddGutters={true}>
                      {box.linkedin && (
                        <React.Fragment>
                          <Text alignment={TextAlignment.Left} variant='bold'>{box.linkedin}</Text>
                          <KibaIcon _color='#2867B2' iconId='ion-logo-linkedin' />
                        </React.Fragment>
                      )}
                    </Stack>
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
TeamBoxes.displayName = 'TeamBoxes-boxes-1';
TeamBoxes.defaultProps = {
  boxVariant: 'bordered',
};
