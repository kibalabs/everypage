import { isValidEmail } from '@kibalabs/core';
import { InputType } from '@kibalabs/ui-react';

export interface IInputValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateInput = (input: string, inputType: InputType): IInputValidationResult => {
  switch (inputType) {
    case InputType.Email: {
      if (!isValidEmail(input)) {
        return { isValid: false, errorMessage: 'Please enter a valid email address' };
      }
      break;
    }
    case InputType.Url: {
      // if (!isValidUrl(input)) {
      //   return {isValid: false, errorMessage: 'Please enter a valid url'};
      // }
      break;
    }
    default:
      break;
  }
  return { isValid: true };
};
