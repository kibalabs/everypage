import React from 'react';

import { Section, ISectionProps } from '.';
import { Grid, Alignment, Markdown, Spacing, TextAlignment, Stack, PaddingSize } from '@kibalabs/ui-react';

interface IMarkdown1Props extends ISectionProps {
  titleText?: string;
  subtitleText?: string;
  markdownContent?: string;
}

export const Markdown1 = (props: IMarkdown1Props): React.ReactElement => {
  return (
    <Section {...props as ISectionProps}>
      <Grid childAlignment={Alignment.Fill}>
        <Grid.Item size={10} sizeLarge={8}>
          <Stack childAlignment={Alignment.Fill} isFullWidth={true} shouldAddGutters={true}>
            <Spacing mode={PaddingSize.Wide} />
            {props.titleText && <Markdown rootTextMode='title' rootTextAlignment={TextAlignment.Center} source={props.titleText}/>}
            {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Center} source={props.subtitleText}/>}
            {(props.titleText || props.subtitleText) && <Spacing mode={PaddingSize.Default} />}
            {props.markdownContent && <Markdown rootTextAlignment={TextAlignment.Left} source={props.markdownContent}/>}
            <Spacing mode={PaddingSize.Wide} />
          </Stack>
        </Grid.Item>
      </Grid>
    </Section>
  );
};
Markdown1.displayName = 'markdown-1';
Markdown1.defaultProps = {
};
