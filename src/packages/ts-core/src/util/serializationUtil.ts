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

export const numberToString = (value: number | null | undefined): string | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return String(value);
};

export const numberFromString = (value: string | null | undefined): number | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  const parsedNumber = Number(value);
  return Number.isNaN(parsedNumber) ? null : parsedNumber;
};

export const integerToString = (value: number | null | undefined): string | null | undefined => {
  return value ? String(Math.round(value)) : numberToString(value);
};

export const integerFromString = (value: string | null | undefined): number | null | undefined => {
  const number = numberFromString(value);
  return number ? Math.round(number) : number;
}
