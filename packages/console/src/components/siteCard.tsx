import React from 'react';

import { BackgroundView, Box, Direction, Image, LinkBase, PaddingSize, Stack, Text } from '@kibalabs/ui-react';

import { Site } from '../everypageClient/resources';


interface ISiteCardProps {
  site: Site;
  isEnabled: boolean;
  onSiteClicked: (site: Site) => void;
}

export const SiteCard = (props: ISiteCardProps): React.ReactElement => {
  const onSiteClicked = (): void => {
    props.onSiteClicked(props.site);
  };

  return (
    <BackgroundView color={!props.isEnabled && '#eee'}>
      <Box variant='card-unpadded' shouldClipContent={true}>
        <LinkBase onClicked={onSiteClicked} isEnabled={props.isEnabled} isFullWidth={true}>
          <Stack direction={Direction.Vertical} isFullWidth={true}>
            <Image
              maxHeight='200px'
              source={`https://${props.site.slug}.evrpg.com/screenshot-preview.png`}
              alternativeText={props.site.name}
            />
            <Box variant='padded' isFullWidth={true}>
              <Stack direction={Direction.Vertical} paddingHorizontal={PaddingSize.Default} paddingVertical={PaddingSize.Wide1}>
                <Text tag='h6' variant='bold'>{props.site.name}</Text>
                <Text variant='light'>{props.site.slug}</Text>
              </Stack>
            </Box>
          </Stack>
        </LinkBase>
      </Box>
    </BackgroundView>
  );
};
SiteCard.defaultProps = {
  isEnabled: true,
};
