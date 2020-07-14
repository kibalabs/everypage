import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IMoleculeProps, defaultMoleculeProps } from './moleculeProps';
import { InputWrapper, IInputWrapperTheme } from '../atoms';

export interface IInputFrameTheme {
  inputWrapperTheme?: IInputWrapperTheme;
}

export interface IInputFrameProps extends IMoleculeProps<IInputFrameTheme>, ISingleAnyChildProps {
  messageText?: string;
  isEnabled: boolean;
  inputWrapperMode?: string;
}

// NOTE(krish): this component is intended to hold anything that would commonly be used alongside input wrapper (e.g. buttons)
export const InputFrame = (props: IInputFrameProps): React.ReactElement => {
  return (
    <InputWrapper
      id={props.id}
      className={getClassName(InputFrame.displayName, props.className)}
      theme={props.theme?.inputWrapperTheme}
      mode={props.inputWrapperMode}
      messageText={props.messageText}
      isEnabled={props.isEnabled}
    >
      {props.children}
    </InputWrapper>
  );
};

InputFrame.defaultProps = {
  ...defaultMoleculeProps,
  iEnabled: true,
};
InputFrame.displayName = 'input-frame';
