import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiChildProps, ISingleAnyChildProps, flattenChildren } from '@kibalabs/core-react';

import { Alignment, getFlexItemAlignment, getFlexContentAlignment, useDimensions } from '..';
import { IDimensionGuide } from '../subatoms';
import { PaddingView, IPaddingViewPaddingProps } from '../wrappers/paddingView';


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
  contentAlignment: Alignment;
}

const StyledGrid = styled.div<IStyledGridProps>`
  height: ${(props: IStyledGridProps): string => (props.isFullHeight ? '100%' : 'auto')};
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: auto;
  align-items: ${(props: IStyledGridProps): string => getFlexItemAlignment(props.childAlignment)};
  justify-content: ${(props: IStyledGridProps): string => getFlexContentAlignment(props.contentAlignment)};
`;

export interface IGridProps extends IMultiChildProps<IGridItemProps>, IPaddingViewPaddingProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  childAlignment: Alignment;
  contentAlignment: Alignment;
}

export const Grid = (props: IGridProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  const children = flattenChildren(props.children).map((child: React.ReactElement, index: number): React.ReactElement<IGridItemProps> => (
    child.type !== GridItem ? <GridItem key={index}>{ child }</GridItem> : child
  ));
  return (
    <PaddingView {...props as IPaddingViewPaddingProps}>
      <StyledGrid
        id={props.id}
        className={getClassName(Grid.displayName, props.className)}
        isFullHeight={props.isFullHeight}
        childAlignment={props.childAlignment}
        contentAlignment={props.contentAlignment}
      >
        { children.map((child: React.ReactElement<IGridItemProps>, index: number): React.ReactElement => (
          <StyledGridItem
            key={index}
            id={child.props.id}
            className={getClassName(StyledGridItem.displayName, child.props.className)}
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
            gutter={props.shouldAddGutters ? theme.gutter : '0px'}
            alignment={child.props.alignment}
          >
            {child.props.children}
          </StyledGridItem>
        ))}
      </StyledGrid>
      </PaddingView>
  );
};

Grid.defaultProps = {
  className: '',
  isFullHeight: true,
  shouldAddGutters: false,
  childAlignment: Alignment.Fill,
  contentAlignment: Alignment.Center,
};
Grid.displayName = 'grid';
Grid.Item = GridItem;

const getCssSize = (totalColumnCount: number, gutter: string, columnCount: number): string => (
  `calc(${(100.0 * columnCount) / totalColumnCount}% - 2 * ${gutter})`
);

const columnCountToCss = (totalColumnCount: number, gutter: string, columnCount: number, screenWidth: string): string => (
  // TODO(krish): it should be unset below but ie11 doesn't like this. find a nicer way!
  `@media (min-width: ${screenWidth}) {
    width: ${getCssSize(totalColumnCount, gutter, columnCount)};
    ${columnCount === 0 ? 'display: none' : 'display: block'};
  }`
);

const columnCountsToCss = (totalColumnCount: number, gutter: string, screenWidthSmall: string, screenWidthMedium: string, screenWidthLarge: string, screenWidthExtraLarge: string, columnCountNormal?: number, columnCountSmall?: number, columnCountMedium?: number, columnCountLarge?: number, columnCountExtraLarge?: number): string => {
  const output = [];
  if (columnCountNormal !== undefined) {
    output.push(`width: ${getCssSize(totalColumnCount, gutter, columnCountNormal).toString()};`);
    // TODO(krish): it should be unset below but ie11 doesn't like this. find a nicer way!
    output.push(columnCountNormal === 0 ? 'display: none;' : 'display: block;');
  }
  if (columnCountSmall !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutter, columnCountSmall, screenWidthSmall));
  }
  if (columnCountMedium !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutter, columnCountMedium, screenWidthMedium));
  }
  if (columnCountLarge !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutter, columnCountLarge, screenWidthLarge));
  }
  if (columnCountExtraLarge !== undefined) {
    output.push(columnCountToCss(totalColumnCount, gutter, columnCountExtraLarge, screenWidthExtraLarge));
  }
  return output.join('\n');
};

interface IStyledGridItemProps extends IGridItemProps {
  gutter: string;
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
  ${(props: IStyledGridItemProps): string => columnCountsToCss(props.totalColumnCount, props.gutter, props.screenWidthSmall, props.screenWidthMedium, props.screenWidthLarge, props.screenWidthExtraLarge, props.size, props.sizeSmall, props.sizeMedium, props.sizeLarge, props.sizeExtraLarge)};
  /* overflow-x: auto; */
  overflow-y: ${(props: IStyledGridItemProps): string => (props.isFullHeight ? 'auto' : 'visible')};
  margin-left: ${(props: IStyledGridItemProps): string => props.gutter};
  margin-right: ${(props: IStyledGridItemProps): string => props.gutter};
  margin-top: ${(props: IStyledGridItemProps): string => props.gutter};
  margin-bottom: ${(props: IStyledGridItemProps): string => props.gutter};
  align-self: ${(props: IStyledGridItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
`;
StyledGridItem.displayName = 'grid-item';
