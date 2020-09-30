import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { ITheme, ThemeProvider } from '../theming';

interface IKibaAppProps extends ISingleAnyChildProps {
  theme: ITheme;
}

interface IStyledMainViewProps extends ISingleAnyChildProps {
  className: string;
}

const withMain = (Component: React.ComponentType<IStyledMainViewProps>): React.ComponentType => styled(Component)<IStyledMainViewProps>`
  min-height: 100vh;
`;

const StyledMainView = withMain((props: IStyledMainViewProps): React.ReactElement => {
  const children = React.Children.toArray(props.children);
  const child = children.length > 0 ? children[0] : <div />;
  return React.cloneElement(child, { className: getClassName(props.className, child.props.className) });
});

export const KibaApp = (props: IKibaAppProps): React.ReactElement => {
  return (
    <ThemeProvider theme={props.theme}>
      <React.Fragment>
        <GlobalCss
          theme={props.theme}
          resetCss={resetCss}
        />
        <StyledMainView>
          {props.children}
        </StyledMainView>
      </React.Fragment>
    </ThemeProvider>
  );
}
