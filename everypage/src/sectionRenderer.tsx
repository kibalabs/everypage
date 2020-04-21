import React from 'react';

const sections = require('./sections');

type SectionMap = Record<string, React.ComponentType>;
const sectionMap = (Object.values(sections) as React.ComponentType[]).reduce((previousValue: SectionMap, component: React.ComponentType, currentIndex: number): SectionMap => {
  if (!component || !component.displayName) {
    console.warn(`Section component "${Object.keys(sections)[currentIndex]}" does not have a displayName so cannot be used with SectionRenderer`);
    return previousValue;
  }
  previousValue[component.displayName] = component;
  return previousValue;
}, {});

interface SectionRendererProps {
  sectionJson: Record<string, any>;
}

export const SectionRenderer = (props: SectionRendererProps): React.ReactElement => {
  if (Object.keys(sectionMap).includes(props.sectionJson.type)) {
    const Component = sectionMap[props.sectionJson.type];
    return <Component {...props.sectionJson} />;
  }
  throw new Error(`Failed to find section with type "${props.sectionJson.type}"`);
};
