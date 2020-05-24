import React from 'react';

import { objectToString, objectFromString, booleanToString, booleanFromString } from '@kibalabs/core';

export default class LocalStorageClient {
  private localStorage: Storage;

  constructor(localStorage: Storage) {
    this.localStorage = localStorage;
  }

  public getValue(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  public setValue(key: string, value: string | null | undefined): void {
    if (value === null || value === undefined) {
      this.removeValue(key);
    } else {
      this.localStorage.setItem(key, value);
    }
  }

  public getBoolean(key: string): boolean | null {
    const value = this.getValue(key);
    if (value === '1') {
      return true;
    }
    if (value === '0') {
      return false;
    }
    return null;
  }

  public setBoolean(key: string, value: boolean | null | undefined): void {
    if (value === null || value === undefined) {
      this.removeValue(key);
    } else {
      this.setValue(key, value ? '1' : '0');
    }
  }

  public removeValue(key: string): void {
    this.localStorage.removeItem(key);
  }

  public clear(): void {
    this.localStorage.clear();
  }
}

export const useLocalStorageState = (name: string, overrideInitialValue?: string | null): [string | null, (newValue: string | null) => void] => {
  if (typeof window === 'undefined') {
    console.warn('Cannot use useLocalStorageState without a window present!')
    return [null, () => {}];
  }

  const localStorage = new LocalStorageClient(window.localStorage);
  const [value, setValue] = React.useState<string | null>((): string | null => {
    if (overrideInitialValue !== undefined) {
      localStorage.setValue(name, overrideInitialValue);
    }
    return localStorage.getValue(name);
  });

  const valueSetter = (newValue: string | null): void => {
    localStorage.setValue(name, newValue);
    setValue(newValue);
  };

  return [value, valueSetter];
};

export const useBooleanLocalStorageState = (name: string, overrideInitialValue?: boolean): [boolean | null, (newValue: boolean | null) => void] => {
  const [value, setValue] = useLocalStorageState(name, booleanToString(overrideInitialValue));
  return [booleanFromString(value) as boolean | null, ((newValue: boolean | null): void => setValue(booleanToString(newValue) as string | null))];
};

export const useObjectLocalStorageState = (name: string, overrideInitialValue?: object): [object | null, (newValue: object | null) => void] => {
  const [value, setValue] = useLocalStorageState(name, objectToString(overrideInitialValue));
  return [objectFromString(value) as object | null, ((newValue: object | null): void => setValue(objectToString(newValue) as string | null))];
};
