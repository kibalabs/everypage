import { RestMethod } from './restMethod';

export class Request {
  public method: RestMethod;
  public url: string;
  public headers: Record<string, string>;
  public data: Record<string, any>;
  public date: Date;

  public constructor(method: RestMethod, url: string, headers?: Record<string, string>, data?: Record<string, any>, date?: Date, timeout?: number) {
    this.method = method;
    this.url = url;
    this.headers = headers || {};
    this.data = data || {};
    this.date = date || new Date();
  }

}
