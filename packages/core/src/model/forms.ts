import { InputType } from '@kibalabs/ui-react';

export interface IFormHeader {
  name: string;
  value: string;
}

export interface IFormInput {
  name: string;
  type: InputType;
  value: string | null;
}

export enum FormAction {
  Post = 'POST',
  Get = 'GET',
  Open = 'OPEN',
}

export interface IFormProps {
  formTarget: string;
  formAction: FormAction;
  formAdditionalInputs?: IFormInput[];
  formHeaders?: IFormHeader[];
}

export const defaultFormProps = {
  formAdditionalInputs: [],
};
