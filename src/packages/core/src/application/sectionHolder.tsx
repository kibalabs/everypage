import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';

import { ISectionProps } from '../sections';
import { BackgroundView } from '../components';
import { IBackgroundConfig } from '../model';

interface IStyledSectionHolderProps {
}

const StyledSectionHolder = styled.main<IStyledSectionHolderProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  min-height: 100vh;
`;

interface ISectionHolderProps extends IMultiChildProps<ISectionProps> {
  id?: string;
  className: string;
  background?: IBackgroundConfig;
}

// NOTE(krish): this is just a stripped down stack that prevents having to have multiple layers of children
export const SectionHolder = (props: ISectionHolderProps): React.ReactElement => {
  // const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  // const sectionHolderRef = React.useRef<HTMLDivElement>();
  // React.useLayoutEffect(() => {
  //   setHasRendered(true);
  // })

  return (
    <BackgroundView
      id={props.id}
      className={getClassName(SectionHolder.displayName, props.className)}
      { ...props.background }
    >
      <StyledSectionHolder>
        {/* {React.Children.map(props.children, (child: React.Component<ISectionProps>): React.Component<ISectionProps> => {
          // return React.cloneElement(child, { sectionHolderRef: sectionHolderRef });
          return child;
        })} */}
        {props.children}
      </StyledSectionHolder>
    </BackgroundView>
  );
};

SectionHolder.defaultProps = {
  className: '',
};
SectionHolder.displayName = 'section-holder';
