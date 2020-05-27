import React from 'react';
import styled from 'styled-components';

export const Button = styled.div`
  background-color: #333333;
  padding: 8px 12px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #292929;
  }

  &:active {
    background-color: #222222;
  }

  &.selected {
    background-color: #111111;
  }
`;

export const ButtonBar = styled.div`
  background-color: #333333;
  width: 100%;
`;
