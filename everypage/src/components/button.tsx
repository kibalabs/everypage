import React from 'react';
import styled from 'styled-components';


interface IButtonProps {
  text: string;
}


const StyledButton = styled.button`
  width: 100%;
`;


export const Button = (props: IButtonProps): React.ReactElement => (
  <StyledButton>{ props.text }</StyledButton>
);
