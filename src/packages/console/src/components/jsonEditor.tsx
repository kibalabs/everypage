import React from 'react';
import styled from 'styled-components';
import JSONEditor, { NodeName } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface IJsonEditorProps {
  json: object;
  schema?: object;
  name?: string;
  isEditable: boolean;
  onJsonUpdated: (parsedJson: object) => void;
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

  const onChangeText = (jsonText: string) => {
    try {
      props.onJsonUpdated(JSON.parse(jsonText));
    } catch (error) {
      console.log('Caught error when parsing json')
    }
  };

  const calculateNodeName = (nodeName: NodeName): string  | undefined => {
    if (nodeName.path.length === 0) {
      return 'site';
    }
    if (nodeName.path[0] === 'sections') {
      if (nodeName.path.length === 1) {
        return undefined;
      }
      if (nodeName.path.length === 2) {
        // @ts-ignore
        return props.json['sections'][nodeName.path[1]].type;
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
        onChangeText: onChangeText,
        enableSort: false,
        enableTransform: false,
        onNodeName: calculateNodeName,
        onEditable: ((): boolean => props.isEditable),
        mode: 'code',
        modes: ['code', 'tree'],
      });
      newEditor.set(props.json);
      setEditor(newEditor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledJsonEditor
      ref={editorRef}
    />
  );
}
JsonEditor.defaultProps = {
  isEditable: true,
}
