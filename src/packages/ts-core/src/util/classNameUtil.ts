
type ArgType = string | number | null | undefined;

// NOTE(krish): this is inspired from https://github.com/lukeed/clsx/blob/master/src/index.js
export const getClassName = (...args: ArgType[]): string => {
  const values = [];
  args.forEach((arg: ArgType): void => {
    if (arg) {
      values.push(arg);
    }
  });
  return values.join(' ');
}
