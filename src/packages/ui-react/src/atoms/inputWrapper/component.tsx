import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IInputWrapperTheme } from './theme';

const StyledInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface IInputWrapperInnerProps {
  theme: IInputWrapperTheme;
}

const InputWrapperInner = styled.div<IInputWrapperInnerProps>`
  & input, & textarea, & .wrapped-input {
    /* NOTE(krish): these are all the fields of the ITextTheme, can it be done in one line? */
    font-size: unset;
    font-family: unset;
    font-weight: unset;
    color: unset;
    line-height: unset;
  }
  width: 100%;
  overflow: hidden;
  ${(props) => themeToCss(props.theme.normal.default.text)};
  ${(props) => themeToCss(props.theme.normal.default.background)};
  & ::placeholder, .wrapped-input:empty::before {
    ${(props) => themeToCss(props.theme.normal.default.placeholderText)};
  }

  &:hover {
    box-shadow: none;
    ${(props) => themeToCss(props.theme.normal.hover.text)};
    ${(props) => themeToCss(props.theme.normal.hover.background)};
    & ::placeholder, .wrapped-input:empty::before {
      ${(props) => themeToCss(props.theme.normal.hover.placeholderText)};
    }
  }

  &.focus, &:focus {
    ${(props) => themeToCss(props.theme.normal.focus.text)};
    ${(props) => themeToCss(props.theme.normal.focus.background)};
    & ::placeholder, .wrapped-input:empty::before {
      ${(props) => themeToCss(props.theme.normal.focus.placeholderText)};
    }
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    ${(props) => themeToCss(props.theme.disabled.default.text)};
    ${(props) => themeToCss(props.theme.disabled.default.background)};
    & ::placeholder, .wrapped-input:empty::before {
      ${(props) => themeToCss(props.theme.disabled.default.placeholderText)};
    }

    &:hover {
      ${(props) => themeToCss(props.theme.disabled.hover.text)};
      ${(props) => themeToCss(props.theme.disabled.hover.background)};
      & ::placeholder, .wrapped-input:empty::before {
        ${(props) => themeToCss(props.theme.disabled.hover.placeholderText)};
      }
    }

    &.focus, &:focus {
      ${(props) => themeToCss(props.theme.disabled.focus.text)};
      ${(props) => themeToCss(props.theme.disabled.focus.background)};
      & ::placeholder, .wrapped-input:empty::before {
        ${(props) => themeToCss(props.theme.disabled.focus.placeholderText)};
      }
    }
  }
`;
InputWrapperInner.displayName = 'input-wrapper-inner';

const StyledMessage = styled.p`
  ${(props) => themeToCss(props.theme.normal.default.messageText)};
  margin-top: 0.5em;
  overflow: auto;
  width: 100%;
  text-align: right;
`;
StyledMessage.displayName = 'input-wrapper-message';

interface IInputWrapperProps extends IComponentProps<IInputWrapperTheme>, ISingleAnyChildProps {
  messageText?: string;
  isEnabled?: boolean;
  isFocussed?: boolean;
}

export const InputWrapper = (props: IInputWrapperProps): React.ReactElement => {
  const theme = props.theme || useBuiltTheme('inputWrappers', props.mode);
  // TODO(krish): check that the first child is an input, textarea or .wrapped-input
  return (
    <StyledInputWrapper
      id={props.id}
      className={getClassName(InputWrapper.displayName, props.className)}
    >
      <InputWrapperInner
        id={props.id && `${props.id}-inner`}
        className={getClassName(InputWrapperInner.displayName, props.messageText && 'message-showing', props.isFocussed && 'focus', !props.isEnabled && 'disabled')}
        theme={theme}
      >
        {props.children}
      </InputWrapperInner>
      { props.messageText && (
        <StyledMessage
          id={props.id && `${props.id}-message`}
          className={getClassName(StyledMessage.displayName)}
          theme={theme}
        >
          {props.messageText}
        </StyledMessage>
      )}
    </StyledInputWrapper>
  );
};

InputWrapper.defaultProps = {
  ...defaultComponentProps,
};
InputWrapper.displayName = 'input-wrapper';
