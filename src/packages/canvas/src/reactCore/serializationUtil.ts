export const objectToString = (value: object | null | undefined): string | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return JSON.stringify(value);
};

export const objectFromString = (value: string | null | undefined): object | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return JSON.parse(value);
};

export const booleanToString = (value: boolean | null | undefined): string | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return value ? '1' : '0';
};

export const booleanFromString = (value: string | null | undefined): boolean | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return value === '1' || value === 'true';
};
