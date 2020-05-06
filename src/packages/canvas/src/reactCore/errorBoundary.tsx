import * as React from 'react';
import styled from 'styled-components';
import { SiteVersion } from '../everypageClient/resources';

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
  color: rgb(69, 69, 69);
`;

export const ErrorMessage = styled.div`
  text-align: center;
  margin: 1em;
  line-height: 1.5em;
  a {
    text-decoration: none;
  }
`;

export const ResetButton = styled.button`
  border: 1px solid currentColor;
  padding: 4px 8px;
  border-radius: 2px;
  cursor: pointer;

  :hover {
    background-color: #efefef;
  }
  :active {
    background-color: #dfdfdf;
  }
`;

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
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

  public reset = (): void => {
    this.setState({ hasError: false, error: null, info: null })
  }

  public render(): React.ReactElement {
    if (this.state.hasError) {
      return (
        <ErrorDisplay>
          <ErrorMessage>
            <strong>Something's wrong here</strong>
            <br/>
            <strong>Please excuse our silly mistake 🤦‍♂️</strong>
            <br/>
            <br/>
            {this.state.error ? String(this.state.error) : ''}
            {this.state.info ? this.state.info['componentStack'].split('\n').map((message: string, index: number): React.ReactElement => <span key={index}>{message}<br/></span>) : ''}
            <br/>
            <ResetButton onClick={this.reset}>Reset</ResetButton>
          </ErrorMessage>
        </ErrorDisplay>
      );
    }
    return <React.StrictMode>{this.props.children}</React.StrictMode>;
  }
}
