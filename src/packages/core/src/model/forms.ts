import { InputType } from '@kibalabs/ui-react';

export interface IFormInput {
  name: string;
  type: InputType;
  value: string;
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
}

export const defaultFormProps = {
  formAdditionalInputs: [],
};
