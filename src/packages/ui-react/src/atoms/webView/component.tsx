import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { useInitialization } from '@kibalabs/core-react';

import { IWebViewTheme } from './theme';
import { IComponentProps, defaultComponentProps, useBuiltTheme, themeToCss } from '../..';
import { LoadingSpinner } from '../../subatoms';

interface IStyledWebViewProps {
  theme: IWebViewTheme;
}

const StyledWebView = styled.div<IStyledWebViewProps>`
  ${(props: IStyledWebViewProps): string => themeToCss(props.theme.normal?.default?.background)};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 56.25%;
  position: relative;
`;

const LoadingWrapper = styled.div<IStyledWebViewProps>`
  position: absolute;
`;

interface IStyledIframeProps {
  isLoading: boolean;
}

const StyledIframe = styled.iframe<IStyledIframeProps>`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  border: none;
  display: ${(props: IStyledIframeProps): string => (props.isLoading ? 'none' : 'inherit')};
`;

export interface IWebViewProps extends IComponentProps<IWebViewTheme> {
  url: string;
  errorView: React.FunctionComponent;
  permissions: string[];
}

export const WebView = (props: IWebViewProps): React.ReactElement => {
  const [currentUrl, setCurrentUrl] = React.useState<string | undefined>(props.url);
  const [hasFailedToLoad, setHasFailedToLoad] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const isInitialized = useInitialization((): void => {});
  const theme = useBuiltTheme('webViews', props.variant, props.theme);

  React.useEffect((): void => {
    if (props.url !== currentUrl) {
      setIsLoading(true);
      setCurrentUrl(props.url);
      setHasFailedToLoad(false);
    }
  }, [props.url]);

  const handleOnError = (): void => {
    setIsLoading(false);
    setHasFailedToLoad(true);
  };

  const handleOnLoad = (event: React.SyntheticEvent<HTMLIFrameElement, Event>): void => {
    setIsLoading(false);
    const iframe: HTMLIFrameElement = event.target as HTMLIFrameElement;
    if (!(iframe && iframe.contentWindow && iframe.contentWindow.window && iframe.contentWindow.window.length > 0)) {
      // setHasFailedToLoad(true);
    } else {
      iframe.contentWindow.console.log = (): void => { /* no-op */ };
    }
  };

  return (
    <StyledWebView
      id={props.id}
      className={getClassName(WebView.displayName, props.className)}
      theme={theme}
    >
      <noscript>
        <StyledIframe
          id={props.id && `${props.id}-iframe`}
          className={'web-view-iframe'}
          key={currentUrl}
          src={currentUrl}
          isLoading={false}
          allow={props.permissions.join(';')}
        />
      </noscript>
      {isInitialized && (
        hasFailedToLoad
        ? props.errorView
        : (
          <React.Fragment>
            { isLoading && (
              <LoadingWrapper id={props.id && `${props.id}-loading-wrapper`}>
                <LoadingSpinner id={props.id && `${props.id}-loading-spinner`} className={'web-view-loading-spinner'} />
              </LoadingWrapper>
            )}
            <StyledIframe
              id={props.id && `${props.id}-iframe`}
              className={'web-view-iframe'}
              key={currentUrl}
              src={currentUrl}
              isLoading={isLoading}
              onLoad={handleOnLoad}
              onError={handleOnError}
              allow={props.permissions.join(';')}
            />
          </React.Fragment>
        )
      )}
    </StyledWebView>
  );
};

WebView.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  shouldOpenSameTab: false,
  permissions: [],
};
WebView.displayName = 'web-view';
