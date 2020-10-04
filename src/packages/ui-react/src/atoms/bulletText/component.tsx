import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, useBuiltTheme, themeToCss } from '../..';
import { IBulletTextTheme } from './theme';
import { ISingleChildProps } from '@kibalabs/core-react';
import { IBulletListProps } from '../bulletList';

interface IStyledBulletTextProps {
  theme: IBulletTextTheme;
}

const StyledBulletText = styled.li<IStyledBulletTextProps>`
  ${(props: IStyledBulletTextProps): string => themeToCss(props.theme.normal.default.text)};
  &:before {
    ${(props: IStyledBulletTextProps): string => themeToCss(props.theme.normal.default.bullet)};
    display: inline-block;
  }
`;

export interface IBulletTextProps extends IComponentProps<IBulletTextTheme>, ISingleChildProps<IBulletListProps> {
  text: string;
  textVariant: string;
}

export const BulletText = (props: IBulletTextProps): React.ReactElement => {
  const theme = useBuiltTheme('bulletTexts', props.variant, props.theme);
  return (
    <StyledBulletText
      id={props.id}
      className={getClassName(BulletText.displayName, props.className)}
      theme={theme}
    >
      {props.text}
      {props.children}
    </StyledBulletText>
  );
};

BulletText.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
BulletText.displayName = 'bullet-text';
