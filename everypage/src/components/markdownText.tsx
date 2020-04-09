import React from 'react';
import Markdown from 'react-markdown';

import { IComponentProps, Text, ITextTheme, defaultComponentProps } from '.';


interface IMarkdownTextProps extends IComponentProps<ITextTheme> {
  text: string;
  alignment?: 'center' | 'left' | 'right' | 'justify';
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
  alignment: 'left',
}
