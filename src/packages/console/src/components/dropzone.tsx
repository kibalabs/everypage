import React from 'react';
import styled from 'styled-components';
import * as ReactDropzone from 'react-dropzone';

export interface IDropzoneProps {
  onFilesChosen: (files: File[]) => void;
}

// TODO(krish): design a preview holder with https://react-dropzone.js.org/#section-previews
const StyledDropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #ccc;
  border-style: dashed;
  background-color: #eee;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

export const Dropzone = (props: IDropzoneProps): React.ReactElement => {
  const onDrop = React.useCallback((files: File[]) => {
    props.onFilesChosen(files);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = ReactDropzone.useDropzone({ onDrop });

  return (
    <StyledDropzone {...getRootProps()} style={{padding: '20px'}}>
      <input {...getInputProps()}/>
      { isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </StyledDropzone>
  )
}
