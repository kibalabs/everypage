import React from 'react';
import { StyleSheetManager } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { ErrorBoundary, ISingleAnyChildProps } from '@kibalabs/core-react';
import { HeadRootProvider } from '@kibalabs/everypage-core';

interface IKibaFrameInnerProps extends ISingleAnyChildProps {
  target: HTMLDocument;
}

// TODO(krish): have to hard-code the calendly script cos it doesn't load from within. See calendly-booking-1
const KibaFrameInner = (props: IKibaFrameInnerProps): React.ReactElement => {
  React.useEffect(() => {
    const script = props.target.createElement('script');
    script.async = true;
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    props.target.head.appendChild(script);
  }, [props.target]);

  return (
    <React.Fragment>{ props.children }</React.Fragment>
  );
}

interface IKibaFrameProps extends ISingleAnyChildProps {
}

export const KibaFrame = (props: IKibaFrameProps): React.ReactElement => {
  return (
    <Frame style={{height: '100%', width: '100%'}}>
      <FrameContextConsumer>{ frameContext => (
        <HeadRootProvider root={frameContext.document.head}>
          <KibaFrameInner target={frameContext.document}>
            <StyleSheetManager target={frameContext.document.head}>
              <ErrorBoundary>
                { props.children }
              </ErrorBoundary>
            </StyleSheetManager>
          </KibaFrameInner>
        </HeadRootProvider>
      )}</FrameContextConsumer>
    </Frame>
  );
}
