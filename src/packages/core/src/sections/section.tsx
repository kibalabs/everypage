import React from 'react';
import styled from 'styled-components';

import { Container, Background, IBackgroundConfig } from '../components';
import { ISingleAnyChildProps } from '../util';

export interface ISectionProps {
  id?: string;
  className?: string;
  background?: IBackgroundConfig;
}

interface IInternalSectionProps extends ISectionProps, ISingleAnyChildProps {
}

const StyledSection = styled.section`

`;

export const Section = (props: IInternalSectionProps): React.ReactElement => {
  return (
    <StyledSection
      id={props.id}
      className={`section ${props.className}`}
    >
      <Background
        id={props.id && `${props.id}-background`}
        className={'section-background'}
        { ...props.background }
      >
        <Container
          id={props.id && `${props.id}-container`}
          className={'section-container'}
          isMainContainer={false}
        >
          { props.children }
        </Container>
      </Background>
    </StyledSection>
  );
};

Section.displayName = 'section';
Section.defaultProps = {
  className: '',
};
