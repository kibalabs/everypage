import React from 'react';
import styled from 'styled-components';

import { IComponentProps, defaultComponentProps, IBoxTheme, ITextTheme } from '..';
import { ThemeType, themeToCss, useTheme } from '../../theming';
import { ISingleAnyChildProps,  } from '../../util';


export interface IInputWrapperThemeBase extends ThemeType {
  text: ITextTheme;
  errorText: ITextTheme;
  placeholderText: ITextTheme;
  background: IBoxTheme;
}

export interface IInputWrapperThemeState extends ThemeType {
  default: IInputWrapperThemeBase;
  hover: IInputWrapperThemeBase;
  focus: IInputWrapperThemeBase;
}

export interface IInputWrapperTheme extends ThemeType {
  normal: IInputWrapperThemeState;
  error: IInputWrapperThemeState;
  disabled: IInputWrapperThemeState;
}

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
  ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.default.background)};
  & ::placeholder, .wrapped-input:empty::before {
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.default.placeholderText)};
  }

  &:hover {
    box-shadow: none;
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.hover.text)};
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.hover.background)};
    & ::placeholder, .wrapped-input:empty::before {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.hover.placeholderText)};
    }
  }

  &.focus, &:focus {
    outline: none;
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.focus.text)};
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.focus.background)};
    & ::placeholder, .wrapped-input:empty::before {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.focus.placeholderText)};
    }
  }

  &.error {
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.default.text)};
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.default.background)};
    & ::placeholder, .wrapped-input:empty::before {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.default.placeholderText)};
    }

    &:hover {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.hover.text)};
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.hover.background)};
      & ::placeholder, .wrapped-input:empty::before {
        ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.hover.placeholderText)};
      }
    }

    &.focus, &:focus {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.focus.text)};
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.focus.background)};
      & ::placeholder, .wrapped-input:empty::before {
        ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.error.focus.placeholderText)};
      }
    }
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.default.text)};
    ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.default.background)};
    & ::placeholder, .wrapped-input:empty::before {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.default.placeholderText)};
    }

    &:hover {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.hover.text)};
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.hover.background)};
      & ::placeholder, .wrapped-input:empty::before {
        ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.hover.placeholderText)};
      }
    }

    &.focus, &:focus {
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.focus.text)};
      ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.focus.background)};
      & ::placeholder, .wrapped-input:empty::before {
        ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.disabled.focus.placeholderText)};
      }
    }
  }
`;

const StyledError = styled.p`
  ${(props: IInputWrapperInnerProps): string => themeToCss(props.theme.normal.default.errorText)};
  margin-top: 0.5em;
  overflow: auto;
  width: 100%;
  text-align: right;
`;

interface IInputWrapperProps extends IComponentProps<IInputWrapperTheme>, ISingleAnyChildProps {
  errorText?: string;
  isEnabled?: boolean;
  isFocussed?: boolean;
}

export const InputWrapper = (props: IInputWrapperProps): React.ReactElement => {
  const theme = props.theme || useTheme('inputWrappers', props.mode);
  // TODO(krish): check that the first child is an input, textarea or .wrapped-input
  return (
    <StyledInputWrapper
      id={props.id}
      className={`input-wrapper ${props.className}`}
    >
      <InputWrapperInner
        id={props.id && `${props.id}-inner`}
        className={`input-wrapper-inner ${props.errorText ? 'error' : ''} ${props.isFocussed ? 'focus' : ''} ${props.isEnabled === false ? 'disabled' : ''}`}
        theme={theme}
      >
        {props.children}
      </InputWrapperInner>
      { props.errorText && (
        <StyledError
          id={props.id && `${props.id}-error`}
          className={'input-wrapper-error'}
          theme={theme}
        >
          {props.errorText}
        </StyledError>
      )}
    </StyledInputWrapper>
  );
};

InputWrapper.defaultProps = {
  ...defaultComponentProps,
};
