import { Requester, RestMethod, KibaResponse } from '@kibalabs/core';

import { FormAction, IFormInput } from '../model';


export interface IFormSubmissionResult {
  isSuccessful: boolean;
  responseMessage: string;
}

const inputsToParams = (inputs: IFormInput[]): Record<string, string> => {
  return inputs.reduce((previousValue: Record<string, string>, input: IFormInput): Record<string, string> => {
    previousValue[input.name] = input.value;
    return previousValue;
  }, {});
}

const paramToQueryStringParam = (key: string, value: string): string => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(value);
}

const paramsToQueryString = (params: Record<string, string>): string => {
  return Object.keys(params).map((key: string): string => {
    return paramToQueryStringParam(key, params[key]);
  }).join('&');
}

export const submitForm = async (inputs: IFormInput[], action: FormAction, target: string): Promise<IFormSubmissionResult> => {
  const params = inputsToParams(inputs);
  if (action === FormAction.Open) {
    window.open(`${target}?${paramsToQueryString(params)}`, '_blank')
  } else if (action === FormAction.Get) {
    return new Requester().makeRequest(RestMethod.GET, target, params).then((response: KibaResponse): IFormSubmissionResult => {
      return {isSuccessful: true, responseMessage: response.content};
    }).catch((error: Error): IFormSubmissionResult => {
      return {isSuccessful: false, responseMessage: error.message};
    });
  } else if (action === FormAction.Post) {
    return new Requester().makeRequest(RestMethod.POST, target, params).then((response: KibaResponse): IFormSubmissionResult => {
      return {isSuccessful: true, responseMessage: response.content};
    }).catch((error: Error): IFormSubmissionResult => {
      return {isSuccessful: false, responseMessage: error.message};
    });
  } else {
    console.warn(`Unknown form action ${action}`);
    return {isSuccessful: false, responseMessage: 'Something went wrong please try again later.'};
  }
};
