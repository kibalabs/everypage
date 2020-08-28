import React from 'react';
import { StyleSheetManager } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { ErrorBoundary, ISingleAnyChildProps } from '@kibalabs/core-react';

interface IKibaFrameProps extends ISingleAnyChildProps {
}

interface IKibaFrameInnerProps extends ISingleAnyChildProps {
  target: HTMLDocument;
}

const KibaFrameInner = (props: IKibaFrameInnerProps): React.ReactElement => {
  React.useEffect(() => {
    // NOTE(krish): the lazysizes plugin is added here manually due to iframe problems
    // Would be better (even as a temp solution) to have the HeadContent component render into the frame head
    const script = props.target.createElement('script');
    script.async = true;
    script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.2.2/lazysizes.min.js';
    props.target.head.appendChild(script);
    const script2 = props.target.createElement('script');
    script2.async = true;
    script2.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.2.2/plugins/attrchange/ls.attrchange.min.js';
    props.target.head.appendChild(script2);
    const script3 = props.target.createElement('script');
    script3.async = true;
    script3.src = 'https://assets.calendly.com/assets/external/widget.js';
    props.target.head.appendChild(script3);
  }, [props.target]);

  return (
    <React.Fragment>{ props.children }</React.Fragment>
  );
}

export const KibaFrame = (props: IKibaFrameProps): React.ReactElement => {
  return (
    <Frame style={{height: '100%', width: '100%'}}>
      <FrameContextConsumer>{ frameContext => (
        <KibaFrameInner target={frameContext.document}>
          <StyleSheetManager target={frameContext.document.head}>
            <ErrorBoundary>
              { props.children }
            </ErrorBoundary>
          </StyleSheetManager>
        </KibaFrameInner>
      )}</FrameContextConsumer>
    </Frame>
  );
}
