import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IPortalTheme } from './theme';

interface IStyledPortalProps {
  theme: IPortalTheme;
  positionTop: number;
  positionLeft: number;
  width: number;
}

const StyledPortal = styled.div<IStyledPortalProps>`
  position: absolute;
  top: ${(props: IStyledPortalProps): string => `${props.positionTop}px`};
  left: ${(props: IStyledPortalProps): string => `${props.positionLeft}px`};
  width: ${(props: IStyledPortalProps): string => `${props.width}px`};
  display: ${(props: IStyledPortalProps): string => (props.width > 0 ? 'block' : 'none')};
  ${(props: IStyledPortalProps): string => themeToCss(props.theme.background)};
`;

interface IPortalProps extends IComponentProps<IPortalTheme>, ISingleAnyChildProps {
  below: React.RefObject<HTMLDivElement>;
}

export const Portal = React.forwardRef((props: IPortalProps, ref: React.Ref<HTMLDivElement>): React.ReactElement => {
  const theme = props.theme || useBuiltTheme('portals', props.mode);
  const [positionTop, setPositionTop] = React.useState<number>(0);
  const [positionLeft, setPositionLeft] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(0);


  const updateSizes = (): void => {
    const belowNodeRect = props.below.current!.getBoundingClientRect();
    setPositionTop(belowNodeRect.bottom + window.pageYOffset);
    setPositionLeft(belowNodeRect.left + window.pageXOffset);
    setWidth(belowNodeRect.width);
  };

  useEventListener(window, 'resize', (): void => {
    updateSizes();
  });

  useEventListener(window, 'scroll', (): void => {
    updateSizes();
  });

  React.useEffect((): void => {
    updateSizes();
  }, [props.below]);

  return ReactDOM.createPortal((
    <StyledPortal
      id={props.id}
      className={getClassName(Portal.displayName, props.className)}
      theme={theme}
      positionTop={positionTop}
      positionLeft={positionLeft}
      width={width}
      ref={ref}
    >
      {props.children}
    </StyledPortal>
  ), window.document.body);
});

Portal.defaultProps = {
  ...defaultComponentProps,
};
Portal.displayName = 'portal';
