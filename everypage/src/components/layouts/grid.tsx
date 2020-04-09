import React from 'react';
import styled from 'styled-components';
// import { castChildren } from '@carbonnv/speck';

import { IMultiChildProps, ISingleAnyChildProps } from '../../util';
// import { useTheme, IDimensionsGuide } from '../themes';


export interface IGridItemProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  size: number;
  sizeSmall?: number;
  sizeMedium?: number;
  sizeLarge?: number;
  sizeExtraLarge?: number;
  isFullHeight: boolean;
}

class GridItem extends React.Component<IGridItemProps> {
  static displayName = 'Grid.Item';
  static defaultProps = {
    className: '',
    isFullHeight: false,
    size: 12,
  };
}


interface IStyledGridProps {
  isFullHeight?: boolean;
}

const StyledGrid = styled.div<IStyledGridProps>`
  height: ${(props: IStyledGridProps): string => (props.isFullHeight ? '100%' : 'auto')};
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: auto;
`;

export interface IGridProps extends IMultiChildProps<IGridItemProps> {
  id?: string;
  className?: string;
  // theme?: IDimensionsGuide;
  isFullHeight?: boolean;
  shouldShowGutters?: boolean;
}

export const Grid = (props: IGridProps): React.ReactElement => {
  // const theme = props.theme || useTheme<IDimensionsGuide>('dimensions');
  // const typedChildren = castChildren(props.children, GridItem);
  return (
    <StyledGrid
      id={props.id}
      className={`grid ${props.className}`}
      isFullHeight={props.isFullHeight}
    >
      { React.Children.map(props.children, (child: React.ReactElement<IGridItemProps>, index: number): React.ReactElement => (
        <StyledGridItem
          key={index}
          id={child.props.id}
          className={`grid-item ${child.props.className}`}
          size={child.props.size}
          sizeSmall={child.props.sizeSmall}
          sizeMedium={child.props.sizeMedium}
          sizeLarge={child.props.sizeLarge}
          sizeExtraLarge={child.props.sizeExtraLarge}
          screenWidthSmall={'576px' /*theme.screenWidthSmall*/}
          screenWidthMedium={'768px' /*theme.screenWidthMedium*/}
          screenWidthLarge={'992px' /*theme.screenWidthLarge*/}
          screenWidthExtraLarge={'1200px' /*theme.screenWidthExtraLarge*/}
          isFullHeight={child.props.isFullHeight}
          totalColumnCount={12 /*theme.columnCount*/}
          gutterSize={props.shouldShowGutters ? /*theme.gutterSize*/'10px' : '0px'}
        >
          {child.props.children}
        </StyledGridItem>
      ))}
    </StyledGrid>
  );
};

Grid.displayName = 'Grid';
Grid.defaultProps = {
  className: '',
  isFullHeight: true,
  shouldShowGutters: false,
};
Grid.Item = GridItem;

const getCssSize = (totalColumnCount: number, gutterSize: string, columnCount: number): string => (
  `calc(${(100.0 * columnCount) / totalColumnCount}% - 2 * ${gutterSize})`
);

const columnCountToCss = (totalColumnCount: number, gutterSize: string, columnCount: number, screenWidth: string): string => (
  // NOTE(rikhil): we have to se the height, margin-left, margin-right all to 0 if the columnCount is 0. Find a better way to do this?
  `@media (min-width: ${screenWidth}) { width: ${getCssSize(totalColumnCount, gutterSize, columnCount)}; ${columnCount === 0 ? 'height: 0px; margin-left: 0px; margin-right: 0px' : null}; }`
);

const columnCountsToCss = (totalColumnCount: number, gutterSize: string, screenWidthSmall: string, screenWidthMedium: string, screenWidthLarge: string, screenWidthExtraLarge: string, columnCountNormal?: number, columnCountSmall?: number, columnCountMedium?: number, columnCountLarge?: number, columnCountExtraLarge?: number): string => {
  const output = [];
  if (columnCountNormal !== undefined) {
    output.push(`width: ${getCssSize(totalColumnCount, gutterSize, columnCountNormal).toString()};`);
  }
  if (columnCountSmall !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutterSize, columnCountSmall, screenWidthSmall));
  }
  if (columnCountMedium !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutterSize, columnCountMedium, screenWidthMedium));
  }
  if (columnCountLarge !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutterSize, columnCountLarge, screenWidthLarge));
  }
  if (columnCountExtraLarge !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutterSize, columnCountExtraLarge, screenWidthExtraLarge));
  }
  return output.join('\n');
};

interface IStyledGridItemProps extends IGridItemProps {
  gutterSize: string;
  screenWidthSmall: string;
  screenWidthMedium: string;
  screenWidthLarge: string;
  screenWidthExtraLarge: string;
  totalColumnCount: number;
}

const StyledGridItem = styled.div<IStyledGridItemProps>`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  height: ${(props: IStyledGridItemProps): string => (props.isFullHeight ? '100%' : 'auto')};
  ${(props: IStyledGridItemProps): string => columnCountsToCss(props.totalColumnCount, props.gutterSize, props.screenWidthSmall, props.screenWidthMedium, props.screenWidthLarge, props.screenWidthExtraLarge, props.size, props.sizeSmall, props.sizeMedium, props.sizeLarge, props.sizeExtraLarge)};
  overflow-x: auto;
  overflow-y: ${(props: IStyledGridItemProps): string => (props.isFullHeight ? 'auto' : 'hidden')};
  margin-left: ${(props: IStyledGridItemProps): string => props.gutterSize};
  margin-right: ${(props: IStyledGridItemProps): string => props.gutterSize};
`;
