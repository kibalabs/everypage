import React from 'react';

import { deepCompare } from '@kibalabs/core';
import { IWebsiteSection } from '@kibalabs/everypage/src/model/website';
import { Alignment, Box, Direction, IconButton, KibaIcon, Stack, Text } from '@kibalabs/ui-react';

interface ISectionCardSectionProps {
  id?: string;
  titleText?: string;
  type: string;
}

interface ISiteSectionCardProps {
  section: IWebsiteSection;
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
  };
};

const deepCompareProps = (oldProps: ISiteSectionCardProps, newProps: ISiteSectionCardProps) => {
  const cleanedObj1 = {
    ...oldProps,
    section: extractSiteSectionCardSectionProps(oldProps.section),
  };
  const cleanedObj2 = {
    ...newProps,
    section: extractSiteSectionCardSectionProps(newProps.section),
  };
  return deepCompare(cleanedObj1, cleanedObj2);
};

export const SiteSectionCard = React.memo((props: ISiteSectionCardProps): React.ReactElement => {
  const title = props.section.id || props.section.titleText || 'Untitled';

  const onMoveUpClicked = (): void => {
    props.onMoveUpClicked(props.cardIndex);
  };

  const onDeleteClicked = (): void => {
    props.onDeleteClicked(props.cardIndex);
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
          <IconButton
            variant='small-passive'
            icon={<KibaIcon iconId='ion-trash' variant='small' />}
            onClicked={onDeleteClicked}
          />
        </Stack>
      </Stack>
    </Box>
  );
}, deepCompareProps);

SiteSectionCard.displayName = 'SiteSectionCard';
