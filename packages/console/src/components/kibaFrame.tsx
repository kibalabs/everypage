import React from 'react';

import { ErrorBoundary, ISingleAnyChildProps } from '@kibalabs/core-react';
import { IHead, renderHead } from '@kibalabs/ui-react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { StyleSheetManager } from 'styled-components';

interface IKibaFrameInnerProps extends ISingleAnyChildProps {
  head: IHead;
  document: Document;
  selectedElementId?: string;
}

const KibaFrameInner = (props: IKibaFrameInnerProps): React.ReactElement => {
  React.useLayoutEffect((): void => {
    if (props.selectedElementId) {
      const element = props.document.getElementById(props.selectedElementId);
      if (element) {
        element.scrollIntoView(true);
        // NOTE(krishan711): scrolling after a delay as well because of the layout shift causing problems
        setTimeout((): void => {
          element.scrollIntoView(true);
        }, 1000);
      }
    }
  }, [props.document, props.selectedElementId]);

  React.useEffect((): void => {
    // NOTE(krishan711): these should be removable eventually!
    const script = props.document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.2.2/lazysizes.min.js';
    props.document.head.appendChild(script);
    const script2 = props.document.createElement('script');
    script2.async = true;
    script2.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.2.2/plugins/attrchange/ls.attrchange.min.js';
    props.document.head.appendChild(script2);
    const script3 = props.document.createElement('script');
    script3.async = true;
    script3.src = 'https://assets.evrpg.com/calendly-widget.js';
    props.document.head.appendChild(script3);
  }, [props.document]);

  React.useEffect((): void => {
    if (props.head) {
      renderHead(props.head, props.document);
    }
  }, [props.document, props.head]);

  return (
    <React.Fragment>{ props.children }</React.Fragment>
  );
};

interface IKibaFrameProps extends ISingleAnyChildProps {
  head: IHead;
  selectedElementId?: string;
}

export const KibaFrame = (props: IKibaFrameProps): React.ReactElement => {
  return (
    <Frame style={{ height: '100%', width: '100%' }}>
      <FrameContextConsumer>
        { (frameContext) => (
          <KibaFrameInner head={props.head} document={frameContext.document} selectedElementId={props.selectedElementId}>
            <StyleSheetManager target={frameContext.document.head}>
              <ErrorBoundary>
                { props.children }
              </ErrorBoundary>
            </StyleSheetManager>
          </KibaFrameInner>
        )}
      </FrameContextConsumer>
    </Frame>
  );
};
