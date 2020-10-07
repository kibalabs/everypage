import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, useBuiltTheme } from '../..';
import { ILoadingSpinnerTheme } from './theme';
import { valueToCss } from '../../util';

interface IStyledLoadingSpinnerProps {
  theme: ILoadingSpinnerTheme;
}

const StyledLoadingSpinner = styled.div<IStyledLoadingSpinnerProps>`
  border-radius: 50%;
  border-style: solid;
  border-width: ${(props: IStyledLoadingSpinnerProps): string => props.theme.width};
  border-color: ${(props: IStyledLoadingSpinnerProps): string => valueToCss(props.theme.color)};
  border-top-color: transparent;
  width: ${(props: IStyledLoadingSpinnerProps): string => props.theme.size};
  height: ${(props: IStyledLoadingSpinnerProps): string => props.theme.size};
  animation: spin 1.0s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface ILoadingSpinnerProps extends IComponentProps<ILoadingSpinnerTheme> {
}

export const LoadingSpinner = (props: ILoadingSpinnerProps): React.ReactElement => {
  const theme = useBuiltTheme('loadingSpinners', props.variant, props.theme);
  return (
    <StyledLoadingSpinner
      id={props.id}
      className={getClassName(LoadingSpinner.displayName, props.className)}
      theme={theme}
    />
  );
};

LoadingSpinner.defaultProps = {
  ...defaultComponentProps,
};
LoadingSpinner.displayName = 'loading-spinner';
