import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import { ContainingView, ColorSettingView } from '@kibalabs/ui-react';

import { BackgroundView, IBackgroundConfig } from '../components/backgroundView';

export interface ISectionProps {
  id?: string;
  className?: string;
  background?: IBackgroundConfig;
  shouldStickToTop: boolean;
  isFullHeight?: boolean;
  isInverse?: boolean;
}

export interface IInternalSectionProps extends ISectionProps, ISingleAnyChildProps {
  // sectionHolderRef?: React.RefObject<HTMLElement> | null;
}

interface StyledSectionProps {
}

const StyledSection = styled.section<StyledSectionProps>`
  &.sticky {
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.13);
  }

  &.fullHeight {
    flex-grow: 1;
    display: flex;
  }

  &.unstuck {
    box-shadow: none;
  }
`;
StyledSection.displayName = 'section-inner';

export const Section = (props: IInternalSectionProps): React.ReactElement => {
  return (
    <BackgroundView
      className={getClassName(Section.displayName, props.className)}
      { ...props.background }
    >
      <ColorSettingView mode={props.isInverse ? 'inverse' : undefined}>
        <StyledSection
          id={props.id}
          className={getClassName(StyledSection.displayName, props.shouldStickToTop && 'sticky', props.isFullHeight && 'fullHeight')}
        >
          <ContainingView>
            { props.children }
          </ContainingView>
        </StyledSection>
      </ColorSettingView>
    </BackgroundView>
  );
};

Section.displayName = 'section';
Section.defaultProps = {
  className: '',
  shouldStickToTop: false,
  isInverse: false,
};

// TODO(krish): for sticky sections it would be nice if the shadow only showed once scrolled, here is an attempt for that:
// There is also this: https://medium.com/walmartlabs/activatable-drop-shadow-on-sticky-elements-d0c12f1ebfdf
// const [isAtTop, setIsAtTop] = React.useState<boolean>(false);
// const [lastTopPosition, setLastTopPosition] = React.useState<number | null>(null);
// const sectionRef = React.useRef<HTMLElement>();
// useScrollListener(props.shouldStickToTop ? props.sectionHolderRef?.current || null : null, React.useCallback((): void => {
//   const actualTopPosition = isAtTop ? lastTopPosition : sectionRef.current.offsetTop;
//   console.log(props.sectionHolderRef?.current.scrollTop, sectionRef.current.offsetTop, lastTopPosition, props.sectionHolderRef?.current.scrollTop > actualTopPosition);
//   const newIsAtTop = props.sectionHolderRef?.current.scrollTop > actualTopPosition;
//   if (!isAtTop && newIsAtTop) {
//     console.log('setting last top', sectionRef.current.offsetTop);
//     setLastTopPosition(sectionRef.current.offsetTop);
//   }
//   setIsAtTop(newIsAtTop);
// }, [props.sectionHolderRef?.current, sectionRef.current, isAtTop, lastTopPosition]));
