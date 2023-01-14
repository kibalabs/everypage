import React from 'react';

import styled from 'styled-components';

// TODO(krishan711): move this to ui-react-dropzone

const ThumbsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 100%;
  align-content: flex-start;
`;

const Thumb = styled.div`
  display: inline-flex;
  border: 1px solid #eaeaea;
  width: 150px;
  height: 150px;
  position: relative;
`;

const ThumbImageHolder = styled.div`
  height: 100%;
  width: 100%;
`;

const ThumbImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const ThumbSubtitle = styled.span`
  font-size: 0.8em;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  color: white;
  position: absolute;
  bottom: 0;
  padding: 10px 20px;
  word-wrap: break-word;
`;

const ThumbDeleteButton = styled.button`
  background-color: rgba(0,0,0,0.5);
  border-radius: 100px;
  padding: 2px 5px 4px;
  line-height: 0.9em;
  color: white;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  &:before {
    content: '×';
  }

  &:hover {
    background-color: rgba(0,0,0,0.6);
  }
  &:focus {
    background-color: rgba(0,0,0,0.6);
  }
  &:active {
    background-color: rgba(0,0,0,0.7);
  }
`;

interface IFilePreviewGridProps {
  fileMap: Record<string, string>;
  onDeleteClicked?(filePath: string);
}

export const FilePreviewGrid = (props: IFilePreviewGridProps): React.ReactElement => {
  // TODO(krishan711): change thumb to its own component
  return (
    <ThumbsContainer>
      {Object.keys(props.fileMap).map((filePath: string): React.ReactElement => (
        <Thumb key={filePath}>
          <ThumbImageHolder>
            <ThumbImage src={props.fileMap[filePath]} />
          </ThumbImageHolder>
          <ThumbSubtitle>{filePath}</ThumbSubtitle>
          {props.onDeleteClicked && <ThumbDeleteButton onClick={(): void => props.onDeleteClicked(filePath)} />}
        </Thumb>
      ))}
    </ThumbsContainer>
  );
};
