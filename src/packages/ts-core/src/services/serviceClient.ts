import { Requester, RestMethod } from '../requester';

export class RequestData {
  public toObject = (): Record<string, any> => {
    return {};
  }
}

export class ResponseData {
  public static fromObject = <T extends ResponseData>(obj: Record<string, any>): T => {
    throw new Error();
  }
}

export class ServiceClient {
  protected requester: Requester;
  protected baseUrl: string;

  public constructor(requester: Requester, baseUrl: string) {
    this.requester = requester;
    this.baseUrl = baseUrl
  }

  protected makeRequest = async <ResponseType extends ResponseData>(method: RestMethod, path: string, request?: RequestData, responseClass?: ResponseType): Promise<ResponseType> => {
    const url = `${this.baseUrl}/${path}`;
    const response = await this.requester.makeRequest(method, url, request.toObject());
    return responseClass ? responseClass.fromObject(JSON.parse(response.content)) : null;
  }
}
