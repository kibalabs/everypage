import { KibaResponse, Requester, RestMethod } from '@kibalabs/core';

import { FormAction, IFormHeader, IFormInput } from '../model';


export interface IFormSubmissionResult {
  isSuccessful: boolean;
  responseMessage: string;
}

const inputsToParams = (inputs: IFormInput[]): Record<string, string> => {
  return inputs.reduce((previousValue: Record<string, string>, input: IFormInput): Record<string, string> => {
    // eslint-disable-next-line no-param-reassign
    previousValue[input.name] = input.value;
    return previousValue;
  }, {});
};

const paramToQueryStringParam = (key: string, value: string): string => {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const paramsToQueryString = (params: Record<string, string>): string => {
  return Object.keys(params).map((key: string): string => {
    return paramToQueryStringParam(key, params[key]);
  }).join('&');
};

export const submitForm = async (inputs: IFormInput[], action: FormAction, target: string, headers?: IFormHeader[]): Promise<IFormSubmissionResult> => {
  const params = inputsToParams(inputs);
  // TODO(krishan711): lowercase-ing should really happen in some kind of header container
  const providedHeaders = headers ? headers.reduce((currentHeaders: Record<string, string>, header: IFormHeader): Record<string, string> => {
    // eslint-disable-next-line no-param-reassign
    currentHeaders[header.name.toLowerCase()] = header.value;
    return currentHeaders;
  }, {}) : {};
  // NOTE(krishan711): remove empty values to allow un-setting content-type
  const allHeaders = removeEmptyValues({ 'content-type': 'application/json', ...providedHeaders });
  if (action === FormAction.Open) {
    window.open(`${target}?${paramsToQueryString(params)}`, '_blank');
    return { isSuccessful: true, responseMessage: '' };
  } if (action === FormAction.Get) {
    return new Requester().makeRequest(RestMethod.GET, target, params, allHeaders).then((response: KibaResponse): IFormSubmissionResult => {
      return { isSuccessful: true, responseMessage: response.content };
    }).catch((error: Error): IFormSubmissionResult => {
      return { isSuccessful: false, responseMessage: error.message };
    });
  } if (action === FormAction.Post) {
    return new Requester().makeRequest(RestMethod.POST, target, params, allHeaders).then((response: KibaResponse): IFormSubmissionResult => {
      return { isSuccessful: true, responseMessage: response.content };
    }).catch((error: Error): IFormSubmissionResult => {
      return { isSuccessful: false, responseMessage: error.message };
    });
  }
  console.warn(`Unknown form action ${action}`);
  return { isSuccessful: false, responseMessage: 'Something went wrong please try again later.' };
};

// NOTE(krishan711): this doesn't work recursively
function removeEmptyValues<T>(obj: Record<string, T>): Record<string, T> {
  return Object.keys(obj).reduce((newObj: Record<string, T>, key: string): Record<string, T> => {
    if (obj[key] !== null && obj[key] !== undefined) {
      // eslint-disable-next-line no-param-reassign
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
}
