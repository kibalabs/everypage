import React from 'react';

import { Alignment, Box, Direction, IconButton, KibaIcon, Stack, Text } from '@kibalabs/ui-react';
import { deepCompare } from '@kibalabs/core';
import { IWebsiteSection } from '@kibalabs/everypage/src/model/website';

interface ISectionCardSectionProps {
  id?: string;
  titleText?: string;
  type: string;
}

interface ISiteSectionCardProps {
  section: ISectionCardSectionProps;
  cardIndex: number;
  onMoveUpClicked: (cardIndex: number) => void;
  onMoveDownClicked: (cardIndex: number) => void;
  onDeleteClicked: (cardIndex: number) => void;
}

const extractSiteSectionCardSectionProps = (section: IWebsiteSection): ISectionCardSectionProps => {
  return {
    id: section.id,
    titleText: section.titleText ? String(section.titleText) : undefined,
    type: section.type,
  }
}

const deepCompareProps = (obj1: any, obj2: any) => {
  const cleanedObj1 = {
    ...obj1,
    section: extractSiteSectionCardSectionProps(obj1.section),
  };
  const cleanedObj2 = {
    ...obj2,
    section: extractSiteSectionCardSectionProps(obj2.section),
  };
  return deepCompare(cleanedObj1, cleanedObj2);
}

export const SiteSectionCard = React.memo((props: ISiteSectionCardProps): React.ReactElement => {
  const title = props.section.id || props.section.titleText || 'Untitled';

  const onMoveUpClicked = (): void => {
    props.onMoveUpClicked(props.cardIndex);
  };

  const onMoveDownClicked = (): void => {
    props.onMoveDownClicked(props.cardIndex);
  };

  return (
    <Box variant='bordered'>
      <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start}>
        <Text variant='header5'>{title}</Text>
        <Stack direction={Direction.Horizontal}>
          <Stack.Item growthFactor={1} alignment={Alignment.End}>
            <Text variant='note'>{props.section.type}</Text>
          </Stack.Item>
          <IconButton
            variant='small-passive'
            icon={<KibaIcon iconId='ion-arrow-up' variant='small' />}
            onClicked={onMoveUpClicked}
          />
          <IconButton
            variant='small-passive'
            icon={<KibaIcon iconId='ion-arrow-down' variant='small' />}
            onClicked={onMoveDownClicked}
          />
          {/* <IconButton
            variant='small-passive'
            icon={<KibaIcon iconId='ion-trash' variant='small' />}
            onClicked={props.onDeleteClicked}
          /> */}
        </Stack>
      </Stack>
    </Box>
  );
}, deepCompareProps);

SiteSectionCard.displayName = 'SiteSectionCard';
