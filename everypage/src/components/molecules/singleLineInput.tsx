import React from 'react';
import styled from 'styled-components';

import { IMoleculeProps, defaultMoleculeProps } from './moleculeProps';
import { InputFrame, IInputFrameTheme } from './inputFrame';


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

export interface ISingleLineInputProps extends IMoleculeProps<ISingleLineInputTheme> {
  value: string;
  isEnabled: boolean;
  placeholderText?: string;
  errorText?: string;
  inputType: 'text' | 'password' | 'email';
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
      className={`singleline-input ${props.className}`}
      theme={props.theme?.inputFrameTheme}
      errorText={props.errorText}
      isEnabled={props.isEnabled}
    >
      <StyledSingleLineInput
        id={props.id && `${props.id}-textarea`}
        className={`singleline-input-textarea ${props.errorText ? 'error' : ''} ${props.isEnabled === false ? 'disabled' : ''}`}
        type={props.inputType}
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

SingleLineInput.displayName = 'SingleLineInput';
SingleLineInput.defaultProps = {
  ...defaultMoleculeProps,
  isEnabled: true,
  inputType: 'text',
};
