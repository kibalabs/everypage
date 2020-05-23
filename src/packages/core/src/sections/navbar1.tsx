import React from 'react';
import styled from 'styled-components';

import { Section, ISectionProps } from '.';
import { Stack, Direction, Image, Text, Button, useTheme, IColorGuide, IDimensionGuide } from '../components';

interface IStyledNavigationBarProps {
  theme: IDimensionGuide;
}

const StyledNavigationBar = styled.nav<IStyledNavigationBarProps>`
  height: 4em;
  padding: ${(props: IStyledNavigationBarProps): string => props.theme.padding};
`;

interface INavBar1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
}

export const NavBar1 = (props: INavBar1Props): React.ReactElement => {
  const colors = useTheme<IColorGuide>('colors');
  const theme = useTheme<IDimensionGuide>('dimensions');
  return (
    <Section {...props as ISectionProps}>
      <StyledNavigationBar theme={theme}>
        <Stack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true}>
          {props.logoImageUrl && <Stack.Item><Image source={props.logoImageUrl} isFullHeight={true} alternativeText='logo' /></Stack.Item>}
          {props.titleText && <Stack.Item><Text mode='header'>{props.titleText}</Text></Stack.Item>}
          <Stack.Item growthFactor={1}><div /></Stack.Item>
          {/* <Stack.Item><Button mode='secondary' text='Try now'/></Stack.Item> */}
        </Stack>
      </StyledNavigationBar>
    </Section>
  );
};
NavBar1.displayName = 'navbar-1';
