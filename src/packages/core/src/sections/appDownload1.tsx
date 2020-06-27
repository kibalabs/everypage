import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Markdown, Spacing, SpacingSize, TextAlignment, Stack, Direction, Alignment, IosDownloadButton, AndroidDownloadButton } from '@kibalabs/ui-react';
import { useWebsite } from '../util';

// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IAppDownload1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  iosAppId?: string;
  androidAppId?: string;
}

export const AppDownload1 = (props: IAppDownload1Props): React.ReactElement => {
  const website = useWebsite();
  const iosAppId = props.iosAppId || website.iosAppId;
  const androidAppId = props.androidAppId || website.androidAppId;

  return (
    <Section {...props as ISectionProps}>
      <Grid>
        <Grid.Item size={10} sizeSmall={8} sizeLarge={6}>
          <Stack direction={Direction.Vertical}>
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
            <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>
            {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            <Spacing mode={SpacingSize.ExtraWide} />
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true}>
              <Stack.Item growthFactor={1} shrinkFactor={1} />
              {iosAppId && <Stack.Item shrinkFactor={1}><IosDownloadButton appId={iosAppId} /></Stack.Item>}
              {androidAppId && <Stack.Item shrinkFactor={1}><AndroidDownloadButton appId={androidAppId} /></Stack.Item>}
              <Stack.Item growthFactor={1} shrinkFactor={1} />
            </Stack>
            <Spacing mode={SpacingSize.ExtraExtraWide}/>
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
AppDownload1.displayName = 'app-download-1';
AppDownload1.defaultProps = {
};
