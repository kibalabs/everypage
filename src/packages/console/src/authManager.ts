import { LocalStorageClient } from '@kibalabs/core';
import { IRouterAuthManager } from '@kibalabs/core-react';


export class AuthManager implements IRouterAuthManager {
  private localStorageClient: LocalStorageClient;
  private jwtStorageKey: string;

  constructor(localStorageClient: LocalStorageClient, jwtStorageKey: string) {
    this.localStorageClient = localStorageClient;
    this.jwtStorageKey = jwtStorageKey;
  }

  public getIsUserLoggedIn = (): boolean => {
    return this.getJwt() !== null;
  }

  public getJwt = (): string | null => {
    return this.localStorageClient.getValue(this.jwtStorageKey);
  }

  public setJwt = (jwt: string): void => {
    this.localStorageClient.setValue(this.jwtStorageKey, jwt);
  }
}
