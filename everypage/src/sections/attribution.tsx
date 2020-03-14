import React from 'react';
import styled from 'styled-components';


const StyledAttribution = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
`;

export const Attribution = (): React.ReactElement => (
  <StyledAttribution>
    Made with EveryPage
  </StyledAttribution>
);
