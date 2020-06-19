import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps, useBuiltTheme, themeToCss } from '../..';
import { IBulletListTheme } from './theme';
import { IBulletTextProps } from '../bulletText';

interface IStyledBulletListProps {
  theme: IBulletListTheme;
}

const StyledBulletList = styled.li<IStyledBulletListProps>`
  ${(props: IStyledBulletListProps): string => themeToCss(props.theme.normal.default.bulletList)};
`;

export interface IBulletListProps extends IComponentProps<IBulletListTheme>, IMultiChildProps<IBulletTextProps> {
}

export const BulletList = (props: IBulletListProps): React.ReactElement => {
  const theme = props.theme || useBuiltTheme('bulletLists', props.mode);
  return (
    <StyledBulletList
      id={props.id}
      className={getClassName('bullet-list', props.className)}
      theme={theme}
    >
      {props.children}
    </StyledBulletList>
  );
};

BulletList.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  shouldOpenNewTab: false,
};
