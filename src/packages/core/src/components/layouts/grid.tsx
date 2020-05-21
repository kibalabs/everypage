import React from 'react';
import styled from 'styled-components';

import { Alignment, getFlexItemAlignment, useTheme, IDimensionGuide } from '..';
import { IMultiChildProps, ISingleAnyChildProps } from '../../util';


export interface IGridItemProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  size: number;
  sizeSmall?: number;
  sizeMedium?: number;
  sizeLarge?: number;
  sizeExtraLarge?: number;
  isFullHeight: boolean;
  alignment?: Alignment;
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
  childAlignment: Alignment;
}

const StyledGrid = styled.div<IStyledGridProps>`
  height: ${(props: IStyledGridProps): string => (props.isFullHeight ? '100%' : 'auto')};
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: auto;
  align-items: ${(props: IStyledGridProps): string => getFlexItemAlignment(props.childAlignment)};
`;

export interface IGridProps extends IMultiChildProps<IGridItemProps> {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  childAlignment: Alignment;
}

export const Grid = (props: IGridProps): React.ReactElement => {
  const theme = props.theme || useTheme<IDimensionGuide>('dimensions');
  return (
    <StyledGrid
      id={props.id}
      className={`grid ${props.className}`}
      isFullHeight={props.isFullHeight}
      childAlignment={props.childAlignment}
    >
      { React.Children.map(props.children, (child: React.ReactElement<IGridItemProps>, index: number): React.ReactElement => (
        (!child) ? <React.Fragment /> : (
          <StyledGridItem
            key={index}
            id={child.props.id}
            className={`grid-item ${child.props.className}`}
            size={child.props.size}
            sizeSmall={child.props.sizeSmall}
            sizeMedium={child.props.sizeMedium}
            sizeLarge={child.props.sizeLarge}
            sizeExtraLarge={child.props.sizeExtraLarge}
            screenWidthSmall={theme.screenWidthSmall}
            screenWidthMedium={theme.screenWidthMedium}
            screenWidthLarge={theme.screenWidthLarge}
            screenWidthExtraLarge={theme.screenWidthExtraLarge}
            isFullHeight={child.props.isFullHeight}
            totalColumnCount={theme.columnCount}
            gutterSize={props.shouldAddGutters ? theme.gutterSize : '0px'}
            alignment={child.props.alignment}
          >
            {child.props.children}
          </StyledGridItem>
        )
      ))}
    </StyledGrid>
  );
};

Grid.defaultProps = {
  className: '',
  isFullHeight: true,
  shouldAddGutters: false,
  childAlignment: Alignment.Fill,
};
Grid.Item = GridItem;

const getCssSize = (totalColumnCount: number, gutterSize: string, columnCount: number): string => (
  `calc(${(100.0 * columnCount) / totalColumnCount}% - 2 * ${gutterSize})`
);

const columnCountToCss = (totalColumnCount: number, gutterSize: string, columnCount: number, screenWidth: string): string => (
  `@media (min-width: ${screenWidth}) {
    width: ${getCssSize(totalColumnCount, gutterSize, columnCount)};
    ${columnCount === 0 ? 'height: 0px; margin-left: 0px; margin-right: 0px; display: none;' : null};
  }`
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
  alignment?: Alignment;
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
  margin-top: ${(props: IStyledGridItemProps): string => props.gutterSize};
  margin-bottom: ${(props: IStyledGridItemProps): string => props.gutterSize};
  align-self: ${(props: IStyledGridItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
`;
