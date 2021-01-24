import React from 'react';

import { deepCompare } from '@kibalabs/core';
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

const useDebouncedCallback = (delayMillis = 30000): [(callback: (() => void)) => void, () => void] => {
  const timeoutRef = React.useRef<number>(null);
  const callbackRef = React.useRef<() => void>(null);

  const clearCallback = React.useCallback((): void => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      callbackRef.current = null;
    }
  }, []);

  const setCallback = React.useCallback((callback: (() => void)): void => {
    clearCallback();
    callbackRef.current = callback;
    timeoutRef.current = setTimeout((): void => {
      callbackRef.current();
      timeoutRef.current = null;
      callbackRef.current = null;
    }, delayMillis);
  }, [delayMillis, clearCallback]);

  return [setCallback, clearCallback];
};

export const JsonEditor = (props: IJsonEditorProps): React.ReactElement => {
  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = React.useState<JSONEditor | null>(null);
  const [setJsonUpdatedCallback] = useDebouncedCallback(100);
  const [setPropsUpdatedCallback, clearPropsUpdatedCallback] = useDebouncedCallback(500);

  const onChangeText = (jsonText: string) => {
    clearPropsUpdatedCallback();
    setJsonUpdatedCallback((): void => {
      try {
        props.onJsonUpdated(JSON.parse(jsonText));
      } catch (error) {
        console.warn('Caught error when parsing json');
      }
    });
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

  React.useEffect((): (void | (() => void)) => {
    if (!editor) {
      return;
    }

    if (!editor.get() || Object.keys(editor.get()).length === 0) {
      editor.update(props.json);
      return;
    }

    setPropsUpdatedCallback((): void => {
      if (!deepCompare(props.json, editor.get())) {
        editor.update(props.json);
      }
    });

    // TODO(krishan711): figure out why this lint disable is needed!
    // eslint-disable-next-line consistent-return
    return clearPropsUpdatedCallback;
  }, [editor, props.json, setPropsUpdatedCallback, clearPropsUpdatedCallback]);

  return (
    <StyledJsonEditor
      ref={editorRef}
    />
  );
};
JsonEditor.defaultProps = {
  isEditable: true,
};
