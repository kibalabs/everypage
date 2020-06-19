import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, useBuiltTheme } from '../..';
import { ILoadingSpinnerTheme } from './theme';

interface IStyledLoadingSpinnerProps {
  theme: ILoadingSpinnerTheme;
  size: string;
}

const getSize = (size: string): string => {
  switch (size) {
    case 'fill': {
      return '100%';
    }
    case 'small': {
      return '1em';
    }
    case 'large': {
      return '4em';
    }
    case 'extra-large': {
      return '8em';
    }
    default: {
      return '2em';
    }
  }
};

const getWidth = (size: string): string => {
  switch (size) {
    case 'small': {
      return '0.15em';
    }
    case 'large': {
      return '0.5em';
    }
    case 'extra-large': {
      return '1em';
    }
    default: {
      return '0.25em';
    }
  }
};

const StyledLoadingSpinner = styled.div<IStyledLoadingSpinnerProps>`
  border-radius: 50%;
  border-style: solid;
  border-width: ${(props: IStyledLoadingSpinnerProps): string => getWidth(props.size)};
  border-color: ${(props: IStyledLoadingSpinnerProps): string => props.theme.color};
  border-top-color: transparent;
  width: ${(props: IStyledLoadingSpinnerProps): string => getSize(props.size)};
  height: ${(props: IStyledLoadingSpinnerProps): string => getSize(props.size)};
  animation: spin 1.0s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface ILoadingSpinnerProps extends IComponentProps<ILoadingSpinnerTheme> {
  size: 'fill' | 'default' | 'large' | 'small' | 'extra-large';
}

export const LoadingSpinner = (props: ILoadingSpinnerProps): React.ReactElement => {
  const theme = props.theme || useBuiltTheme('loadingSpinners', props.mode);
  return (
    <StyledLoadingSpinner
      id={props.id}
      className={getClassName('loading-spinner', props.className)}
      theme={theme}
      size={props.size}
    />
  );
};

LoadingSpinner.defaultProps = {
  ...defaultComponentProps,
  size: 'fill',
};
