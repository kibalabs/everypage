import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { ErrorBoundary, ISingleAnyChildProps } from '@kibalabs/core-react';
import { HeadRootProvider } from '@kibalabs/everypage-core';

interface IKibaFrameProps extends ISingleAnyChildProps {
}

export const KibaFrame = (props: IKibaFrameProps): React.ReactElement => {
  return (
    <Frame style={{height: '100%', width: '100%'}}>
      <FrameContextConsumer>{ frameContext => (
        <HeadRootProvider root={frameContext.document.head}>
          <StyleSheetManager target={frameContext.document.head}>
            <ErrorBoundary>
              { props.children }
            </ErrorBoundary>
          </StyleSheetManager>
        </HeadRootProvider>
      )}</FrameContextConsumer>
    </Frame>
  );
}
