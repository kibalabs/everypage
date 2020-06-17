import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, Box, Text, ITextTheme, TextAlignment, defaultComponentProps } from '..';


interface IMarkdownTextProps extends IComponentProps<ITextTheme> {
  text: string;
  alignment?: TextAlignment;
}

export const MarkdownText = (props: IMarkdownTextProps): React.ReactElement => {
  const shouldAllowNode = (node: ReactMarkdown.MarkdownAbstractSyntaxTree, index: number, parent: ReactMarkdown.NodeType): boolean => {
    if (node.type === 'paragraph' && parent.children.length === 1) {
      return false;
    }
    return true;
  }

  const renderers: ReactMarkdown.Renderers = {
    root: (rendererProps: object): React.ReactElement => {
      return React.Children.count(rendererProps.children) === 1 ? (
        <Text
          { ...props }
          className={rendererProps.className}
        >
          {rendererProps.children}
        </Text>
      ) : (
        <Box
          { ...props }
          className={rendererProps.className}
          mode='transparent'
        >
          {rendererProps.children}
        </Box>
      );
    },
    // paragraph: (rendererProps: object): React.ReactElement => {
    //   console.log('paragraph rendererProps', rendererProps);
    //   return (<Text>{rendererProps.children}</Text>);
    // },
  };

  return (
    <ReactMarkdown
      className={getClassName('markdown-text', props.className)}
      allowNode={shouldAllowNode}
      unwrapDisallowed={true}
      renderers={renderers}
      includeNodeIndex={true}
      source={props.text}
    />
  )
};

MarkdownText.defaultProps = {
  ...defaultComponentProps,
}
