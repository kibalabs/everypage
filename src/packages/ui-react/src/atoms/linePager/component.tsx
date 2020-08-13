import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { Spacing } from '../../subatoms';
import { ILinePagerTheme } from './theme';
import { Direction } from '../../model';

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
  activePageIndex: number;
  onPageClicked?(index: number): void;
}

export const LinePager = (props: ILinePagerProps): React.ReactElement => {
  const theme = useBuiltTheme('linePagers', props.mode, props.theme);
  return (
    <StyledLinePager
      id={props.id}
      className={getClassName(LinePager.displayName, props.className)}
    >
      {Array(props.pageCount).fill(null).map((_: any, index: number): React.ReactElement => {
        return (
          <React.Fragment key={index}>
            <StyledLinePagerItem
              className={getClassName(index === props.activePageIndex && 'active')}
              theme={theme}
              onClick={props.onPageClicked ? ((): void => props.onPageClicked(index)) : undefined}
            />
            {index < props.pageCount - 1 && <Spacing direction={Direction.Horizontal}/>}
          </React.Fragment>
        );
      })}
    </StyledLinePager>
  );
};

LinePager.defaultProps = {
  ...defaultComponentProps,
};
LinePager.displayName = 'line-pager';
