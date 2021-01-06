/* eslint-disable max-classes-per-file */
import { LocalStorageClient } from '@kibalabs/core';
import { IRouterAuthManager } from '@kibalabs/core-react';

import { EverypageClient } from './everypageClient';

const ALGORITHM = 'alg';
const TOKEN_ID = 'jti';
const USER_ID = 'sub';
const SESSION_ID = 'sid';
const APPLICATION_ID = 'aid';
const APPLICATION_KEY_ID = 'kid';
const SCOPES = 'scp';
const HAS_VERIFIED_EMAIL = 'hve';

export class Jwt {
  private header: Record<string, string>;
  private payload: Record<string, string | string[]>;

  public constructor(header: Record<string, string>, payload: Record<string, string>) {
    this.header = header;
    this.payload = payload;
  }

  public get algorithm(): string {
    return String(this.header[ALGORITHM]);
  }

  public set algorithm(value: string) {
    this.header[ALGORITHM] = value;
  }

  public get userId(): number {
    return Number(this.payload[USER_ID]);
  }

  public set userId(value: number) {
    this.payload[USER_ID] = String(value);
  }

  public get tokenId(): number {
    return Number(this.payload[TOKEN_ID]);
  }

  public set tokenId(value: number) {
    this.payload[TOKEN_ID] = String(value);
  }

  public get sessionId(): number {
    return Number(this.payload[SESSION_ID]);
  }

  public set sessionId(value: number) {
    this.payload[SESSION_ID] = String(value);
  }

  public get hasVerifiedEmail(): boolean {
    return Number(this.payload[HAS_VERIFIED_EMAIL]) === 1;
  }

  public set hasVerifiedEmail(value: boolean) {
    this.payload[HAS_VERIFIED_EMAIL] = String(value ? 1 : 0);
  }

  public get applicationKeyId(): number {
    return Number(this.payload[APPLICATION_KEY_ID]);
  }

  public set applicationKeyId(value: number) {
    this.payload[APPLICATION_KEY_ID] = String(value);
  }

  public get applicationId(): number {
    return Number(this.payload[APPLICATION_ID]);
  }

  public set applicationId(value: number) {
    this.payload[APPLICATION_ID] = String(value);
  }

  public get scopes(): string[] {
    return this.payload[SCOPES] as string[];
  }

  public set scopes(value: string[]) {
    this.payload[SCOPES] = value;
  }

  public static fromString = (jwtString: string): Jwt => {
    const jwtParts = jwtString.split('.');
    return new Jwt(JSON.parse(atob(jwtParts[0])), JSON.parse(atob(jwtParts[1])));
  }
}


export class AuthManager implements IRouterAuthManager {
  private localStorageClient: LocalStorageClient;
  private jwtStorageKey: string;
  private everypageClient: EverypageClient;

  constructor(localStorageClient: LocalStorageClient, jwtStorageKey: string, everypageClient: EverypageClient) {
    this.localStorageClient = localStorageClient;
    this.jwtStorageKey = jwtStorageKey;
    this.everypageClient = everypageClient;
  }

  public getIsUserLoggedIn = (): boolean => {
    return this.getJwtString() !== null;
  }

  public getJwt = (): Jwt | null => {
    const jwtString = this.getJwtString();
    return jwtString ? Jwt.fromString(jwtString) : null;
  }

  public getHasJwtPermission = (name: string): boolean => {
    const jwtString = this.getJwtString();
    return jwtString ? Jwt.fromString(jwtString).scopes.indexOf(name) !== -1 : false;
  }

  public getJwtString = (): string | null => {
    return this.localStorageClient.getValue(this.jwtStorageKey);
  }

  public setJwtString = (jwt: string): void => {
    this.localStorageClient.setValue(this.jwtStorageKey, jwt);
  }

  public logout = (): Promise<void> => {
    return this.everypageClient.logoutUser().then((): void => {
      this.localStorageClient.clear();
    }).catch((error: Error): void => {
      console.error(`error logging out: ${error}`);
      this.localStorageClient.clear();
    });
  }
}
