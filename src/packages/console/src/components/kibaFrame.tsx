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
    const css = '.frame-root, .frame-content { height:100%; width: 100%; }';
    const style = props.target.createElement('style');
    style.type = 'text/css';
    style.appendChild(props.target.createTextNode(css));
    props.target.head.appendChild(style);
    // NOTE(krish): the lazysizes plugin is added here manually due to iframe problems
    const script = props.target.createElement('script');
    script.async = true;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js';
    props.target.head.appendChild(script);
    const script2 = props.target.createElement('script');
    script2.async = true;
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/plugins/attrchange/ls.attrchange.min.js';
    props.target.head.appendChild(script2);
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