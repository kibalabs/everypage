import React from 'react';

import { getClassName } from '@kibalabs/core';
import { MissingPropError, warnDeprecated } from '@kibalabs/core-react';
import { Alignment, Box, Direction, EqualGrid, IconButton, KibaIcon, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { ISectionProps, Section } from '.';
import { LazyImage, SectionSubtitleText, SectionTitleText } from '../components';
import { EverypagePaddingSize } from '../internal';

interface ITeamBoxes1IconButton {
  iconId?: string;
  target: string;
  label?: string;
  variant?: string;
}

interface ITeamBoxes1 {
  name: string
  imageUrl?: string
  summaryText?: string
  bodyText?: string
  iconButtons?: ITeamBoxes1IconButton[];
}

interface ITeamBoxes1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  boxMode?: string;
  boxVariant?: string;
  boxes?: ITeamBoxes1[];
}

export const TeamBoxes1 = (props: ITeamBoxes1Props): React.ReactElement => {
  warnDeprecated(TeamBoxes1.displayName, props, 'boxMode', 'boxVariant');
  const boxVariant = props.boxVariant || props.boxMode;
  if (props.boxes == null) {
    throw new MissingPropError(TeamBoxes1.displayName, 'boxes');
  }
  return (
    <Section {...props as ISectionProps} className={getClassName(TeamBoxes1.displayName, props.className)}>
      <ResponsiveContainingView size={10}>
        <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
          <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.SectionTop} paddingEnd={EverypagePaddingSize.SectionBottom}>
            {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><SectionTitleText text={props.titleText} /></Stack.Item>}
            {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText} /></Stack.Item>}
            <EqualGrid childAlignment={Alignment.Fill} shouldAddGutters={true} childSizeResponsive={{ base: 12, small: 12, medium: 6, large: 4 }}>
              {props.boxes.map((box: ITeamBoxes1, index: number): React.ReactElement => (
                <Box key={index} variant={boxVariant} isFullHeight={true}>
                  <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} paddingStart={PaddingSize.Wide} shouldAddGutters={true}>
                    {box.imageUrl && (<LazyImage source={box.imageUrl} alternativeText={box.name || `team member ${box.name} imageUrl`} fitType='crop' />)}
                    <Spacing variant={PaddingSize.Wide} />
                    <Text variant='header4'>{box.name}</Text>
                    {box.summaryText && (
                      <MarkdownText textVariant='bold' textAlignment={TextAlignment.Center} source={box.summaryText} />
                    )}
                    {box.bodyText && (
                      <MarkdownText textAlignment={TextAlignment.Center} source={box.bodyText} />
                    )}
                    {box.iconButtons && (
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} shouldWrapItems={true}>
                        {box.iconButtons.map((iconButton: ITeamBoxes1IconButton, innerIndex: number): React.ReactElement => (
                          <IconButton key={innerIndex} target={iconButton.target} variant={iconButton.variant} icon={<KibaIcon iconId={iconButton.iconId || 'ion-globe'} />} />
                        ))}
                      </Stack>
                    )}
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
TeamBoxes1.displayName = 'team-boxes-1';
TeamBoxes1.defaultProps = {
  boxVariant: 'bordered',
};
