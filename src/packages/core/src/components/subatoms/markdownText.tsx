import React from 'react';
import Markdown from 'react-markdown';

import { IComponentProps, Text, ITextTheme, TextAlignment, defaultComponentProps } from '..';


interface IMarkdownTextProps extends IComponentProps<ITextTheme> {
  text: string;
  alignment?: TextAlignment;
}

export const MarkdownText = (props: IMarkdownTextProps): React.ReactElement => {
  return (
    <Text
      { ...props }
      className={`markdown-text ${props.className}`}
    >
      <Markdown source={props.text} />
    </Text>
  )
};

MarkdownText.defaultProps = {
  ...defaultComponentProps,
}
