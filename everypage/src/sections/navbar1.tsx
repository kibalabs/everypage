import React from 'react';
import styled from 'styled-components';

import { Link } from '@reach/router';


const StyledNav = styled.nav`
`;


export const NavBar1 = (): React.ReactElement => (
  <StyledNav>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
  </StyledNav>
);
