import React from 'react';

import { Container, Background, IBackgroundConfig } from '../components';
import { ISingleAnyChildProps } from '../util';

export interface ISectionProps {
  id?: string;
  className?: string;
  background?: IBackgroundConfig;
}

interface IInternalSectionProps extends ISectionProps, ISingleAnyChildProps {
}

export const Section = (props: IInternalSectionProps): React.ReactElement => {
  return (
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
};

Section.displayName = 'section';
Section.defaultProps = {
  className: '',
};
