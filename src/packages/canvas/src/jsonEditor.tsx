import React from 'react';
import styled from 'styled-components';
import JSONEditor, { NodeName } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface IJsonEditorProps {
  json: object;
  onJsonUpdated: (parsedJson: object) => void;
}

const StyledJsonEditor = styled.div`
  height: 100%;
  width: 600px;
`;

export const JsonEditor = (props: IJsonEditorProps): React.ReactElement => {
  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = React.useState<JSONEditor | null>(null);

  const onJsonChanged = (json: object) => {
    props.onJsonUpdated(json);
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
        name: 'site',
        onChangeJSON: onJsonChanged,
        enableSort: false,
        enableTransform: false,
        onNodeName: calculateNodeName,
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
