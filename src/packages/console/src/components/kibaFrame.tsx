import React from 'react';
import { StyleSheetManager } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { ErrorBoundary, ISingleAnyChildProps } from '@kibalabs/core-react';
import { HeadRootProvider } from '@kibalabs/everypage-core';

interface IKibaFrameInnerProps extends ISingleAnyChildProps {
  document: HTMLDocument;
  selectedElementId?: string;
}

// TODO(krishan711): have to hard-code the calendly script cos it doesn't load from within. See calendly-booking-1
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
  }, [props.selectedElementId]);

  React.useEffect((): void => {
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
    script3.src = 'https://assets.calendly.com/assets/external/widget.js';
    props.document.head.appendChild(script3);
  }, [props.document]);

  return (
    <React.Fragment>{ props.children }</React.Fragment>
  );
}

interface IKibaFrameProps extends ISingleAnyChildProps {
  selectedElementId?: string;
}

export const KibaFrame = (props: IKibaFrameProps): React.ReactElement => {
  return (
    <Frame style={{height: '100%', width: '100%'}}>
      <FrameContextConsumer>{ frameContext => (
        <HeadRootProvider root={frameContext.document.head}>
          <KibaFrameInner document={frameContext.document} selectedElementId={props.selectedElementId}>
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
