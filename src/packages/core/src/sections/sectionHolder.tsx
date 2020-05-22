import React from 'react';
import styled from 'styled-components';

import { ISectionProps } from '.';
import { IMultiChildProps } from '../util';

interface IStyledSectionHolderProps {
}

const StyledSectionHolder = styled.div<IStyledSectionHolderProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: visible;
  justify-content: space-between;
  align-items: stretch;
`;

interface ISectionHolderProps extends IMultiChildProps<ISectionProps> {
  id?: string;
  className: string;
}

// NOTE(krish): this is just a stripped down stack that prevents having to have multiple layers of children
export const SectionHolder = (props: ISectionHolderProps): React.ReactElement => {
  const badChildrenCount = React.Children.toArray(props.children).filter((child: React.ReactNode): boolean => child && child.type.name !== 'Section' && child.type.name !== 'SectionRenderer').length;
  if (badChildrenCount > 0) {
    throw Error(`${badChildrenCount} children are not sections. Bailing out.`)
  }
  return (
    <StyledSectionHolder
      id={props.id}
      className={`section-holder ${props.className}`}
    >
      {props.children}
    </StyledSectionHolder>
  );
};

SectionHolder.defaultProps = {
  className: '',
};
