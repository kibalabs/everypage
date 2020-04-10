import React from 'react';

import { Container } from '../components';
import { ISingleAnyChildProps } from '../util';
import { Background, IBackgroundConfig } from '../components';

export interface ISectionProps {
  id?: string;
  className?: string;
  background?: IBackgroundConfig;
}

interface IInternalSectionProps extends ISectionProps, ISingleAnyChildProps {
}

export const Section = (props: IInternalSectionProps): React.ReactElement => (
  <Background
    id={props.id}
    className={`section ${props.className}`}
    { ...props.background }
  >
    <Container
      id={props.id && `${props.id}-container`}
      className={'section-container'}
    >
      { props.children }
    </Container>
  </Background>
);

Section.defaultProps = {
  className: '',
};
