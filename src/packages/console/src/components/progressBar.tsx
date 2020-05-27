import React from 'react';
import styled from 'styled-components';

export interface IProgressBarProps {
  progress: number;
}

const StyledProgressBar = styled.div`
  height: 10px;
  width: 100%;
  background-color: white;
`;

interface IStyledProgressBarFillProps {
  progress: number;
}

const StyledProgressBarFill = styled.div<IStyledProgressBarFillProps>`
  height: 100%;
  background-color: #ddd;
  width: ${(props: IStyledProgressBarFillProps): string => (`${props.progress * 100}%`)};
`;

export const ProgressBar = (props: IProgressBarProps): React.ReactElement => {
  return (
    <StyledProgressBar>
      <StyledProgressBarFill progress={props.progress} />
    </StyledProgressBar>
  )
};
