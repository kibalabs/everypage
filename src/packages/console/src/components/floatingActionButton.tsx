import React from 'react';
import styled from 'styled-components';

interface IFloatingActionButtonProps {
  onClicked: () => void;
}

interface IStyledButtonProps {
}

const StyledButton = styled.button<IStyledButtonProps>`
  color: white;
  background-color: #333333;
  height: 50px;
  width: 200px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  outline: none;
  position: absolute;
  left: 20px;
  top: 20px;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: '#303030';
  }

  :active {
    background-color: '#2e2e2e';
  }
`;

export const FloatingActionButton = (props: IFloatingActionButtonProps): React.ReactElement | null => {
  const onClicked = (): void => {
    props.onClicked()
  }

  return (
    <StyledButton bottomOffset={props.bottomOffset} onClick={onClicked}>
      <span>Show Editor</span>
    </StyledButton>
  );
}
