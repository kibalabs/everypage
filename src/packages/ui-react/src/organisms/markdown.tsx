import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getClassName } from '@kibalabs/core';

import { Box, Text, TextAlignment, Media } from '..';

interface IMarkdownProps {
  id?: string;
  className?: string;
  source: string;
  rootTextAlignment?: TextAlignment;
  rootTextMode?: string;
  rootBoxMode?: string;
}

export const Markdown = (props: IMarkdownProps): React.ReactElement => {
  const shouldAllowNode = (node: ReactMarkdown.MarkdownAbstractSyntaxTree, index: number, parent: ReactMarkdown.NodeType): boolean => {
    if (node.type === 'paragraph') {
      if (parent.children.length === 1) {
        return false;
      }
      if (node.children.length === 0) {
        return false;
      }
      if (node.children.length === 1 && node.children[0].type !== 'text') {
        return false;
      }
    }
    return true;
  }

  const renderers: ReactMarkdown.Renderers = {
    root: (rendererProps: object): React.ReactElement => {
      // TODO(krish): log error if root*Mode is provided but root is a different type
      const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactElement): string => String(child.key).split('-')[0]);
      return React.Children.count(rendererProps.children).length === 1 || childrenKeys[0] === 'text' ? (
        <Text
          id={props.id}
          mode={props.rootTextMode}
          alignment={props.rootTextAlignment}
          className={rendererProps.className}
        >
          {rendererProps.children}
        </Text>
      ) : (
        <Box
          id={props.id}
          mode={props.rootBoxMode}
          className={rendererProps.className}
        >
          {rendererProps.children}
        </Box>
      );
    },
    image: (rendererProps: object): React.ReactElement => {
      return <Media isCenteredHorizontally={true} source={rendererProps.src} alternativeText={rendererProps.alt}/>;
    },
    paragraph: (rendererProps: object): React.ReactElement => {
      const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactElement): string => String(child.key).split('-')[0]);
      return (<Text alignment={childrenKeys.indexOf('image') > -1 ? TextAlignment.Center : TextAlignment.Left}>{rendererProps.children}</Text>);
    },
  };

  return (
    <ReactMarkdown
      className={getClassName('markdown-text', props.className)}
      allowNode={shouldAllowNode}
      unwrapDisallowed={true}
      renderers={renderers}
      includeNodeIndex={true}
      source={props.source}
    />
  )
};

Markdown.defaultProps = {
  className: '',
}
