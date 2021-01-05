import { Request, RequesterModifier, Response } from '@kibalabs/core';

import { AuthManager } from './authManager';

export class JwtRequestModifier extends RequesterModifier {
  private authManager: AuthManager;

  public constructor(authManager: AuthManager) {
    super();
    this.authManager = authManager;
  }

  public modifyRequest(request: Request): Request {
    const jwt = this.authManager.getJwtString();
    if (jwt) {
      request.headers.Authorization = `Bearer ${jwt}`;
    }
    return request;
  }

  public modifyResponse(response: Response): Response {
    if ('x-kiba-token' in response.headers && response.headers['x-kiba-token']) {
      this.authManager.setJwtString(response.headers['x-kiba-token']);
    }
    return response;
  }
}
