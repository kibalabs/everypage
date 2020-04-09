import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { Section } from '.';


const StyledNav = styled.nav`
`;


export const NavBar1 = (): React.ReactElement => (
  <Section>
    <StyledNav>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
    </StyledNav>
  </Section>
);
