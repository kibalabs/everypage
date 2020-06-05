import React from 'react';
import styled from 'styled-components';

import { IMoleculeProps, defaultMoleculeProps } from './moleculeProps';
import { InputWrapper, IInputWrapperTheme } from '..';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
;


export interface IInputFrameTheme {
  inputWrapperTheme?: IInputWrapperTheme;
}


const StyledInputFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

export interface IInputFrameProps extends IMoleculeProps<IInputFrameTheme>, ISingleAnyChildProps {
  errorText?: string;
  isEnabled: boolean;
}

const StyledInputWrapperInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const InputFrame = (props: IInputFrameProps): React.ReactElement => {
  // :focus-within is not supported on all browsers so we manually maintain if this element has a isFocussed child
  const [isFocussed, setIsFocussed] = React.useState(false);

  return (
    <StyledInputFrame
      id={props.id}
      className={`input-frame ${props.className}`}
      onFocus={(): void => setIsFocussed(true)}
      onBlur={(): void => setIsFocussed(false)}
    >
      <InputWrapper
        id={props.id && `${props.id}-input-wrapper`}
        className={'input-frame-input-wrapper'}
        theme={props.theme?.inputWrapperTheme}
        errorText={props.errorText}
        isEnabled={props.isEnabled}
        isFocussed={isFocussed}
      >
        <StyledInputWrapperInner>
          {props.children}
        </StyledInputWrapperInner>
      </InputWrapper>
    </StyledInputFrame>
  );
};

InputFrame.defaultProps = {
  ...defaultMoleculeProps,
  iEnabled: true,
  isLoading: false,
};
