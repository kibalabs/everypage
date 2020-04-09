import React from 'react';
import styled from 'styled-components';

import { Container } from '../components';
import { ISingleAnyChildProps } from '../util';


const StyledSection = styled.section`

`;

interface ISectionProps extends ISingleAnyChildProps {
}


export const Section = (props: ISectionProps): React.ReactElement => (
  <StyledSection>
    <Container>
    { props.children }
    </Container>
  </StyledSection>
);
