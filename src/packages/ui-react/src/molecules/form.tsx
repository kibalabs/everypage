import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { Box, IBoxTheme, LoadingSpinner, ILoadingSpinnerTheme, ThemeType, IMoleculeProps, defaultMoleculeProps } from '..';
;


export interface IFormTheme extends ThemeType {
  background: IBoxTheme;
  loadingSpinnerTheme: ILoadingSpinnerTheme;
}

// TODO(krish): this should not be relatives when it uses layers
const StyledForm = styled.form`
  position: relative;
`;
StyledForm.displayName = 'form-inner';

const LoadingOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IFormProps extends IMoleculeProps<IFormTheme>, ISingleAnyChildProps {
  isLoading: boolean;
  onFormSubmitted: () => void;
}

export const Form = (props: IFormProps): React.ReactElement => {
  const onSubmitted = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    props.onFormSubmitted();
  };

  // TODO(krish): this should use layers
  return (
    <Box
      id={props.id}
      className={getClassName(Form.displayName, props.className)}
      theme={props.theme?.background}
      isFullWidth={true}
    >
      <StyledForm
        id={props.id && `${props.id}-form`}
        className={getClassName(StyledForm.displayName)}
        onSubmit={onSubmitted}
      >
        {props.children}
        { props.isLoading && (
          <LoadingOverlay id={props.id && `${props.id}-loading-overlay`} className={'form-overlay'}>
            <LoadingSpinner id={props.id && `${props.id}-loading-spinner`} className={'form-overlay-spinner'} variant='large' />
          </LoadingOverlay>
        )}
      </StyledForm>
    </Box>
  );
};

Form.defaultProps = {
  ...defaultMoleculeProps,
  isLoading: false,
};
Form.displayName = 'form';
