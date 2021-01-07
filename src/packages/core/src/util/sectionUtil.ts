
export const ensureSingleDefined = (componentName: string, props: Record<string, unknown>, propNames: string[]): void => {
  const definedProps = Object.keys(props).filter((propKey: string): boolean => propKey in propNames && props[propKey] != null);
  if (definedProps.length > 0) {
    throw new Error(`Only one of ${propNames} should be passed to ${componentName}`);
  }
};

export const ensureDefined = (componentName: string, props: Record<string, unknown>, propNames: string[]): void => {
  const missingPropNames = Object.keys(props).filter((propKey: string): boolean => propKey in propNames && props[propKey] == null);
  if (missingPropNames.length > 0) {
    throw new MissingPropsError(componentName, missingPropNames);
  }
};

export const warnDeprecated = (componentName: string, props: Record<string, unknown>, deprecatedPropName: string, newPropName?: string): void => {
  if (props[deprecatedPropName] != null) {
    const suffix = newPropName ? ` Please use ${newPropName} instead.` : '';
    console.warn(`${deprecatedPropName} is deprecated in ${componentName}. ${suffix}`);
  }
};

export class MissingPropsError extends Error {
  constructor(componentName: string, missingPropNames: string[]) {
    super(`${missingPropNames} must be passed to ${componentName}`);
    this.name = 'MissingPropsError';
  }
}

export class MissingPropError extends Error {
  constructor(componentName: string, missingPropName: string) {
    super(`${missingPropName} must be passed to ${componentName}`);
    this.name = 'MissingPropError';
  }
}
