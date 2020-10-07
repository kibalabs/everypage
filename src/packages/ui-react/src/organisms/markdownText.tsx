import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getClassName } from '@kibalabs/core';

import { TextAlignment, TextTag, Link } from '..';
import { PrettyText } from '../atoms/prettyText/component';

interface IMarkdownTextProps {
  id?: string;
  className?: string;
  source: string;
  textAlignment?: TextAlignment;
  textVariant?: string;
  textTag?: TextTag;
}

export const MarkdownText = (props: IMarkdownTextProps): React.ReactElement => {
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

  const mergeVariants = (...variants: (string | undefined | null)[]): string => {
    const values = [];
    variants.forEach((arg: string | undefined | null): void => {
      if (arg) {
        values.push(String(arg).trim());
      }
    });
    return values.join('-');
  }

  const renderers: ReactMarkdown.Renderers = {
    root: (rendererProps: object): React.ReactElement => {
      // TODO(krish): what should this check? It cant run the below check cos would fail for markdown like: "**Hello** world"
      // const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactElement): string => String(child.key).split('-')[0]);
      // if (React.Children.count(rendererProps.children) > 1 && childrenKeys[0] !== 'text') {
      //   console.log('rendererProps.children', rendererProps.children);
      //   throw new Error('MarkdownText only supports having one text child!')
      // }
      return (
        <PrettyText
          id={props.id}
          className={rendererProps.className}
          variant={mergeVariants(props.textVariant, 'unmargined')}
          tag={props.textTag}
          alignment={props.textAlignment}
        >
          {rendererProps.children}
        </PrettyText>
      );
    },
    link: (rendererProps: object): React.ReactElement => {
      if (rendererProps.children.length > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      return <Link target={rendererProps.href} text={String(rendererProps.children[0].props.children)}/>;
    },
    linkReference: (rendererProps: object): React.ReactElement => {
      if (rendererProps.children.length > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      return <Link target={rendererProps.href} text={String(rendererProps.children[0].props.children)}/>;
    },
    emphasis: (rendererProps: object): React.ReactElement => {
      return <em>{rendererProps.children}</em>
    },
    strong: (rendererProps: object): React.ReactElement => {
      return <strong>{rendererProps.children}</strong>
    },
  };

  return (
    <ReactMarkdown
      id={props.id}
      className={getClassName(MarkdownText.displayName, props.className)}
      allowNode={shouldAllowNode}
      unwrapDisallowed={true}
      renderers={renderers}
      includeNodeIndex={true}
      escapeHtml={false}
      source={props.source.replace(/\n/g, '<br/>')}
    />
  )
};

MarkdownText.defaultProps = {
  className: '',
};
MarkdownText.displayName = 'markdown-text';
