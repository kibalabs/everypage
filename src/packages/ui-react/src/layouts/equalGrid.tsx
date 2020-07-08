import React from 'react';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';

import { Grid } from './grid';
import { IDimensionGuide } from '../subatoms';
import { Alignment } from '../model';



export interface IEqualGridProps extends IMultiAnyChildProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  childSize?: number;
  childSizeSmall?: number;
  childSizeMedium?: number;
  childSizeLarge?: number;
  childSizeExtraLarge?: number;
}

export const EqualGrid = (props: IEqualGridProps): React.ReactElement => {
  return (
    <Grid {...props} className={getClassName(EqualGrid.displayName, props.className)}>
      {React.Children.map(props.children, (child: React.ReactElement, index: number): React.ReactElement => {
        return (
          <Grid.Item key={index} sizeLarge={props.childSizeLarge} sizeMedium={props.childSizeMedium} sizeSmall={props.childSizeSmall} size={props.childSize}>{child}</Grid.Item>
        );
      })}
    </Grid>
  );
};

EqualGrid.defaultProps = {
};
EqualGrid.displayName = 'equal-grid';
