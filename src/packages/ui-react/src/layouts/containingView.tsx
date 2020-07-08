import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { useDimensions } from '../theming';
import { IDimensionGuide } from '../subatoms';

interface IStyledContainingViewProps extends ISingleAnyChildProps {
  className: string;
  theme: IDimensionGuide;
}

const withContainingView = (Component: React.ComponentType<IStyledContainingViewProps>): React.ComponentType => styled(Component)<IStyledContainingViewProps>`
  width: 100%;
  max-width: ${(props: IStyledContainingViewProps): string => props.theme.screenWidthMax};
  margin-right: auto;
  margin-left: auto;
`;

const StyledContainingView = withContainingView((props: IStyledContainingViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});

export interface IContainingViewProps extends ISingleAnyChildProps {
  className: string;
  theme?: IDimensionGuide;
}

export const ContainingView = (props: IContainingViewProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  return (
    <StyledContainingView
      className={getClassName(ContainingView.displayName, props.className)}
      theme={theme}
    >
      {props.children}
    </StyledContainingView>
  );
};

ContainingView.defaultProps = {
};
ContainingView.displayName = 'containing-view';
