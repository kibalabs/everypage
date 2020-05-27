import { AxiosResponse } from 'axios';

export class Response {
  public status: number;
  public headers: Record<string, string> = {};
  public date: Date;
  public content: string = '';

  public constructor(status: number, headers: Record<string, string>, date: Date, content: string) {
    this.status = status;
    this.headers = headers;
    this.date = date;
    this.content = content;
  }

  public static fromAxiosResponse(axiosResponse: AxiosResponse): Response {
    return new Response(axiosResponse.status, axiosResponse.headers, new Date(), JSON.stringify(axiosResponse.data));
  }
}
