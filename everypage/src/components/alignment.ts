
// See https://webdesign.tutsplus.com/tutorials/a-comprehensive-guide-to-flexbox-alignment--cms-30183
// to learn about alignment

export enum Alignment {
  Start = 'start',
  End = 'end',
  Fill = 'fill',
  Center = 'center',
}

export const getFlexItemAlignment = (childAlignment: string): string => {
  if (childAlignment === Alignment.Start) {
    return 'flex-start';
  }
  if (childAlignment === Alignment.End) {
    return 'flex-end';
  }
  if (childAlignment === Alignment.Center) {
    return 'center';
  }
  return 'stretch';
};

export const getFlexContentAlignment = (childAlignment: string): string => {
  if (childAlignment === Alignment.Start) {
    return 'flex-start';
  }
  if (childAlignment === Alignment.End) {
    return 'flex-end';
  }
  if (childAlignment === Alignment.Center) {
    return 'center';
  }
  return 'space-between';
};
