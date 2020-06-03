import React from 'react';
import { integerToString, integerFromString } from '@kibalabs/core';

export const useUrlQueryState = (name: string, overrideInitialValue?: string | null): [string | null | undefined, (newValue: string | null | undefined) => void] => {
  if (typeof window === 'undefined') {
    console.warn('Cannot use useUrlQueryState without a window present!')
    return [null, () => {}];
  }

  const [value, setValue] = React.useState<string | undefined>((): string | undefined => {
    const searchParams = new URLSearchParams(window.location.search);
    if (overrideInitialValue !== undefined) {
      if (overrideInitialValue) {
        searchParams.set(name, overrideInitialValue);
      } else {
        searchParams.delete(name);
      }
    }
    const paramValue = searchParams.get(name);
    return paramValue === null ? undefined : paramValue;
  });

  const setter = React.useCallback((newValue: string | null | undefined): void => {
    const searchParams = new URLSearchParams(window.location.search);
    if (newValue === null || newValue === undefined) {
      searchParams.delete(name);
    } else {
      searchParams.set(name, newValue);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    setValue(newValue === null ? undefined : newValue);
  }, [name]);

  return [value, setter];
};

export const useIntegerLocalStorageState = (name: string, overrideInitialValue?: number): [number | null, (newValue: number | null) => void] => {
  const [value, setValue] = useUrlQueryState(name, integerToString(overrideInitialValue));
  return [integerFromString(value) as number | null, ((newValue: number | null): void => setValue(integerToString(newValue) as string | null))];
};
