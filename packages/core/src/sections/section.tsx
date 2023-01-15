import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import { BackgroundView, ColorSettingView, ContainingView, IPaddingViewProps, PaddingView } from '@kibalabs/ui-react';
import styled from 'styled-components';

import { IWebsiteSection } from '../model/website';

export interface ISectionProps extends IWebsiteSection, IPaddingViewProps {
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
      { ...props.background || { color: '$colors.sectionBackground' }}
    >
      <ColorSettingView variant={props.isInverse ? 'inverse' : props.colorVariant}>
        <PaddingView {...props as IPaddingViewProps}>
          <StyledSection
            id={props.id}
            className={getClassName(StyledSection.displayName, props.shouldStickToTop && 'sticky', props.isFullHeight && 'fullHeight')}
          >
            <ContainingView>
              { props.children }
            </ContainingView>
          </StyledSection>
        </PaddingView>
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

// TODO(krishan711): for sticky sections it would be nice if the shadow only showed once scrolled, here is an attempt for that:
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
