import React from 'react';
import { IWebsiteSection } from '@kibalabs/everypage-core'
import { Box, Text, Stack, Direction, IconButton, KibaIcon, Alignment } from '@kibalabs/ui-react'

interface ISiteSectionCardProps {
  section: IWebsiteSection;
  onMoveUpClicked: () => void;
  onMoveDownClicked: () => void;
  onDeleteClicked: () => void;
}

export const SiteSectionCard = (props: ISiteSectionCardProps): React.ReactElement => {
  const title = props.section.id || props.section.titleText || 'Untitled';
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
            onClicked={props.onMoveUpClicked}
          />
          <IconButton
            variant='small-passive'
            icon={<KibaIcon iconId='ion-arrow-down' variant='small' />}
            onClicked={props.onMoveDownClicked}
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
}
