import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { Spacing, ScreenSize } from '../../subatoms';
import { ILinePagerTheme } from './theme';
import { Direction } from '../../model';
import { ResponsiveView } from '../../wrappers';

interface IStyledLinePagerProps {
  theme: ILinePagerTheme;
}

const StyledLinePager = styled.div<IStyledLinePagerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledLinePagerItem = styled.button<IStyledLinePagerProps>`
  ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: pointer;
  outline: none;
  transition-duration: 0.3s;
  flex-grow: 1;
  flex-shrink: 1;

  &:hover {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.active {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.default.background)};
    &:hover {
      ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.hover?.background)};
    }
    &:active {
      ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.press?.background)};
    }
    &:focus {
      ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.focus?.background)};
    }
  }
`;

interface ILinePagerProps extends IComponentProps<ILinePagerTheme> {
  pageCount: number;
  pageCountSmall?: number;
  pageCountMedium?: number;
  pageCountLarge?: number;
  pageCountExtraLarge?: number;
  activePageIndex: number;
  onPageClicked?(index: number): void;
}

export const LinePager = (props: ILinePagerProps): React.ReactElement => {
  const theme = useBuiltTheme('linePagers', props.variant, props.theme);

  const pageCount = props.pageCount;
  const pageCountSmall = props.pageCountSmall || pageCount;
  const pageCountMedium = props.pageCountMedium || pageCountSmall;
  const pageCountLarge = props.pageCountLarge || pageCountMedium;
  const pageCountExtraLarge = props.pageCountExtraLarge || pageCountLarge;
  const pageCounts = [pageCount, pageCountSmall, pageCountMedium, pageCountLarge, pageCountExtraLarge];
  const maxPageCount = Math.max(...(pageCounts.filter((pageCount?: number): boolean => pageCount !== undefined)));

  const getHiddenAboveSize = (index: number): ScreenSize | undefined => {
    if (index >= pageCountSmall) {
      return ScreenSize.Small;
    }
    if (index >= pageCountMedium) {
      return ScreenSize.Medium;
    }
    if (index >= pageCountLarge) {
      return ScreenSize.Large;
    }
    if (index >= pageCountExtraLarge) {
      return ScreenSize.ExtraLarge;
    }
    return undefined;
  }

  return (
    <StyledLinePager
      id={props.id}
      className={getClassName(LinePager.displayName, props.className)}
    >
      {Array(maxPageCount).fill(null).map((_: any, index: number): React.ReactElement => {
        return (
          <ResponsiveView key={index} hiddenAbove={getHiddenAboveSize(index)}>
            <StyledLinePagerItem
              className={getClassName(index === props.activePageIndex && 'active')}
              theme={theme}
              aria-label={`Page ${index + 1}`}
              onClick={props.onPageClicked ? ((): void => props.onPageClicked(index)) : undefined}
            />
            {index < props.pageCount - 1 && <Spacing direction={Direction.Horizontal}/>}
          </ResponsiveView>
        );
      })}
    </StyledLinePager>
  );
};

LinePager.defaultProps = {
  ...defaultComponentProps,
};
LinePager.displayName = 'line-pager';
