import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { ISectionProps } from '../sections';
import { IMultiChildProps } from '../util';

interface IStyledSectionHolderProps {
}

const StyledSectionHolder = styled.main<IStyledSectionHolderProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

interface ISectionHolderProps extends IMultiChildProps<ISectionProps> {
  id?: string;
  className: string;
}

// NOTE(krish): this is just a stripped down stack that prevents having to have multiple layers of children
export const SectionHolder = (props: ISectionHolderProps): React.ReactElement => {
  // const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  // const sectionHolderRef = React.useRef<HTMLDivElement>();
  // React.useLayoutEffect(() => {
  //   setHasRendered(true);
  // })

  return (
    <StyledSectionHolder
      id={props.id}
      className={getClassName('section-holder', props.className)}
      // ref={sectionHolderRef}
    >
      {React.Children.map(props.children, (child: React.Component<ISectionProps>): React.Component<ISectionProps> => {
        // return React.cloneElement(child, { sectionHolderRef: sectionHolderRef });
        return child;
      })}
    </StyledSectionHolder>
  );
};

SectionHolder.defaultProps = {
  className: '',
};
