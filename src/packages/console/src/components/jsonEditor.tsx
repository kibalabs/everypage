import React from 'react';

import { deepCompare } from '@kibalabs/core';
import { useDeepCompareEffect } from '@kibalabs/core-react';
import JSONEditor, { NodeName } from 'jsoneditor';
import styled from 'styled-components';
import 'jsoneditor/dist/jsoneditor.css';

interface IJsonEditorProps {
  json: Record<string, undefined>;
  schema?: Record<string, undefined>;
  name?: string;
  isEditable: boolean;
  onJsonUpdated: (parsedJson: Record<string, undefined>) => void;
}

const StyledJsonEditor = styled.div`
  height: 100%;
  width: 100%;

  .jsoneditor,
  .jsoneditor-menu {
    border-width: 0;
  }
  .jsoneditor-menu {
    background-color: #333333;
  }
`;

export const JsonEditor = (props: IJsonEditorProps): React.ReactElement => {
  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = React.useState<JSONEditor | null>(null);
  const onJsonUpdatedTimeoutRef = React.useRef<number>(null);
  const onPropsJsonUpdatedTimeoutRef = React.useRef<number>(null);

  const onChangeText = (jsonText: string) => {
    if (onJsonUpdatedTimeoutRef.current) {
      clearTimeout(onJsonUpdatedTimeoutRef.current);
    }
    const timeout = setTimeout((): void => {
      try {
        props.onJsonUpdated(JSON.parse(jsonText));
      } catch (error) {
        console.warn('Caught error when parsing json');
      }
    }, 50);
    onJsonUpdatedTimeoutRef.current = timeout;
  };

  const calculateNodeName = (nodeName: NodeName): string | undefined => {
    if (nodeName.path.length === 0) {
      return 'site';
    }
    if (nodeName.path[0] === 'sections') {
      if (nodeName.path.length === 1) {
        return undefined;
      }
      if (nodeName.path.length === 2) {
        // @ts-ignore
        return props.json.sections[nodeName.path[1]].type;
      }
    }
    // if (nodeName.path)
    return undefined;
  };

  React.useLayoutEffect(() => {
    if (editorRef.current && !editor) {
      const newEditor = new JSONEditor(editorRef.current, {
        name: props.name || 'json',
        schema: props.schema,
        onChangeText,
        enableSort: false,
        enableTransform: false,
        onNodeName: calculateNodeName,
        onEditable: ((): boolean => props.isEditable),
        mode: 'code',
        modes: ['code'],
        mainMenuBar: false,
        statusBar: false,
      });
      setEditor(newEditor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('JsonEditor props.json', JSON.stringify(props.json));
  React.useEffect((): void | (() => void) => {
    if (!editor) {
      return;
    }

    if (!editor.get() || Object.keys(editor.get()).length === 0) {
      editor.update(props.json);
      return;
    }

    if (onPropsJsonUpdatedTimeoutRef.current) {
      console.log('clearing old one');
      clearTimeout(onPropsJsonUpdatedTimeoutRef.current);
      onPropsJsonUpdatedTimeoutRef.current = null;
    }

    const timeout = setTimeout((): void => {
      if (!deepCompare(props.json, editor.get())) {
        console.log('JsonEditor Updating content');
        console.log('props.json', JSON.stringify(props.json));
        console.log('editor.get()', JSON.stringify(editor.get()));
        editor.update(props.json);
      }
      onPropsJsonUpdatedTimeoutRef.current = null;
    }, 2500);
    console.log('updating timeout', JSON.stringify(props.json));
    onPropsJsonUpdatedTimeoutRef.current = timeout;

    return (): void => {
      if (onPropsJsonUpdatedTimeoutRef.current) {
        console.log('unmounting old one');
        clearTimeout(onPropsJsonUpdatedTimeoutRef.current);
        onPropsJsonUpdatedTimeoutRef.current = null;
      }
    }
  }, [editor, props.json]);

  return (
    <StyledJsonEditor
      ref={editorRef}
    />
  );
};
JsonEditor.defaultProps = {
  isEditable: true,
};
