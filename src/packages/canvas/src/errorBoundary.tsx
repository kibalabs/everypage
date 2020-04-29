import * as React from 'react';
import styled from 'styled-components';

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: React.ErrorInfo | null;
}

export interface IErrorBoundaryProps {
}

export const ErrorDisplay = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(129, 129, 129);
`;

export const ErrorMessage = styled.div`
  text-align: center;
  margin: 1em;
  line-height: 1.5em;
  a {
    text-decoration: none;
  }
`;

export default class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ hasError: true, error, info });
  }

  public render(): React.ReactElement {
    if (this.state.hasError) {
      return (
        <ErrorDisplay>
          <ErrorMessage>
            <strong>Something's wrong here. Please fix teh below and then refresh!</strong><br/>
            Error Details: {this.state.error?.name || ''} - {this.state.error?.message || ''}<br/>
          </ErrorMessage>
        </ErrorDisplay>
      );
    }
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
