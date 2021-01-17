import { deepCompare } from '@kibalabs/core';
import React from 'react';

import { IWebsiteSection } from '../model';
import * as sections from '../sections';
import { ISectionProps } from '../sections';

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

// TODO(krishan711): move this somewhere, its useful for debugging
// const deepCompareLogged = (obj1: any, obj2: any) => {
//   const output = deepCompare(obj1, obj2);
//   if (!output) {
//     console.log('SectionRenderer deepCompareLogged');
//     Object.keys(obj1).forEach((key: string): void => {
//       const isEqual = deepCompare(obj1[key], obj2[key]);
//       if (!isEqual) {
//         console.log('found diff:', key, '   ->   ', obj1[key], obj2[key]);
//       }
//     });
//   }
//   return output;
// }

export const SectionRenderer = React.memo((params: IWebsiteSection): React.ReactElement<ISectionProps> => {
  if (Object.keys(sectionMap).includes(params.type)) {
    const Component = sectionMap[params.type];
    // @ts-ignore
    return <Component {...params} />;
  }

  throw new Error(`Failed to find section with type "${params.type}"`);
}, deepCompare);

SectionRenderer.displayName = 'SectionRenderer';
