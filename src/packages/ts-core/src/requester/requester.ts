import axios, { AxiosRequestConfig } from 'axios';

import { RestMethod } from './restMethod';
import { KibaException } from '../model/kibaException';
import { Request } from './request';
import { Response } from './response';

export class RequesterModifier {

  public modifyRequest(request: Request): Request {
    return request;
  }

  public modifyResponse(response: Response): Response {
    return response;
  }

}

export class Requester {
  private headers: Record<string, string>;
  private modifiers: RequesterModifier[];

  public constructor(headers?: Record<string, string>, modifiers?: RequesterModifier[]) {
    this.headers = headers || {};
    this.modifiers = modifiers || [];
  }

  public addModifier = (modifier: RequesterModifier): void => {
    this.modifiers.push(modifier);
  }

  private modifyRequest = (request: Request): Request => {
    return this.modifiers.reduce((request: Request, modifier: RequesterModifier): Request => {
      return modifier.modifyRequest(request);
    }, request);
  }

  private modifyResponse = (response: Response): Response => {
    return this.modifiers.reduce((response: Response, modifier: RequesterModifier): Response => {
      return modifier.modifyResponse(response);
    }, response);
  }

  public makeRequest = async (method: RestMethod, url: string, data?: Record<string, any>, headers?: Record<string, string>, timeout?: number): Promise<Response> => {
    let request = new Request(method, url, headers, data, new Date());
    request = this.modifyRequest(request);
    const axiosRequest: AxiosRequestConfig = {
      method: request.method,
      url: request.url,
      data: request.data,
      headers: {...this.headers, ...(request.headers || {})},
      timeout: timeout ? timeout * 1000 : undefined,
    };
    let axiosResponse = null;
    try {
      axiosResponse = await axios(axiosRequest)
    } catch (error) {
      axiosResponse = error.response;
      if (!axiosResponse && error.request) {
        throw new KibaException(`The request was made but no response was received: [${error.code}] "${error.message}"`);
      }
    }
    var response = Response.fromAxiosResponse(axiosResponse);
    response = this.modifyResponse(response);
    if (response.status >= 400 && response.status < 600) {
      console.log('response.content', response.content);
      let errorContent = null;
      try {
        errorContent = JSON.parse(response.content);
      } catch {}
      if (errorContent && 'message' in errorContent) {
        throw new KibaException(errorContent.message, response.status);
      }
      throw new KibaException(response.content, response.status);
    }
    return response;
  }

  public makeFormRequest = async (url: string, data?: FormData, headers?: Record<string, string>, timeout?: number): Promise<Response> => {
    let request = new Request(RestMethod.POST, url, headers, undefined, new Date());
    request = this.modifyRequest(request);
    const axiosRequest: AxiosRequestConfig = {
      method: request.method,
      url: request.url,
      data: data,
      headers: {...this.headers, ...(request.headers || {})},
      timeout: timeout ? timeout * 1000 : undefined,
    };
    let axiosResponse = null;
    try {
      axiosResponse = await axios(axiosRequest)
    } catch (error) {
      axiosResponse = error.response;
      if (!axiosResponse && error.request) {
        throw new KibaException(`The request was made but no response was received: [${error.code}] "${error.message}"`);
      }
    }
    var response = Response.fromAxiosResponse(axiosResponse);
    response = this.modifyResponse(response);
    if (response.status >= 400 && response.status < 600) {
      try {
        const errorContent = JSON.parse(response.content);
        if ('message' in errorContent) {
          throw new KibaException(errorContent.message, response.status);
        }
      } catch {}
      throw new KibaException(response.content, response.status);
    }
    return response;
  }

}
