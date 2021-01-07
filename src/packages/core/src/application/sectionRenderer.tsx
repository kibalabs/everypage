import React from 'react';
import { IWebsiteSection } from '../model';

import * as sections from '../sections';

type SectionMap = Record<string, React.ComponentType>;
const sectionMap = (Object.values(sections) as React.ComponentType[]).reduce((previousValue: SectionMap, component: React.ComponentType, currentIndex: number): SectionMap => {
  if (!component || !component.displayName) {
    console.warn(`Section component "${Object.keys(sections)[currentIndex]}" does not have a displayName so cannot be used with SectionRenderer`);
    return previousValue;
  }
  // eslint-disable-next-line no-param-reassign
  previousValue[component.displayName] = component;
  return previousValue;
}, {});

export const renderSection = (params: IWebsiteSection): React.ReactElement => {
  if (Object.keys(sectionMap).includes(params.type)) {
    const Component = sectionMap[params.type];
    // @ts-ignore
    return <Component {...params} />;
  }
  throw new Error(`Failed to find section with type "${params.type}"`);
};
