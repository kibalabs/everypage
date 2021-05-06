import React from 'react';

import { BackgroundView, Box, Direction, Image, PaddingSize, Stack, Text } from '@kibalabs/ui-react';
import CardActionArea from '@material-ui/core/CardActionArea';

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
      <Box variant='card-unpadded'>
        <CardActionArea style={{ width: '100%' }} onClick={onSiteClicked} disabled={!props.isEnabled}>
          <Image
            isFullHeight={false}
            source={`https://${props.site.slug}.evrpg.com/screenshot-preview.png`}
            alternativeText={props.site.name}
          />
          <Box variant='padded' isFullWidth={true}>
            <Stack direction={Direction.Vertical} paddingVertical={PaddingSize.Wide1}>
              <Text tag='h6' variant='bold'>
                {props.site.name}
              </Text>
              <Text variant='light'>
                {props.site.slug}
              </Text>
            </Stack>
          </Box>
        </CardActionArea>
      </Box>
    </BackgroundView>
  );
};
SiteCard.defaultProps = {
  isEnabled: true,
};
