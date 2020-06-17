import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IMoleculeProps, defaultMoleculeProps, InputFrame, IInputFrameTheme } from '.';
import { InputType } from '..';


export interface ISingleLineInputTheme {
  inputFrameTheme: IInputFrameTheme;
}


const StyledSingleLineInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  cursor: text;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
  &:focus {
    outline: none;
  }
  &.disabled {
    pointer-events: none;
  }
`;

const getAutocompleteType = (inputType: InputType): string | null => {
  if (inputType === InputType.Email) {
    return 'email';
  } else if (inputType === InputType.Url) {
    return 'url';
  }
  return null;
}

export interface ISingleLineInputProps extends IMoleculeProps<ISingleLineInputTheme> {
  value: string;
  isEnabled: boolean;
  placeholderText?: string;
  errorText?: string;
  inputType: InputType;
  name?: string;
  onKeyUp?(key: string): void;
  onKeyDown?(key: string): void;
  onClick?(): void;
  onValueChanged(value: string): void;
}

export const SingleLineInput = (props: ISingleLineInputProps): React.ReactElement => {
  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.onValueChanged) {
      props.onValueChanged(event.target.value);
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (props.onKeyUp) {
      props.onKeyUp(event.key);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (props.onKeyDown) {
      props.onKeyDown(event.key);
    }
  };

  const onClick = (): void => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <InputFrame
      id={props.id}
      className={getClassName('singleline-input', props.className)}
      theme={props.theme?.inputFrameTheme}
      errorText={props.errorText}
      isEnabled={props.isEnabled}
    >
      <StyledSingleLineInput
        id={props.id && `${props.id}-textarea`}
        className={getClassName('singleline-input-textarea', props.errorText && 'error', !props.isEnabled && 'disabled')}
        type={props.inputType}
        name={props.name}
        autoComplete={getAutocompleteType(props.inputType)}
        value={props.value || ''}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onChange={onValueChanged}
        onClick={onClick}
        placeholder={props.placeholderText}
      />
    </InputFrame>
  );
};

SingleLineInput.defaultProps = {
  ...defaultMoleculeProps,
  isEnabled: true,
  inputType: InputType.Text,
};
